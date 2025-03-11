import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import RouteFormModal from '@/components/admin/RouteFormModal';
import RouteFilterBar from '@/components/admin/RouteFilterBar';
import RouteTable from '@/components/admin/RouteTable';
import { RouteService, type RouteData } from '@/services/RouteService';

const AdminRoutes = () => {
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [isAddRouteModalOpen, setIsAddRouteModalOpen] = useState(false);
  const [isEditRouteModalOpen, setIsEditRouteModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<RouteData | null>(null);
  
  // Load routes from service
  useEffect(() => {
    setRoutes(RouteService.getAllRoutes());
  }, []);
  
  // Filter routes based on search term and status
  const filteredRoutes = routes.filter(route => {
    const matchesSearch = 
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.startPoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.endPoint.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(route.status);
    
    return matchesSearch && matchesStatus;
  });
  
  const handleEditRoute = (routeId: number) => {
    const routeToEdit = routes.find(route => route.id === routeId);
    if (routeToEdit) {
      setSelectedRoute(routeToEdit);
      setIsEditRouteModalOpen(true);
    } else {
      toast({
        title: "Error",
        description: `Route with ID: ${routeId} not found`,
        variant: "destructive",
      });
    }
  };
  
  const handleDeleteRoute = (routeId: number) => {
    toast({
      title: "Confirm Delete",
      description: `Are you sure you want to delete route ID: ${routeId}?`,
      action: (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            // Delete the route using service
            RouteService.deleteRoute(routeId);
            setRoutes(RouteService.getAllRoutes());
            
            toast({
              title: "Route Deleted",
              description: "The route has been deleted successfully",
            });
          }}
        >
          Delete
        </Button>
      ),
    });
  };
  
  const handleStatusChange = (status: string) => {
    setSelectedStatus(prev => 
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const handleSaveRoute = (routeData: RouteData) => {
    // For edit mode
    if (selectedRoute) {
      const updatedRoute = RouteService.updateRoute(routeData);
      setRoutes(RouteService.getAllRoutes());
      
      toast({
        title: "Route Updated",
        description: `Successfully updated route: ${updatedRoute.name}`,
      });
    } 
    // For add mode
    else {
      const newRoute = RouteService.addRoute(routeData);
      setRoutes(RouteService.getAllRoutes());
      
      toast({
        title: "Route Created",
        description: `Successfully added new route: ${newRoute.name}`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Routes</h1>
          <p className="text-muted-foreground">
            Manage your bus routes and destinations
          </p>
        </div>
        <Button onClick={() => setIsAddRouteModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Route
        </Button>
      </div>
      
      {/* Filters and Search */}
      <RouteFilterBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
      />
      
      {/* Routes Table */}
      <RouteTable 
        routes={filteredRoutes} 
        onEdit={handleEditRoute}
        onDelete={handleDeleteRoute}
      />
      
      {/* Route Form Modals */}
      <RouteFormModal 
        isOpen={isAddRouteModalOpen}
        onClose={() => setIsAddRouteModalOpen(false)}
        onSave={handleSaveRoute}
      />
      
      <RouteFormModal 
        isOpen={isEditRouteModalOpen}
        onClose={() => {
          setIsEditRouteModalOpen(false);
          setSelectedRoute(null);
        }}
        onSave={handleSaveRoute}
        initialData={selectedRoute}
      />
    </div>
  );
};

export default AdminRoutes;

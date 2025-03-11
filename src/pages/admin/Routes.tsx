import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import RouteFormModal from '@/components/admin/RouteFormModal';
import RouteFilterBar from '@/components/admin/RouteFilterBar';
import RouteTable from '@/components/admin/RouteTable';

// Sample route data
const initialRoutes = [
  { 
    id: 1, 
    name: 'Kathmandu - Pokhara', 
    startPoint: 'Kathmandu', 
    endPoint: 'Pokhara', 
    distance: '200 km', 
    duration: '6 hours', 
    fareRange: 'NPR 800 - 1500',
    buses: 12,
    status: 'Active'
  },
  { 
    id: 2, 
    name: 'Kathmandu - Chitwan', 
    startPoint: 'Kathmandu', 
    endPoint: 'Chitwan', 
    distance: '150 km', 
    duration: '5 hours', 
    fareRange: 'NPR 600 - 1200',
    buses: 8,
    status: 'Active'
  },
  { 
    id: 3, 
    name: 'Pokhara - Lumbini', 
    startPoint: 'Pokhara', 
    endPoint: 'Lumbini', 
    distance: '180 km', 
    duration: '5.5 hours', 
    fareRange: 'NPR 700 - 1300',
    buses: 6,
    status: 'Active'
  },
  { 
    id: 4, 
    name: 'Kathmandu - Janakpur', 
    startPoint: 'Kathmandu', 
    endPoint: 'Janakpur', 
    distance: '225 km', 
    duration: '7 hours', 
    fareRange: 'NPR 900 - 1600',
    buses: 5,
    status: 'Inactive'
  },
  { 
    id: 5, 
    name: 'Bhaktapur - Patan', 
    startPoint: 'Bhaktapur', 
    endPoint: 'Patan', 
    distance: '12 km', 
    duration: '40 minutes', 
    fareRange: 'NPR 100 - 200',
    buses: 15,
    status: 'Active'
  },
];

type RouteData = {
  id: number;
  name: string;
  startPoint: string;
  endPoint: string;
  distance: string;
  duration: string;
  fareRange: string;
  buses: number;
  status: string;
};

const AdminRoutes = () => {
  const [routes, setRoutes] = useState(initialRoutes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [isAddRouteModalOpen, setIsAddRouteModalOpen] = useState(false);
  const [isEditRouteModalOpen, setIsEditRouteModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<RouteData | null>(null);
  
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
            // Delete the route
            setRoutes(routes.filter(route => route.id !== routeId));
            
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
      setRoutes(prevRoutes => 
        prevRoutes.map(route => 
          route.id === routeData.id ? routeData : route
        )
      );
      
      toast({
        title: "Route Updated",
        description: `Successfully updated route: ${routeData.name}`,
      });
    } 
    // For add mode
    else {
      // Create a new route with the next ID
      const newRoute = {
        ...routeData,
        id: Math.max(...routes.map(r => r.id), 0) + 1,
      };
      
      setRoutes(prev => [...prev, newRoute]);
      
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

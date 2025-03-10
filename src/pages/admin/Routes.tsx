
import React, { useState } from 'react';
import { Plus, Search, Edit, Trash, Filter, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

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

const AdminRoutes = () => {
  const [routes, setRoutes] = useState(initialRoutes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [isAddRouteModalOpen, setIsAddRouteModalOpen] = useState(false);
  const [isEditRouteModalOpen, setIsEditRouteModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);
  
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
    setSelectedRoute(routeId);
    setIsEditRouteModalOpen(true);
    
    // In a real app, you would fetch the route details here
    toast({
      title: "Edit Route",
      description: `Editing route ID: ${routeId}`,
    });
  };
  
  const handleDeleteRoute = (routeId: number) => {
    // Show confirmation toast before actually deleting
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
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search routes..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full sm:w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60">
            <div className="space-y-4">
              <h4 className="font-medium">Filter by Status</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="active" 
                    checked={selectedStatus.includes('Active')}
                    onCheckedChange={() => handleStatusChange('Active')}
                  />
                  <label htmlFor="active" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Active
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="inactive" 
                    checked={selectedStatus.includes('Inactive')}
                    onCheckedChange={() => handleStatusChange('Inactive')}
                  />
                  <label htmlFor="inactive" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Inactive
                  </label>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      {/* Routes Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">
                    <div className="flex items-center">
                      Route Name
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th className="text-left p-4">Source</th>
                  <th className="text-left p-4">Destination</th>
                  <th className="text-left p-4">Distance</th>
                  <th className="text-left p-4">Duration</th>
                  <th className="text-left p-4">Fare Range</th>
                  <th className="text-left p-4">Buses</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoutes.map((route) => (
                  <tr key={route.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{route.name}</td>
                    <td className="p-4">{route.startPoint}</td>
                    <td className="p-4">{route.endPoint}</td>
                    <td className="p-4">{route.distance}</td>
                    <td className="p-4">{route.duration}</td>
                    <td className="p-4">{route.fareRange}</td>
                    <td className="p-4">{route.buses}</td>
                    <td className="p-4">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        route.status === 'Active' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {route.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditRoute(route.id)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteRoute(route.id)}
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {filteredRoutes.length === 0 && (
                  <tr>
                    <td colSpan={9} className="p-4 text-center text-gray-500">
                      No routes found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Note: In a real app, you would implement the add/edit modals as separate components */}
      {/* For this demonstration, we're just showing toast notifications */}
      {isAddRouteModalOpen && (
        <div className="hidden">
          {/* Close the modal and show toast */}
          {toast({
            title: "Add Route",
            description: "Route form would appear here in a real implementation",
          })}
          {setIsAddRouteModalOpen(false)}
        </div>
      )}
      
      {isEditRouteModalOpen && (
        <div className="hidden">
          {/* Close the modal and show toast */}
          {toast({
            title: "Edit Route",
            description: `Editing route ID: ${selectedRoute}`,
          })}
          {setIsEditRouteModalOpen(false)}
          {setSelectedRoute(null)}
        </div>
      )}
    </div>
  );
};

export default AdminRoutes;

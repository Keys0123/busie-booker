
import React, { useState } from 'react';
import { Plus, Search, Edit, Trash, Filter, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';

// Sample bus data
const initialBuses = [
  { 
    id: 1, 
    number: 'NP-01-001', 
    type: 'Deluxe', 
    capacity: 40, 
    route: 'Kathmandu - Pokhara', 
    driver: 'Ram Thapa',
    status: 'Active',
    lastMaintenance: '2023-04-15',
  },
  { 
    id: 2, 
    number: 'NP-02-123', 
    type: 'Super Deluxe', 
    capacity: 36, 
    route: 'Kathmandu - Chitwan', 
    driver: 'Shyam Gurung',
    status: 'Active',
    lastMaintenance: '2023-04-20',
  },
  { 
    id: 3, 
    number: 'NP-03-456', 
    type: 'AC', 
    capacity: 45, 
    route: 'Pokhara - Lumbini', 
    driver: 'Hari Sharma',
    status: 'Maintenance',
    lastMaintenance: '2023-05-10',
  },
  { 
    id: 4, 
    number: 'NP-01-789', 
    type: 'Normal', 
    capacity: 50, 
    route: 'Kathmandu - Janakpur', 
    driver: 'Binod KC',
    status: 'Active',
    lastMaintenance: '2023-03-25',
  },
  { 
    id: 5, 
    number: 'NP-02-321', 
    type: 'Micro', 
    capacity: 20, 
    route: 'Bhaktapur - Patan', 
    driver: 'Nabin Shrestha',
    status: 'Inactive',
    lastMaintenance: '2023-04-01',
  },
];

const AdminBuses = () => {
  const [buses, setBuses] = useState(initialBuses);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  
  // Filter buses based on search term and status
  const filteredBuses = buses.filter(bus => {
    const matchesSearch = 
      bus.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.driver.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(bus.status);
    
    return matchesSearch && matchesStatus;
  });
  
  const handleEditBus = (busId: number) => {
    toast({
      title: "Edit Bus",
      description: `Editing bus ID: ${busId}`,
    });
  };
  
  const handleDeleteBus = (busId: number) => {
    toast({
      title: "Confirm Delete",
      description: `Are you sure you want to delete bus ID: ${busId}?`,
      action: (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            // Delete the bus
            setBuses(buses.filter(bus => bus.id !== busId));
            
            toast({
              title: "Bus Deleted",
              description: "The bus has been deleted successfully",
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Buses</h1>
          <p className="text-muted-foreground">
            Manage your bus fleet and vehicles
          </p>
        </div>
        <Button onClick={() => toast({ title: "Add Bus", description: "Bus form would appear here" })}>
          <Plus className="mr-2 h-4 w-4" /> Add Bus
        </Button>
      </div>
      
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search buses..."
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
                    id="maintenance" 
                    checked={selectedStatus.includes('Maintenance')}
                    onCheckedChange={() => handleStatusChange('Maintenance')}
                  />
                  <label htmlFor="maintenance" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Maintenance
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
      
      {/* Buses Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">
                    <div className="flex items-center">
                      Bus Number
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th className="text-left p-4">Type</th>
                  <th className="text-left p-4">Capacity</th>
                  <th className="text-left p-4">Route</th>
                  <th className="text-left p-4">Driver</th>
                  <th className="text-left p-4">Last Maintenance</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBuses.map((bus) => (
                  <tr key={bus.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{bus.number}</td>
                    <td className="p-4">{bus.type}</td>
                    <td className="p-4">{bus.capacity}</td>
                    <td className="p-4">{bus.route}</td>
                    <td className="p-4">{bus.driver}</td>
                    <td className="p-4">{bus.lastMaintenance}</td>
                    <td className="p-4">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(bus.status)}`}>
                        {bus.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditBus(bus.id)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteBus(bus.id)}
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {filteredBuses.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-4 text-center text-gray-500">
                      No buses found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBuses;

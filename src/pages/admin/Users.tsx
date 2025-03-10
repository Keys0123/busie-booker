
import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, Edit, Trash, Plus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';

// Sample user data
const initialUsers = [
  { 
    id: '2345',
    name: 'Dipika Karki',
    email: 'dipika@example.com',
    phone: '+977-9865412345',
    bookings: 3,
    joined: '2023-04-15',
    status: 'Active',
    lastLogin: '2023-05-10'
  },
  { 
    id: '2346',
    name: 'Sunil Thapa',
    email: 'sunil@example.com',
    phone: '+977-9845231256',
    bookings: 1,
    joined: '2023-04-22',
    status: 'Active',
    lastLogin: '2023-05-05'
  },
  { 
    id: '2347',
    name: 'Ravi Shrestha',
    email: 'ravi@example.com',
    phone: '+977-9812567432',
    bookings: 2,
    joined: '2023-03-10',
    status: 'Inactive',
    lastLogin: '2023-04-20'
  },
  { 
    id: '2348',
    name: 'Sabina Gurung',
    email: 'sabina@example.com',
    phone: '+977-9876543210',
    bookings: 0,
    joined: '2023-05-01',
    status: 'Active',
    lastLogin: '2023-05-02'
  },
  { 
    id: '2349',
    name: 'Nabin Magar',
    email: 'nabin@example.com',
    phone: '+977-9802345671',
    bookings: 5,
    joined: '2023-02-15',
    status: 'Active',
    lastLogin: '2023-05-11'
  },
];

const AdminUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  
  // Filter users based on search term and status
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(user.status);
    
    return matchesSearch && matchesStatus;
  });
  
  const handleViewUser = (userId: string) => {
    toast({
      title: "View User",
      description: `Viewing details for user ID: ${userId}`,
    });
  };
  
  const handleEditUser = (userId: string) => {
    toast({
      title: "Edit User",
      description: `Editing user ID: ${userId}`,
    });
  };
  
  const handleDeleteUser = (userId: string) => {
    toast({
      title: "Confirm Delete",
      description: `Are you sure you want to delete user ID: ${userId}?`,
      action: (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            // Delete the user
            setUsers(users.filter(user => user.id !== userId));
            
            toast({
              title: "User Deleted",
              description: "The user has been deleted successfully",
            });
          }}
        >
          Delete
        </Button>
      ),
    });
  };
  
  const handleStatusChange = (status: string) => {
    setSelectedStatuses(prev => 
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
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
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage user accounts and permissions
          </p>
        </div>
        <Button onClick={() => toast({ title: "Add User", description: "User form would appear here" })}>
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>
      
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search users..."
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
                    checked={selectedStatuses.includes('Active')}
                    onCheckedChange={() => handleStatusChange('Active')}
                  />
                  <label htmlFor="active" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Active
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="inactive" 
                    checked={selectedStatuses.includes('Inactive')}
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
      
      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">
                    <div className="flex items-center">
                      User ID
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Email</th>
                  <th className="text-left p-4">Phone</th>
                  <th className="text-left p-4">Bookings</th>
                  <th className="text-left p-4">Joined</th>
                  <th className="text-left p-4">Last Login</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">#{user.id}</td>
                    <td className="p-4">{user.name}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">{user.phone}</td>
                    <td className="p-4">{user.bookings}</td>
                    <td className="p-4">{user.joined}</td>
                    <td className="p-4">{user.lastLogin}</td>
                    <td className="p-4">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleViewUser(user.id)}
                        >
                          <Eye size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditUser(user.id)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={9} className="p-4 text-center text-gray-500">
                      No users found matching your criteria
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

export default AdminUsers;

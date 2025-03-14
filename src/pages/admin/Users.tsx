
import React, { useState, useEffect } from 'react';
import { Search, Filter, ArrowUpDown, Edit, Trash, Plus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample user data - In a real app, this would come from an API or database
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
  // Added Rajesh Sharma from the Profile component for consistency
  { 
    id: 'usr123456',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@example.com',
    phone: '+977-9801234567',
    bookings: 8,
    joined: '2023-01-15',
    status: 'Active',
    lastLogin: '2023-05-12'
  },
];

const AdminUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<typeof initialUsers[0] | null>(null);
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [editUserData, setEditUserData] = useState<{
    id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
  } | null>(null);
  
  // Simulate localStorage for user data (would be a database in real app)
  useEffect(() => {
    const savedUsers = localStorage.getItem('adminUsers');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      localStorage.setItem('adminUsers', JSON.stringify(initialUsers));
    }
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('adminUsers', JSON.stringify(users));
  }, [users]);
  
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
    const user = users.find(u => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setIsUserDetailsOpen(true);
    }
  };
  
  const handleEditUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setEditUserData({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        status: user.status,
      });
      setIsEditUserOpen(true);
    }
  };

  const handleSaveUserEdit = () => {
    if (editUserData) {
      setUsers(users.map(user => 
        user.id === editUserData.id ? { ...user, ...editUserData } : user
      ));
      setIsEditUserOpen(false);
      
      toast({
        title: "User Updated",
        description: `User ${editUserData.name} has been updated successfully`,
      });
    }
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
            
            // Also remove from localStorage to sync with profile page
            const profileUser = localStorage.getItem('profileUser');
            if (profileUser && JSON.parse(profileUser).id === userId) {
              localStorage.removeItem('profileUser');
            }
            
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

  const handleStatusToggle = (userId: string) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
        
        // Update localStorage if this is the logged-in user
        const profileUser = localStorage.getItem('profileUser');
        if (profileUser && JSON.parse(profileUser).id === userId) {
          const updatedProfileUser = { ...JSON.parse(profileUser), status: newStatus };
          localStorage.setItem('profileUser', JSON.stringify(updatedProfileUser));
        }
        
        return { ...user, status: newStatus };
      }
      return user;
    }));

    toast({
      title: "Status Updated",
      description: "User status has been updated successfully",
    });
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

  const handleAddUser = () => {
    // Generate a new user ID (simple implementation for demo)
    const newId = Math.floor(1000 + Math.random() * 9000).toString();
    
    setEditUserData({
      id: newId,
      name: '',
      email: '',
      phone: '',
      status: 'Active',
    });
    
    setIsEditUserOpen(true);
  };

  const handleCreateUser = () => {
    if (editUserData && editUserData.name && editUserData.email) {
      const newUser = {
        ...editUserData,
        id: editUserData.id,
        bookings: 0,
        joined: new Date().toISOString().split('T')[0],
        lastLogin: new Date().toISOString().split('T')[0],
      };
      
      setUsers([...users, newUser]);
      setIsEditUserOpen(false);
      
      toast({
        title: "User Created",
        description: `New user ${newUser.name} has been created successfully`,
      });
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
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
        <Button onClick={handleAddUser}>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <div className="flex items-center">
                    User ID
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Bookings</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">#{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.bookings}</TableCell>
                    <TableCell>{user.joined}</TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span 
                          className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(user.status)} cursor-pointer`}
                          onClick={() => handleStatusToggle(user.id)}
                          title={`Click to change status to ${user.status === 'Active' ? 'Inactive' : 'Active'}`}
                        >
                          {user.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-gray-500">
                    No users found matching your criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* User Details Dialog */}
      <Dialog open={isUserDetailsOpen} onOpenChange={setIsUserDetailsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh]">
            {selectedUser && (
              <div className="space-y-4 py-2">
                <div className="flex justify-center">
                  <div className="h-24 w-24 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold">
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium text-gray-500">Name</h3>
                    <p>{selectedUser.name}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-500">Email</h3>
                    <p>{selectedUser.email}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-500">Phone</h3>
                    <p>{selectedUser.phone}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-500">User ID</h3>
                    <p>#{selectedUser.id}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-500">Status</h3>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(selectedUser.status)}`}>
                      {selectedUser.status}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-500">Joined</h3>
                    <p>{selectedUser.joined}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-500">Last Login</h3>
                    <p>{selectedUser.lastLogin}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-500">Total Bookings</h3>
                    <p>{selectedUser.bookings}</p>
                  </div>
                </div>
                
                <div className="pt-4 flex space-x-2 justify-end border-t">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsUserDetailsOpen(false)}
                  >
                    Close
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setIsUserDetailsOpen(false);
                      handleEditUser(selectedUser.id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => {
                      handleDeleteUser(selectedUser.id);
                      setIsUserDetailsOpen(false);
                    }}
                  >
                    Delete User
                  </Button>
                </div>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={(open) => {
        setIsEditUserOpen(open);
        if (!open) setEditUserData(null);
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editUserData && editUserData.name ? `Edit User: ${editUserData.name}` : 'Create New User'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input 
                id="edit-name" 
                value={editUserData?.name || ''} 
                onChange={(e) => setEditUserData(prev => prev ? {...prev, name: e.target.value} : null)}
                placeholder="Enter full name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email Address</Label>
              <Input 
                id="edit-email" 
                type="email" 
                value={editUserData?.email || ''} 
                onChange={(e) => setEditUserData(prev => prev ? {...prev, email: e.target.value} : null)}
                placeholder="Enter email address"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Phone Number</Label>
              <Input 
                id="edit-phone" 
                value={editUserData?.phone || ''} 
                onChange={(e) => setEditUserData(prev => prev ? {...prev, phone: e.target.value} : null)}
                placeholder="Enter phone number"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="status-active" 
                    checked={editUserData?.status === 'Active'}
                    onCheckedChange={() => setEditUserData(prev => prev ? {...prev, status: 'Active'} : null)}
                  />
                  <label htmlFor="status-active">Active</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="status-inactive" 
                    checked={editUserData?.status === 'Inactive'}
                    onCheckedChange={() => setEditUserData(prev => prev ? {...prev, status: 'Inactive'} : null)}
                  />
                  <label htmlFor="status-inactive">Inactive</label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>Cancel</Button>
            <Button onClick={editUserData?.name ? handleSaveUserEdit : handleCreateUser}>
              {editUserData?.name ? 'Save Changes' : 'Create User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsers;

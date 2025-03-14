
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit, Save, X, AlertTriangle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type UserData = {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  memberSince: string;
  totalTrips: number;
  preferredRoutes: string[];
  status?: 'Active' | 'Inactive';
};

type ProfileInfoProps = {
  userData: UserData;
  onUserUpdate?: (updatedUser: UserData) => void;
};

const ProfileInfo = ({ userData, onUserUpdate }: ProfileInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [phone, setPhone] = useState(userData.phone);
  const [userStatus, setUserStatus] = useState<'Active' | 'Inactive'>(userData.status || 'Active');

  // Sync with admin panel changes via localStorage
  useEffect(() => {
    const checkAdminChanges = () => {
      const adminUsers = localStorage.getItem('adminUsers');
      if (adminUsers) {
        const parsedUsers = JSON.parse(adminUsers);
        const currentUser = parsedUsers.find((user: any) => user.id === userData.id);
        
        if (currentUser) {
          if (currentUser.status !== userStatus) {
            setUserStatus(currentUser.status);
            if (onUserUpdate) {
              onUserUpdate({
                ...userData,
                status: currentUser.status
              });
            }
          }
        } else {
          // User was deleted by admin
          toast({
            title: "Account Deleted",
            description: "Your account has been deleted by an administrator.",
            variant: "destructive",
          });
          // In a real app, you would redirect to logout here
        }
      }
    };

    // Check immediately and set up interval
    checkAdminChanges();
    const interval = setInterval(checkAdminChanges, 5000);
    
    return () => clearInterval(interval);
  }, [userData.id, userStatus, onUserUpdate, userData]);
  
  const handleSave = () => {
    // Update user data
    const updatedUser = {
      ...userData,
      name,
      email,
      phone
    };
    
    // In a real app, this would call an API to update the user's profile
    setIsEditing(false);
    
    // Also update in the admin users list (localStorage)
    const adminUsers = localStorage.getItem('adminUsers');
    if (adminUsers) {
      const parsedUsers = JSON.parse(adminUsers);
      const updatedUsers = parsedUsers.map((user: any) => 
        user.id === userData.id ? { ...user, name, email, phone } : user
      );
      localStorage.setItem('adminUsers', JSON.stringify(updatedUsers));
    }
    
    // Save to profile user in localStorage
    localStorage.setItem('profileUser', JSON.stringify(updatedUser));
    
    // Call the onUserUpdate callback if provided
    if (onUserUpdate) {
      onUserUpdate(updatedUser);
    }
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully",
    });
  };
  
  const handleCancel = () => {
    // Reset values to original
    setName(userData.name);
    setEmail(userData.email);
    setPhone(userData.phone);
    setIsEditing(false);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your personal details and preferences</CardDescription>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant={userStatus === 'Active' ? 'default' : 'secondary'}>
              {userStatus}
            </Badge>
            
            {isEditing ? (
              <>
                <Button variant="ghost" size="sm" onClick={handleCancel}>
                  <X size={16} className="mr-2" />
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save size={16} className="mr-2" />
                  Save
                </Button>
              </>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsEditing(true)}
                disabled={userStatus === 'Inactive'}
              >
                <Edit size={16} className="mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          {userStatus === 'Inactive' && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Account Inactive</AlertTitle>
              <AlertDescription>
                Your account has been deactivated by an administrator. 
                You cannot make changes to your profile or make bookings. 
                Please contact customer support for assistance.
              </AlertDescription>
            </Alert>
          )}
        
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                {isEditing ? (
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  <p className="py-2">{name}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                {isEditing ? (
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <p className="py-2">{email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                {isEditing ? (
                  <Input 
                    id="phone" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                  />
                ) : (
                  <p className="py-2">{phone}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>Account ID</Label>
                <p className="py-2 text-gray-600">{userData.id}</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label>Preferred Routes</Label>
              <div className="flex flex-wrap gap-2">
                {userData.preferredRoutes.map((route) => (
                  <Badge key={route} variant="outline">{route}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileInfo;

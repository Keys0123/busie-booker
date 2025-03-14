
import React, { useState } from 'react';
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
import { Edit, Save, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

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
};

const ProfileInfo = ({ userData }: ProfileInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [phone, setPhone] = useState(userData.phone);
  
  const handleSave = () => {
    // In a real app, this would call an API to update the user's profile
    setIsEditing(false);
    
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
            {userData.status && (
              <Badge variant={userData.status === 'Active' ? 'default' : 'secondary'}>
                {userData.status}
              </Badge>
            )}
            
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
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit size={16} className="mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
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
            
            {userData.status === 'Inactive' && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-100 rounded-md">
                <p className="text-yellow-800 text-sm">
                  Your account is currently inactive. Please contact customer support if you believe this is an error.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileInfo;

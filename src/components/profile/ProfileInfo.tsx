
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Edit, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface ProfileInfoProps {
  userData: {
    id: string;
    name: string;
    email: string;
    phone: string;
    memberSince: string;
    preferredRoutes: string[];
  };
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ userData }) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    address: 'Kathmandu, Nepal', // Sample data
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send the updated data to the backend
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully",
    });
    
    setIsEditing(false);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your account details and preferences</CardDescription>
            </div>
            
            {!isEditing && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsEditing(true)}
                className="flex items-center"
              >
                <Edit size={16} className="mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-6 space-x-2">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: userData.name,
                      email: userData.email,
                      phone: userData.phone,
                      address: 'Kathmandu, Nepal', // Reset to original
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{userData.name}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Email Address</p>
                  <div className="font-medium flex items-center">
                    <Mail size={16} className="text-gray-400 mr-2" />
                    {userData.email}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <div className="font-medium flex items-center">
                    <Phone size={16} className="text-gray-400 mr-2" />
                    {userData.phone}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Address</p>
                  <div className="font-medium flex items-center">
                    <MapPin size={16} className="text-gray-400 mr-2" />
                    Kathmandu, Nepal
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Preferred Routes</p>
                <div className="flex flex-wrap gap-2">
                  {userData.preferredRoutes.map((route, index) => (
                    <div 
                      key={index} 
                      className="bg-primary/5 text-primary text-sm py-1 px-2 rounded-md"
                    >
                      {route}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="border-t bg-gray-50/50 flex items-center text-sm text-gray-500 px-6 py-3">
          <CheckCircle size={16} className="text-green-500 mr-2" />
          Email verified
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Account Preferences</CardTitle>
          <CardDescription>Manage your account settings and notifications</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive emails about your bookings and updates</p>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="email-notifications" 
                  className="mr-2 h-4 w-4" 
                  defaultChecked 
                />
                <label htmlFor="email-notifications" className="text-sm"></label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-gray-500">Receive SMS alerts for booking confirmations</p>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="sms-notifications" 
                  className="mr-2 h-4 w-4" 
                  defaultChecked 
                />
                <label htmlFor="sms-notifications" className="text-sm"></label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileInfo;

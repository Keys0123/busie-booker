
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Ticket, Clock, Edit, MapPin, LogOut } from 'lucide-react';
import { format } from 'date-fns';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ProfileInfo from '@/components/profile/ProfileInfo';
import TravelHistory from '@/components/profile/TravelHistory';
import SavedTickets from '@/components/profile/SavedTickets';
import { useToast } from '@/hooks/use-toast';

// Default user data as fallback
const defaultUserData = {
  id: "usr123456",
  name: "Guest User",
  email: "guest@example.com",
  phone: "+977-9800000000",
  profileImage: "",
  memberSince: new Date().toISOString().split('T')[0],
  totalTrips: 0,
  preferredRoutes: [],
  status: "Active" as 'Active' | 'Inactive'
};

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("info");
  const [userData, setUserData] = useState(defaultUserData);
  
  // Check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check for active user session
    const currentUserEmail = localStorage.getItem('currentUserEmail');
    
    if (!currentUserEmail) {
      // No logged in user, redirect to login
      toast({
        title: "Authentication Required",
        description: "Please log in to view your profile",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    // Get user data from localStorage
    const savedUserProfile = localStorage.getItem('profileUser');
    
    if (savedUserProfile) {
      // Parse and use the saved profile data
      const profileData = JSON.parse(savedUserProfile);
      setUserData(profileData);
      setIsLoggedIn(true);
    } else {
      // If we have an email but no profile, try to find the user in accounts
      const accounts = JSON.parse(localStorage.getItem('userAccounts') || '[]');
      const currentUser = accounts.find((user: any) => user.email === currentUserEmail);
      
      if (currentUser) {
        // Found the user, set their profile data
        setUserData(currentUser.profile);
        localStorage.setItem('profileUser', JSON.stringify(currentUser.profile));
        setIsLoggedIn(true);
      } else {
        // No user found, redirect to login
        toast({
          title: "Session Expired",
          description: "Please log in again",
          variant: "destructive",
        });
        localStorage.removeItem('currentUserEmail');
        navigate('/login');
      }
    }
    
    // Check if user exists in admin users list and update if needed
    const adminUsers = localStorage.getItem('adminUsers');
    if (adminUsers && currentUserEmail) {
      const parsedUsers = JSON.parse(adminUsers);
      const userExists = parsedUsers.some((user: any) => user.email === currentUserEmail);
      
      if (!userExists && savedUserProfile) {
        // Add this user to admin users list if not present
        const userProfile = JSON.parse(savedUserProfile);
        parsedUsers.push({
          id: userProfile.id,
          name: userProfile.name,
          email: userProfile.email,
          phone: userProfile.phone,
          bookings: userProfile.totalTrips,
          joined: userProfile.memberSince,
          status: userProfile.status || 'Active',
          lastLogin: new Date().toISOString().split('T')[0]
        });
        
        localStorage.setItem('adminUsers', JSON.stringify(parsedUsers));
      }
    }
  }, [navigate, toast]);
  
  const handleLogout = () => {
    // Handle logout
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('profileUser');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleUserUpdate = (updatedUser: any) => {
    setUserData(updatedUser);
    localStorage.setItem('profileUser', JSON.stringify(updatedUser));
    
    // Also update in userAccounts
    const accounts = JSON.parse(localStorage.getItem('userAccounts') || '[]');
    const updatedAccounts = accounts.map((account: any) => {
      if (account.email === updatedUser.email) {
        return { ...account, profile: updatedUser };
      }
      return account;
    });
    localStorage.setItem('userAccounts', JSON.stringify(updatedAccounts));
  };
  
  if (!isLoggedIn) return null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50 pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Profile Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center mb-6">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={userData.profileImage} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xl">
                        {userData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <h2 className="text-xl font-bold">{userData.name}</h2>
                    <p className="text-gray-500 text-sm mt-1">Member since {format(new Date(userData.memberSince), 'MMM yyyy')}</p>
                    
                    <div className="mt-2 space-y-2">
                      <Badge variant="outline" className="bg-primary/5 text-primary">
                        {userData.totalTrips} Trips
                      </Badge>
                      
                      <Badge variant={userData.status === 'Active' ? 'default' : 'secondary'} className="ml-2">
                        {userData.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Link to="#info" 
                      className={`flex items-center p-2 rounded-md transition-colors ${activeTab === 'info' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
                      onClick={() => setActiveTab('info')}
                    >
                      <User size={18} className="mr-2" />
                      <span>Personal Information</span>
                    </Link>
                    
                    <Link to="#history"
                      className={`flex items-center p-2 rounded-md transition-colors ${activeTab === 'history' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
                      onClick={() => setActiveTab('history')}
                    >
                      <Clock size={18} className="mr-2" />
                      <span>Travel History</span>
                    </Link>
                    
                    <Link to="#tickets"
                      className={`flex items-center p-2 rounded-md transition-colors ${activeTab === 'tickets' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
                      onClick={() => setActiveTab('tickets')}
                    >
                      <Ticket size={18} className="mr-2" />
                      <span>Saved Tickets</span>
                    </Link>
                    
                    <Separator className="my-3" />
                    
                    <button 
                      className="flex items-center p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors w-full"
                      onClick={handleLogout}
                    >
                      <LogOut size={18} className="mr-2" />
                      <span>Logout</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="info" className="text-sm sm:text-base">
                    <User size={16} className="mr-2 hidden sm:inline" />
                    Personal Info
                  </TabsTrigger>
                  <TabsTrigger value="history" className="text-sm sm:text-base">
                    <Clock size={16} className="mr-2 hidden sm:inline" />
                    Travel History
                  </TabsTrigger>
                  <TabsTrigger value="tickets" className="text-sm sm:text-base">
                    <Ticket size={16} className="mr-2 hidden sm:inline" />
                    Saved Tickets
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="info">
                  <ProfileInfo userData={userData} onUserUpdate={handleUserUpdate} />
                </TabsContent>
                
                <TabsContent value="history">
                  <TravelHistory />
                </TabsContent>
                
                <TabsContent value="tickets">
                  <SavedTickets />
                </TabsContent>
              </Tabs>
            </div>
            
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;

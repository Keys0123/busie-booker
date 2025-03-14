
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Initialize sample user data if none exists
const initializeUserAccounts = () => {
  const existingUsers = localStorage.getItem('userAccounts');
  
  if (!existingUsers) {
    const sampleUsers = [
      {
        email: "rajesh.sharma@example.com",
        password: "password123",
        profile: {
          id: "usr123456",
          name: "Rajesh Sharma",
          email: "rajesh.sharma@example.com",
          phone: "+977-9801234567",
          profileImage: "",
          memberSince: "2023-01-15",
          totalTrips: 8,
          preferredRoutes: ["Kathmandu-Pokhara", "Kathmandu-Chitwan"],
          status: "Active"
        }
      },
      {
        email: "john.doe@example.com",
        password: "password123",
        profile: {
          id: "usr789012",
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "+977-9809876543",
          profileImage: "",
          memberSince: "2023-03-20",
          totalTrips: 3,
          preferredRoutes: ["Kathmandu-Lumbini", "Pokhara-Chitwan"],
          status: "Active"
        }
      },
      {
        email: "sarah.smith@example.com",
        password: "password123",
        profile: {
          id: "usr345678",
          name: "Sarah Smith",
          email: "sarah.smith@example.com",
          phone: "+977-9807654321",
          profileImage: "",
          memberSince: "2023-06-10",
          totalTrips: 5,
          preferredRoutes: ["Kathmandu-Nagarkot", "Pokhara-Jomsom"],
          status: "Active"
        }
      }
    ];
    
    localStorage.setItem('userAccounts', JSON.stringify(sampleUsers));
    return sampleUsers;
  }
  
  return JSON.parse(existingUsers);
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userAccounts, setUserAccounts] = useState<any[]>([]);
  
  useEffect(() => {
    // Initialize user accounts from localStorage
    const accounts = initializeUserAccounts();
    setUserAccounts(accounts);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would validate and authenticate here
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get latest user accounts (in case they were updated)
      const latestAccounts = JSON.parse(localStorage.getItem('userAccounts') || '[]');
      
      // Find the user in our accounts
      const user = latestAccounts.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
      
      if (user && user.password === password) {
        // Clear any existing profile data
        localStorage.removeItem('profileUser');
        
        // Store the user's profile info
        localStorage.setItem('profileUser', JSON.stringify(user.profile));
        localStorage.setItem('currentUserEmail', email);
        
        // Update admin users list if needed
        const adminUsers = localStorage.getItem('adminUsers');
        if (adminUsers) {
          const parsedUsers = JSON.parse(adminUsers);
          // Check if user exists in admin list
          const existingUserIndex = parsedUsers.findIndex((u: any) => u.email === user.profile.email);
          
          if (existingUserIndex >= 0) {
            // Update lastLogin
            parsedUsers[existingUserIndex].lastLogin = new Date().toISOString().split('T')[0];
            localStorage.setItem('adminUsers', JSON.stringify(parsedUsers));
          } else {
            // Add user to admin list
            parsedUsers.push({
              id: user.profile.id,
              name: user.profile.name,
              email: user.profile.email,
              phone: user.profile.phone,
              bookings: user.profile.totalTrips,
              joined: user.profile.memberSince,
              status: user.profile.status || 'Active',
              lastLogin: new Date().toISOString().split('T')[0]
            });
            localStorage.setItem('adminUsers', JSON.stringify(parsedUsers));
          }
        } else {
          // Create admin users list if it doesn't exist
          const newAdminUsers = [{
            id: user.profile.id,
            name: user.profile.name,
            email: user.profile.email,
            phone: user.profile.phone,
            bookings: user.profile.totalTrips,
            joined: user.profile.memberSince,
            status: user.profile.status || 'Active',
            lastLogin: new Date().toISOString().split('T')[0]
          }];
          localStorage.setItem('adminUsers', JSON.stringify(newAdminUsers));
        }
        
        toast({
          title: "Success",
          description: "You have successfully logged in",
        });
        
        navigate('/profile');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-xl shadow-soft p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to your account to continue</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={16} />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <div className="flex justify-end">
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full py-6" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              
              <div className="relative flex items-center justify-center">
                <Separator className="absolute w-full" />
                <span className="relative bg-white px-2 text-sm text-gray-500">
                  Or continue with
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                  </svg>
                  Google
                </button>
                
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                    <linearGradient id="Ld6sqrtcxMyckEl6xeDdMa" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#2aa4f4"/>
                      <stop offset="1" stopColor="#007ad9"/>
                    </linearGradient>
                    <path fill="url(#Ld6sqrtcxMyckEl6xeDdMa)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"/>
                    <path fill="#fff" d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"/>
                  </svg>
                  Facebook
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary font-medium hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;

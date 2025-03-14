
import React from 'react';
import { 
  Bus, 
  Users, 
  CalendarCheck, 
  Route, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  UserPlus
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// User data - This should match with the Users.tsx file
const usersData = [
  { id: 'usr123456', name: 'Rajesh Sharma', email: 'rajesh.sharma@example.com', joined: 'May 15, 2023', bookings: 8 },
  { id: '2345', name: 'Dipika Karki', email: 'dipika@example.com', joined: 'May 12, 2023', bookings: 3 },
  { id: '2346', name: 'Sunil Thapa', email: 'sunil@example.com', joined: 'May 11, 2023', bookings: 1 },
  { id: '2347', name: 'Ravi Shrestha', email: 'ravi@example.com', joined: 'May 10, 2023', bookings: 2 },
  { id: '2348', name: 'Sabina Gurung', email: 'sabina@example.com', joined: 'May 9, 2023', bookings: 0 },
  { id: '2349', name: 'Nabin Magar', email: 'nabin@example.com', joined: 'May 8, 2023', bookings: 5 },
];

// Sample data for bookings
const bookingsData = [
  { id: '8721', route: 'Kathmandu - Pokhara', customer: 'Raj Sharma', date: 'May 12, 2023', amount: '45.00', status: 'Completed' },
  { id: '8722', route: 'Pokhara - Chitwan', customer: 'Anu Thapa', date: 'May 12, 2023', amount: '32.50', status: 'Pending' },
  { id: '8723', route: 'Kathmandu - Chitwan', customer: 'Kiran KC', date: 'May 11, 2023', amount: '38.00', status: 'Completed' },
  { id: '8724', route: 'Bhaktapur - Patan', customer: 'Sita Rai', date: 'May 11, 2023', amount: '15.00', status: 'Cancelled' },
  { id: '8725', route: 'Kathmandu - Lumbini', customer: 'Binod Tamang', date: 'May 10, 2023', amount: '55.00', status: 'Completed' },
];

// Sample data for routes and monthly bookings
const routeData = [
  { name: 'Kathmandu - Pokhara', revenue: 12500 },
  { name: 'Kathmandu - Chitwan', revenue: 9800 },
  { name: 'Pokhara - Lumbini', revenue: 7600 },
  { name: 'Bhaktapur - Patan', revenue: 4500 },
  { name: 'Kathmandu - Janakpur', revenue: 3200 },
];

const monthlyData = [
  { name: 'January', bookings: 3200 },
  { name: 'February', bookings: 3600 },
  { name: 'March', bookings: 4100 },
  { name: 'April', bookings: 4500 },
  { name: 'May', bookings: 3900 },
  { name: 'June', bookings: 4300 },
];

const AdminDashboard = () => {
  // Calculate new users in the last month (for demonstration)
  const newUsersCount = usersData.length;
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your bus company operations
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Bookings" 
          value="12,548" 
          description="↗︎ 2.1% from last month" 
          trend="up"
          icon={<CalendarCheck className="h-8 w-8 text-primary" />} 
        />
        
        <StatsCard 
          title="Revenue" 
          value="$56,389" 
          description="↘︎ 4.3% from last month" 
          trend="down"
          icon={<TrendingUp className="h-8 w-8 text-primary" />} 
        />
        
        <StatsCard 
          title="Active Buses" 
          value="42" 
          description="↗︎ 7 more than last month" 
          trend="up"
          icon={<Bus className="h-8 w-8 text-primary" />} 
        />
        
        <StatsCard 
          title="Registered Users" 
          value={newUsersCount.toString()} 
          description="↗︎ New users this month" 
          trend="up"
          icon={<Users className="h-8 w-8 text-primary" />} 
        />
      </div>
      
      {/* Recent Activity and Analytics Tabs */}
      <Tabs defaultValue="bookings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
          <TabsTrigger value="users">New Users</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bookings" className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Bookings</h2>
          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Booking ID</th>
                    <th className="text-left p-4">Route</th>
                    <th className="text-left p-4">Customer</th>
                    <th className="text-left p-4">Date</th>
                    <th className="text-left p-4">Amount</th>
                    <th className="text-left p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingsData.map((booking) => (
                    <tr key={booking.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">#{booking.id}</td>
                      <td className="p-4">{booking.route}</td>
                      <td className="p-4">{booking.customer}</td>
                      <td className="p-4">{booking.date}</td>
                      <td className="p-4">${booking.amount}</td>
                      <td className="p-4">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">New User Registrations</h2>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/admin/users'}
              className="flex items-center gap-1"
            >
              <UserPlus size={16} />
              <span>View All Users</span>
            </Button>
          </div>
          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">User ID</th>
                    <th className="text-left p-4">Name</th>
                    <th className="text-left p-4">Email</th>
                    <th className="text-left p-4">Joined</th>
                    <th className="text-left p-4">Bookings</th>
                  </tr>
                </thead>
                <tbody>
                  {usersData.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">#{user.id}</td>
                      <td className="p-4">{user.name}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">{user.joined}</td>
                      <td className="p-4">{user.bookings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <h2 className="text-xl font-semibold">Performance Analytics</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Route</CardTitle>
                <CardDescription>Top performing routes by revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {routeData.map((route) => (
                    <div key={route.name} className="flex items-center">
                      <div className="w-full">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{route.name}</span>
                          <span className="text-sm font-medium">${route.revenue}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary rounded-full h-2" 
                            style={{ width: `${(route.revenue / 15000) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Bookings by Month</CardTitle>
                <CardDescription>Booking trends over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((month) => (
                    <div key={month.name} className="flex items-center">
                      <div className="w-full">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{month.name}</span>
                          <span className="text-sm font-medium">{month.bookings} bookings</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary rounded-full h-2" 
                            style={{ width: `${(month.bookings / 5000) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ 
  title, 
  value, 
  description, 
  trend,
  icon 
}: { 
  title: string, 
  value: string, 
  description: string, 
  trend: 'up' | 'down',
  icon: React.ReactNode 
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            <p className={`text-xs mt-1 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {description}
            </p>
          </div>
          <div>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function for status colors
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'Cancelled':
      return 'bg-red-100 text-red-800';
    case 'Active':
      return 'bg-green-100 text-green-800';
    case 'Inactive':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default AdminDashboard;


import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, Info, Eye, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';

// Sample booking data
const initialBookings = [
  { 
    id: '8721', 
    customer: 'Raj Sharma',
    contactInfo: '+977-9865412345',
    route: 'Kathmandu - Pokhara', 
    busNumber: 'NP-01-001',
    travelDate: '2023-05-15',
    seats: '12, 13',
    amount: 1500,
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
  },
  { 
    id: '8722', 
    customer: 'Anu Thapa',
    contactInfo: '+977-9845231256',
    route: 'Pokhara - Chitwan',
    busNumber: 'NP-02-123', 
    travelDate: '2023-05-16',
    seats: '5',
    amount: 750,
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
  },
  { 
    id: '8723', 
    customer: 'Kiran KC',
    contactInfo: '+977-9812567432',
    route: 'Kathmandu - Chitwan',
    busNumber: 'NP-03-456', 
    travelDate: '2023-05-14',
    seats: '8, 9, 10',
    amount: 2250,
    paymentStatus: 'Pending',
    bookingStatus: 'Reserved',
  },
  { 
    id: '8724', 
    customer: 'Sita Rai',
    contactInfo: '+977-9876543210',
    route: 'Bhaktapur - Patan',
    busNumber: 'NP-02-321', 
    travelDate: '2023-05-12',
    seats: '17',
    amount: 200,
    paymentStatus: 'Cancelled',
    bookingStatus: 'Cancelled',
  },
  { 
    id: '8725', 
    customer: 'Binod Tamang',
    contactInfo: '+977-9802345671',
    route: 'Kathmandu - Lumbini',
    busNumber: 'NP-01-789', 
    travelDate: '2023-05-18',
    seats: '21, 22',
    amount: 1800,
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
  },
];

const AdminBookings = () => {
  const [bookings, setBookings] = useState(initialBookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  
  // Filter bookings based on search term and status
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.busNumber.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(booking.bookingStatus);
    
    return matchesSearch && matchesStatus;
  });
  
  const handleViewBooking = (bookingId: string) => {
    toast({
      title: "View Booking",
      description: `Viewing details for booking ID: ${bookingId}`,
    });
  };
  
  const handleDeleteBooking = (bookingId: string) => {
    toast({
      title: "Confirm Delete",
      description: `Are you sure you want to delete booking ID: ${bookingId}?`,
      action: (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            // Delete the booking
            setBookings(bookings.filter(booking => booking.id !== bookingId));
            
            toast({
              title: "Booking Deleted",
              description: "The booking has been deleted successfully",
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
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Reserved':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
        <p className="text-muted-foreground">
          Manage customer bookings and reservations
        </p>
      </div>
      
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search bookings..."
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
                    id="confirmed" 
                    checked={selectedStatuses.includes('Confirmed')}
                    onCheckedChange={() => handleStatusChange('Confirmed')}
                  />
                  <label htmlFor="confirmed" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Confirmed
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="reserved" 
                    checked={selectedStatuses.includes('Reserved')}
                    onCheckedChange={() => handleStatusChange('Reserved')}
                  />
                  <label htmlFor="reserved" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Reserved
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="cancelled" 
                    checked={selectedStatuses.includes('Cancelled')}
                    onCheckedChange={() => handleStatusChange('Cancelled')}
                  />
                  <label htmlFor="cancelled" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Cancelled
                  </label>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      {/* Bookings Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">
                    <div className="flex items-center">
                      Booking ID
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Route</th>
                  <th className="text-left p-4">Bus</th>
                  <th className="text-left p-4">Travel Date</th>
                  <th className="text-left p-4">Seats</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Payment</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">#{booking.id}</td>
                    <td className="p-4">{booking.customer}</td>
                    <td className="p-4">{booking.route}</td>
                    <td className="p-4">{booking.busNumber}</td>
                    <td className="p-4">{booking.travelDate}</td>
                    <td className="p-4">{booking.seats}</td>
                    <td className="p-4">NPR {booking.amount}</td>
                    <td className="p-4">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${getPaymentStatusColor(booking.paymentStatus)}`}>
                        {booking.paymentStatus}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(booking.bookingStatus)}`}>
                        {booking.bookingStatus}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleViewBooking(booking.id)}
                        >
                          <Eye size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteBooking(booking.id)}
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {filteredBookings.length === 0 && (
                  <tr>
                    <td colSpan={10} className="p-4 text-center text-gray-500">
                      No bookings found matching your criteria
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

export default AdminBookings;

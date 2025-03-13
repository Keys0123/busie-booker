
import React from 'react';
import { format } from 'date-fns';
import { Bus, MapPin, Calendar, Clock, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

// Mock travel history data
const travelHistory = [
  {
    id: "BK93452",
    from: "Kathmandu",
    to: "Pokhara",
    date: "2023-04-25",
    busName: "Sajha Yatayat",
    busType: "Deluxe",
    departureTime: "06:30 AM",
    arrivalTime: "12:30 PM",
    fare: 1200,
    status: "Completed"
  },
  {
    id: "BK82341",
    from: "Pokhara",
    to: "Kathmandu",
    date: "2023-04-30",
    busName: "Sajha Yatayat",
    busType: "Deluxe",
    departureTime: "07:00 AM",
    arrivalTime: "01:00 PM",
    fare: 1200,
    status: "Completed"
  },
  {
    id: "BK76549",
    from: "Kathmandu",
    to: "Chitwan",
    date: "2023-05-15",
    busName: "Green Line",
    busType: "AC Deluxe",
    departureTime: "08:00 AM",
    arrivalTime: "02:00 PM",
    fare: 1500,
    status: "Completed"
  },
  {
    id: "BK67812",
    from: "Kathmandu",
    to: "Pokhara",
    date: "2023-06-10",
    busName: "Mountain Express",
    busType: "Super Deluxe",
    departureTime: "07:30 AM",
    arrivalTime: "01:30 PM",
    fare: 1400,
    status: "Completed"
  },
  {
    id: "BK12345",
    from: "Pokhara",
    to: "Kathmandu",
    date: "2023-07-05",
    busName: "Tourist Bus",
    busType: "Premium",
    departureTime: "02:00 PM",
    arrivalTime: "08:00 PM",
    fare: 1300,
    status: "Cancelled",
    refundStatus: "Refunded"
  }
];

const TravelHistory = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Travel History</CardTitle>
          <CardDescription>View all your past journeys with NepalBus</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search by destination, bus or booking ID"
                className="pl-10"
              />
            </div>
            
            <select className="form-select max-w-[200px]">
              <option value="all">All Time</option>
              <option value="6months">Last 6 Months</option>
              <option value="3months">Last 3 Months</option>
              <option value="1month">Last Month</option>
            </select>
          </div>
          
          <div className="space-y-4">
            {travelHistory.map((journey) => (
              <div key={journey.id} className="border rounded-lg p-4 hover:border-primary/30 transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center">
                        <Bus size={18} className="text-primary mr-2" />
                        <h3 className="font-medium">{journey.busName} - {journey.busType}</h3>
                      </div>
                      
                      <div className="flex gap-2">
                        <Badge variant={journey.status === "Completed" ? "default" : "destructive"} className="capitalize">
                          {journey.status}
                        </Badge>
                        
                        {journey.refundStatus && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {journey.refundStatus}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-y-2 sm:gap-x-8 mb-3">
                      <div className="flex items-center">
                        <MapPin size={16} className="text-gray-400 mr-2" />
                        <span><strong>{journey.from}</strong> to <strong>{journey.to}</strong></span>
                      </div>
                      
                      <div className="flex items-center">
                        <Calendar size={16} className="text-gray-400 mr-2" />
                        <span>{format(new Date(journey.date), 'MMMM d, yyyy')}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock size={16} className="text-gray-400 mr-2" />
                        <span>{journey.departureTime} - {journey.arrivalTime}</span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      Booking ID: <span className="font-medium">{journey.id}</span>
                    </div>
                  </div>
                  
                  <div className="md:col-span-1 flex md:flex-col md:items-end justify-between md:border-l md:pl-4 pt-3 md:pt-0 border-t md:border-t-0 mt-3 md:mt-0">
                    <div className="md:mb-2">
                      <div className="text-sm text-gray-500">Fare</div>
                      <div className="font-bold text-lg">NPR {journey.fare}</div>
                    </div>
                    
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {travelHistory.length > 5 && (
            <div className="flex justify-center mt-6">
              <Button variant="outline">Load More Trips</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TravelHistory;


import React, { useState } from 'react';
import { format } from 'date-fns';
import { Download, Users, Calendar, Clock, MapPin, Bus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { TicketService } from '@/services/TicketService';

// Mock saved tickets data
const tickets = [
  {
    id: "TKT123456",
    bookingId: "BK93452",
    from: "Kathmandu",
    to: "Pokhara",
    date: "2023-04-25",
    busName: "Sajha Yatayat",
    busType: "Deluxe",
    departureTime: "06:30 AM",
    arrivalTime: "12:30 PM",
    passengers: [
      { name: "Rajesh Sharma", age: 35, gender: "Male", seat: "A1" }
    ],
    fare: 1200,
    status: "Active"
  },
  {
    id: "TKT789012",
    bookingId: "BK82341",
    from: "Pokhara",
    to: "Kathmandu",
    date: "2023-04-30",
    busName: "Sajha Yatayat",
    busType: "Deluxe",
    departureTime: "07:00 AM",
    arrivalTime: "01:00 PM",
    passengers: [
      { name: "Rajesh Sharma", age: 35, gender: "Male", seat: "B2" }
    ],
    fare: 1200,
    status: "Completed"
  },
  {
    id: "TKT345678",
    bookingId: "BK76549",
    from: "Kathmandu",
    to: "Chitwan",
    date: "2023-05-15",
    busName: "Green Line",
    busType: "AC Deluxe",
    departureTime: "08:00 AM",
    arrivalTime: "02:00 PM",
    passengers: [
      { name: "Rajesh Sharma", age: 35, gender: "Male", seat: "C3" },
      { name: "Anita Sharma", age: 32, gender: "Female", seat: "C4" }
    ],
    fare: 3000,
    status: "Upcoming"
  }
];

const SavedTickets = () => {
  const { toast } = useToast();
  const [ticketFilter, setTicketFilter] = useState("all");
  
  const handleDownloadTicket = (ticket: any) => {
    // Generate ticket data for download
    const ticketData = {
      bookingId: ticket.bookingId,
      bookingDate: new Date(),
      travelDate: new Date(ticket.date),
      from: ticket.from,
      to: ticket.to,
      busName: ticket.busName,
      busType: ticket.busType,
      departureTime: ticket.departureTime,
      arrivalTime: ticket.arrivalTime,
      passengerDetails: ticket.passengers,
      totalAmount: ticket.fare,
      paymentMethod: "Credit Card"
    };
    
    // Generate and download the ticket using existing service
    TicketService.generateTicket(ticketData);
    
    toast({
      title: "Ticket Downloaded",
      description: "Your e-ticket has been downloaded successfully.",
    });
  };
  
  // Filter tickets based on selected tab
  const getFilteredTickets = () => {
    if (ticketFilter === "all") return tickets;
    if (ticketFilter === "upcoming") return tickets.filter(t => t.status === "Upcoming");
    if (ticketFilter === "active") return tickets.filter(t => t.status === "Active");
    if (ticketFilter === "completed") return tickets.filter(t => t.status === "Completed");
    return tickets;
  };
  
  const filteredTickets = getFilteredTickets();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Saved Tickets</CardTitle>
          <CardDescription>Access your e-tickets anytime, anywhere</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="all" value={ticketFilter} onValueChange={setTicketFilter}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Tickets</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value={ticketFilter}>
              {filteredTickets.length > 0 ? (
                <div className="space-y-4">
                  {filteredTickets.map((ticket) => (
                    <div 
                      key={ticket.id} 
                      className={`border rounded-lg overflow-hidden hover:shadow-md transition-shadow ${
                        ticket.status === "Upcoming" ? "border-primary/30" : 
                        ticket.status === "Active" ? "border-green-300" : 
                        "border-gray-200"
                      }`}
                    >
                      <div className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {ticket.from} to {ticket.to}
                            </h3>
                            <div className="flex items-center mt-1 text-gray-600">
                              <Bus size={16} className="mr-1" />
                              {ticket.busName} - {ticket.busType}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className={`px-3 py-1 rounded-full text-sm ${
                              ticket.status === "Upcoming" ? "bg-blue-100 text-blue-800" : 
                              ticket.status === "Active" ? "bg-green-100 text-green-800" : 
                              "bg-gray-100 text-gray-800"
                            }`}>
                              {ticket.status}
                            </div>
                            
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex items-center"
                              onClick={() => handleDownloadTicket(ticket)}
                            >
                              <Download size={16} className="mr-1" />
                              E-Ticket
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center">
                            <Calendar size={16} className="text-gray-400 mr-2 flex-shrink-0" />
                            <div>
                              <div className="text-sm text-gray-500">Travel Date</div>
                              <div>{format(new Date(ticket.date), 'MMMM d, yyyy')}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <Clock size={16} className="text-gray-400 mr-2 flex-shrink-0" />
                            <div>
                              <div className="text-sm text-gray-500">Departure - Arrival</div>
                              <div>{ticket.departureTime} - {ticket.arrivalTime}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <Users size={16} className="text-gray-400 mr-2 flex-shrink-0" />
                            <div>
                              <div className="text-sm text-gray-500">Passengers</div>
                              <div>{ticket.passengers.length} {ticket.passengers.length > 1 ? 'Persons' : 'Person'}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Ticket ID:</span> {ticket.id} | 
                          <span className="font-medium ml-2">Booking ID:</span> {ticket.bookingId}
                        </div>
                      </div>
                      
                      {ticket.status !== "Completed" && (
                        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t">
                          <div className="text-sm flex items-center">
                            <MapPin size={16} className="text-primary mr-1" />
                            <span>Track your bus on the travel day</span>
                          </div>
                          
                          <Button size="sm" variant="outline">Track Journey</Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border rounded-lg">
                  <div className="text-gray-400 mb-2">No tickets found</div>
                  <p className="text-sm text-gray-500">
                    {ticketFilter === "all" 
                      ? "You haven't booked any tickets yet" 
                      : `You don't have any ${ticketFilter} tickets`}
                  </p>
                  
                  <Button className="mt-4" asChild>
                    <a href="/">Book a Ticket</a>
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SavedTickets;

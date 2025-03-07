
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Search as SearchIcon } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const Search = () => {
  const navigate = useNavigate();
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  
  // Popular destinations in Nepal
  const popularDestinations = [
    { name: "Kathmandu", image: "https://images.unsplash.com/photo-1558799401-7c3f27b979ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" },
    { name: "Pokhara", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" },
    { name: "Chitwan", image: "https://images.unsplash.com/photo-1544735716-95351a09c5b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" },
    { name: "Lumbini", image: "https://images.unsplash.com/photo-1573471292307-6698cb6addb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fromLocation || !toLocation || !departureDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all the required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Navigate to bus listing with query parameters
    navigate(`/bus-listing?from=${fromLocation}&to=${toLocation}&date=${departureDate}`);
  };
  
  const selectDestination = (destination: string) => {
    if (!fromLocation) {
      setFromLocation(destination);
    } else if (!toLocation) {
      setToLocation(destination);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                Find and Book Bus Tickets in Nepal
              </h1>
              <p className="text-gray-600 text-center mb-8">
                Search for bus routes, compare prices, and book your tickets online for a hassle-free journey
              </p>
              
              {/* Search Form */}
              <div className="bg-white p-6 rounded-xl shadow-soft">
                <form onSubmit={handleSearch} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="from" className="text-sm font-medium">From</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-gray-400" size={16} />
                        <input
                          id="from"
                          type="text"
                          value={fromLocation}
                          onChange={(e) => setFromLocation(e.target.value)}
                          placeholder="Departure City"
                          className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="to" className="text-sm font-medium">To</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-gray-400" size={16} />
                        <input
                          id="to"
                          type="text"
                          value={toLocation}
                          onChange={(e) => setToLocation(e.target.value)}
                          placeholder="Arrival City"
                          className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="date" className="text-sm font-medium">Departure Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 text-gray-400" size={16} />
                      <input
                        id="date"
                        type="date"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <SearchIcon size={18} />
                    Search Buses
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        
        {/* Popular Destinations */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Popular Destinations</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularDestinations.map((destination, index) => (
                <div 
                  key={index} 
                  className="relative overflow-hidden rounded-lg shadow-soft group cursor-pointer"
                  onClick={() => selectDestination(destination.name)}
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img 
                      src={destination.image} 
                      alt={destination.name} 
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                    <h3 className="text-white font-medium p-4">{destination.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Why Choose Us */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-12 text-center">Why Choose NepalBus</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-lg shadow-soft text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">24/7 Booking</h3>
                <p className="text-gray-600">Book your tickets anytime, anywhere without the hassle of visiting a physical counter.</p>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-soft text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
                <p className="text-gray-600">Multiple secure payment options available for a hassle-free booking experience.</p>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-soft text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Customer Support</h3>
                <p className="text-gray-600">Our dedicated support team is available to assist you with any queries or issues.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;

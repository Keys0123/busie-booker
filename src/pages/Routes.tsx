import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RouteCard from '@/components/ui/RouteCard';
import { RouteService } from '@/services/RouteService';

const RoutesPage = () => {
  const [popularRoutes, setPopularRoutes] = useState([]);
  
  // Fetch active routes from the service
  useEffect(() => {
    const activeRoutes = RouteService.getActiveRoutes();
    
    // Map routes to the format needed by RouteCard
    const formattedRoutes = activeRoutes.map(route => ({
      from: route.startPoint,
      to: route.endPoint,
      price: parseInt(route.fareRange.split('-')[0].replace(/\D/g, '')) || 1000, // Extract first price from range
      imageUrl: route.imageUrl || "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
    }));
    
    setPopularRoutes(formattedRoutes);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-primary/5 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Popular Bus Routes in Nepal</h1>
              <p className="text-gray-600 mb-8">
                Discover the most popular bus routes across Nepal. Book your tickets now for a comfortable and safe journey.
              </p>
              <Link to="/search" className="btn-primary">
                Search For Routes
              </Link>
            </div>
          </div>
        </section>
        
        {/* Routes Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularRoutes.length > 0 ? (
                popularRoutes.map((route, index) => (
                  <RouteCard 
                    key={index}
                    from={route.from}
                    to={route.to}
                    price={route.price}
                    imageUrl={route.imageUrl}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <h3 className="text-xl font-medium text-gray-600">
                    No active routes available at the moment
                  </h3>
                  <p className="mt-2 text-gray-500">
                    Please check back later or contact support for more information.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Info Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">About Bus Travel in Nepal</h2>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-soft">
                  <h3 className="text-lg font-semibold mb-3">Popular Bus Routes</h3>
                  <p className="text-gray-600">
                    Nepal offers a variety of scenic routes for bus travel. The Kathmandu to Pokhara route is particularly popular,
                    offering breathtaking views of the Himalayas. Other popular routes include Kathmandu to Chitwan (for wildlife enthusiasts),
                    and Pokhara to Lumbini (birthplace of Buddha).
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-soft">
                  <h3 className="text-lg font-semibold mb-3">Types of Buses</h3>
                  <p className="text-gray-600">
                    Nepal offers several types of buses for different budgets and comfort levels:
                  </p>
                  <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
                    <li>Tourist Buses - Comfortable buses with AC, reclining seats, and regular stops</li>
                    <li>Deluxe Buses - More comfortable with fewer seats and amenities</li>
                    <li>Local Buses - Budget-friendly option, but less comfortable for long journeys</li>
                    <li>Micro Buses - Small vans that offer faster travel but less space</li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-soft">
                  <h3 className="text-lg font-semibold mb-3">Travel Tips</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Book your tickets in advance, especially during peak tourist seasons</li>
                    <li>Carry water and snacks for long journeys</li>
                    <li>Keep your valuables close at all times</li>
                    <li>Check the weather conditions before traveling in mountainous regions</li>
                    <li>Be prepared for delayed schedules on remote routes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default RoutesPage;

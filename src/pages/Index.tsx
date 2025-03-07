
import React from 'react';
import { ChevronRight, ThumbsUp, Shield, Clock, Map } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import RouteCard from '@/components/ui/RouteCard';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />
        
        {/* Popular Routes Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold mb-4">Popular Routes</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover the most popular bus routes across Nepal. Book your tickets now for a comfortable and safe journey.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <RouteCard 
                from="Kathmandu" 
                to="Pokhara" 
                price={1200} 
                imageUrl="https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" 
              />
              <RouteCard 
                from="Kathmandu" 
                to="Chitwan" 
                price={800} 
                imageUrl="https://images.unsplash.com/photo-1544735716-95351a09c5b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" 
              />
              <RouteCard 
                from="Pokhara" 
                to="Kathmandu" 
                price={1200} 
                imageUrl="https://images.unsplash.com/photo-1585108718981-c5e09fd30f97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" 
              />
            </div>
            
            <div className="mt-10 text-center">
              <Link to="/routes" className="inline-flex items-center text-primary font-medium hover:underline">
                View All Routes
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold mb-4">Why Choose NepalBus</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We're dedicated to making your journey comfortable, safe, and hassle-free from booking to arrival.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard 
                icon={<ThumbsUp className="text-primary" size={24} />}
                title="Easy Booking"
                description="Book your bus tickets in just a few clicks with our simple and intuitive interface."
              />
              <FeatureCard 
                icon={<Shield className="text-primary" size={24} />}
                title="Secure Payments"
                description="Your payment information is always secure with our trusted payment gateways."
              />
              <FeatureCard 
                icon={<Clock className="text-primary" size={24} />}
                title="24/7 Support"
                description="Our customer support team is available 24/7 to assist you with any queries."
              />
              <FeatureCard 
                icon={<Map className="text-primary" size={24} />}
                title="Wide Coverage"
                description="We offer bus services to all major destinations across Nepal."
              />
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Booking a bus ticket with NepalBus is simple and straightforward. Follow these easy steps:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StepCard 
                number={1}
                title="Search for Buses"
                description="Enter your departure, destination, and travel date to find available buses."
              />
              <StepCard 
                number={2}
                title="Select Your Seats"
                description="Choose your preferred seats from the interactive seat map."
              />
              <StepCard 
                number={3}
                title="Pay & Confirm"
                description="Complete the payment process and receive your e-ticket instantly."
              />
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
              <p className="text-gray-600 mb-8">
                Book your bus tickets now and experience the most convenient way to travel across Nepal.
              </p>
              <Link to="/search" className="btn-primary py-3 px-8 text-lg">
                Book Your Ticket Now
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-shadow duration-300">
    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

type StepCardProps = {
  number: number;
  title: string;
  description: string;
};

const StepCard = ({ number, title, description }: StepCardProps) => (
  <div className="relative bg-white rounded-xl p-6 shadow-soft">
    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
      {number}
    </div>
    <div className="mt-6 text-center">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default Index;

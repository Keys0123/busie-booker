import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchForm from './SearchForm';

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-20 pb-16 flex items-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-blue-50 to-transparent opacity-60 animate-pulse-soft"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-blue-50 to-transparent opacity-70 animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
        
        {/* Animated circles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-radial from-primary/5 to-transparent animate-pulse-soft"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-radial from-primary/10 to-transparent animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating elements */}
        <div className="absolute top-20 right-1/3 w-16 h-16 bg-blue-100/20 rounded-full animate-float opacity-70"></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-blue-100/30 rounded-full animate-float opacity-50" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 right-1/5 w-12 h-12 bg-primary/10 rounded-full animate-float opacity-60" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Keep existing grid content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="animate-fade-in-up">
            <div className="mb-4">
              <span className="inline-block py-1 px-3 text-xs font-medium bg-blue-50 text-primary rounded-full">
                #1 Bus Ticketing Platform in Nepal
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Book Bus Tickets <br />
              <span className="text-primary">Easily & Securely</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Experience the most convenient way to book bus tickets across Nepal. 
              Find the best routes, choose your seats, and travel with confidence.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/routes" className="btn-primary">
                <span className="flex items-center">
                  Explore Routes
                  <ArrowRight size={16} className="ml-2" />
                </span>
              </Link>
              
              <Link to="/about" className="btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
          
          {/* Right Column - Search Form */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-medium p-6 border border-gray-100">
              <SearchForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

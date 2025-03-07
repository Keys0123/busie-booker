
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Separator } from '@/components/ui/separator';
import { Shield, Clock, Award, Users } from 'lucide-react';

const About = () => {
  // Team members
  const teamMembers = [
    {
      name: "Rajesh Sharma",
      position: "CEO & Founder",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Rajesh has over 15 years of experience in the transportation industry and founded NepalBus with a vision to revolutionize bus travel in Nepal."
    },
    {
      name: "Priya Patel",
      position: "Chief Technology Officer",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "With a background in software engineering, Priya oversees all technical aspects of NepalBus, ensuring a seamless booking experience for our users."
    },
    {
      name: "Arun Gurung",
      position: "Operations Manager",
      image: "https://randomuser.me/api/portraits/men/62.jpg",
      bio: "Arun coordinates with bus operators across Nepal to maintain our high standards of service and safety for all routes."
    },
    {
      name: "Sunita Rai",
      position: "Customer Experience Lead",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      bio: "Sunita ensures that every customer receives excellent service from booking to arriving at their destination."
    }
  ];

  // Company stats
  const stats = [
    { value: "50+", label: "Bus Operators", icon: Users },
    { value: "200+", label: "Daily Trips", icon: Clock },
    { value: "100K+", label: "Happy Customers", icon: Award },
    { value: "99%", label: "Customer Satisfaction", icon: Shield }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary/20 to-primary/5 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">About NepalBus</h1>
              <p className="text-lg text-gray-700 mb-8">
                We're making bus travel in Nepal simple, safe, and stress-free.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-soft p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="text-primary" size={24} />
                    </div>
                    <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">Our Story</h2>
              
              <div className="space-y-6 text-gray-700">
                <p>
                  Founded in 2018, NepalBus was born out of a simple frustration: how difficult it was to book bus tickets in Nepal. Our founder, Rajesh Sharma, experienced this firsthand when trying to travel from Kathmandu to Pokhara and spending hours in long queues just to buy a ticket.
                </p>
                
                <p>
                  He realized that in an increasingly digital world, the bus transportation sector in Nepal had been left behind. This sparked the idea for an online platform that would make bus travel accessible, efficient, and hassle-free for everyone.
                </p>
                
                <p>
                  Starting with just five bus operators and a handful of routes, NepalBus has grown to become Nepal's leading online bus ticketing platform. Today, we connect thousands of travelers with over 50 bus operators across the country, offering more than 200 daily trips to destinations throughout Nepal.
                </p>
                
                <p>
                  Our mission remains the same: to transform the way people travel by bus in Nepal by providing a seamless booking experience, transparent pricing, and excellent customer service.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <Separator className="max-w-4xl mx-auto" />
        
        {/* Our Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-12 text-center">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-soft">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Safety First</h3>
                <p className="text-gray-600">
                  We partner with reliable bus operators who prioritize passenger safety and maintain their vehicles to the highest standards.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-soft">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Transparency</h3>
                <p className="text-gray-600">
                  We provide clear information about bus types, amenities, schedules, and prices, so customers can make informed decisions.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-soft">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Convenience</h3>
                <p className="text-gray-600">
                  Our platform is designed to make booking bus tickets quick and easy, saving our customers time and reducing stress.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Meet Our Team */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-12 text-center">Meet Our Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-xl shadow-soft overflow-hidden">
                  <div className="aspect-w-1 aspect-h-1">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-primary text-sm mb-2">{member.position}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;

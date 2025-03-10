import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import AutomationShowcase from '@/components/home/AutomationShowcase';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <AutomationShowcase />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

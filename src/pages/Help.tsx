
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Mail, Phone, MessageSquare } from 'lucide-react';

const Help = () => {
  // Common FAQs for bus booking
  const faqs = [
    {
      question: "How do I book a bus ticket?",
      answer: "To book a bus ticket, go to the Search page, enter your departure and arrival cities along with the date of travel. Select a bus from the results, choose your seat, enter passenger details, and proceed to payment."
    },
    {
      question: "Can I cancel my ticket?",
      answer: "Yes, you can cancel your ticket up to 6 hours before departure. Go to your booking history, select the booking you want to cancel, and click on the cancel button. Refunds will be processed according to our cancellation policy."
    },
    {
      question: "How can I get a refund for my cancelled ticket?",
      answer: "Refunds are automatically processed to the original payment method used for booking. The refund amount depends on how early you cancel - full refund if cancelled 24 hours before departure, 75% refund if cancelled 12 hours before, and 50% refund if cancelled 6 hours before departure."
    },
    {
      question: "What if I miss my bus?",
      answer: "Unfortunately, if you miss your bus, the ticket is considered used and no refund will be provided. We recommend arriving at the departure point at least 30 minutes before the scheduled departure time."
    },
    {
      question: "Can I change my travel date?",
      answer: "Yes, you can change your travel date up to 12 hours before departure. Go to your booking history, select the booking you want to modify, and click on the reschedule button. A small fee may apply."
    },
    {
      question: "How early should I arrive at the bus station?",
      answer: "We recommend arriving at least 30 minutes before the scheduled departure time to allow for check-in and boarding procedures."
    },
    {
      question: "What identification is required during travel?",
      answer: "All passengers must carry a valid government-issued photo ID such as a citizenship card, passport, or driver's license for verification at the time of boarding."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Help Center Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">How Can We Help You?</h1>
            <p className="text-gray-600">
              Find answers to common questions and learn how to make the most of our bus booking service.
            </p>
          </div>
          
          {/* FAQs Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-soft overflow-hidden">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="px-6 py-4 text-left font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
          
          {/* Contact Methods */}
          <section>
            <h2 className="text-2xl font-bold mb-8 text-center">Get in Touch</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* Email Support */}
              <div className="bg-white rounded-xl shadow-soft p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Email Support</h3>
                <p className="text-gray-600 mb-4">
                  Send us an email and we'll get back to you within 24 hours.
                </p>
                <a href="mailto:support@nepalbus.com" className="text-primary font-medium hover:underline">
                  support@nepalbus.com
                </a>
              </div>
              
              {/* Phone Support */}
              <div className="bg-white rounded-xl shadow-soft p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4">
                  Available Monday to Saturday, 9AM to 6PM.
                </p>
                <a href="tel:+9779812345678" className="text-primary font-medium hover:underline">
                  +977 9812345678
                </a>
              </div>
              
              {/* Live Chat */}
              <div className="bg-white rounded-xl shadow-soft p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4">
                  Chat with our support team in real-time.
                </p>
                <button className="text-white bg-primary px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                  Start Chat
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Help;

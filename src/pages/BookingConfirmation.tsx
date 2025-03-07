
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Check, Calendar, MapPin, Bus, Users, Download, Home, Bell } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useToast } from "@/hooks/use-toast";
import { NotificationService, NotificationType } from '@/services/NotificationService';
import NotificationPreferences from '@/components/booking/NotificationPreferences';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const bookingData = location.state;
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [notificationsSent, setNotificationsSent] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // If no booking data is available, redirect to the home page
  useEffect(() => {
    if (!bookingData) {
      navigate('/');
    }
  }, [bookingData, navigate]);
  
  // Send notifications when preferences change
  useEffect(() => {
    if (bookingData && !notificationsSent && (emailNotifications || smsNotifications)) {
      sendNotifications();
    }
  }, [emailNotifications, smsNotifications]);
  
  if (!bookingData) {
    return null; // Will redirect in the useEffect
  }
  
  const { bus, selectedSeats, passengerDetails, from, to, date, totalAmount } = bookingData;
  const bookingDate = new Date();
  const travelDate = new Date(date);
  const bookingId = `NB${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Function to send notifications based on user preferences
  const sendNotifications = async () => {
    if (notificationsSent || (!emailNotifications && !smsNotifications)) return;
    
    setIsProcessing(true);
    
    // Gather the primary passenger's contact details
    // In a real app, this would come from the form or user profile
    const primaryPassenger = passengerDetails[0];
    const recipient = {
      name: primaryPassenger.name,
      email: emailNotifications ? `${primaryPassenger.name.toLowerCase().replace(/\s/g, '.')}@example.com` : undefined,
      phone: smsNotifications ? '+9779812345678' : undefined
    };
    
    // Prepare notification data
    const notificationData = {
      bookingId,
      passengerDetails,
      journeyDetails: {
        from,
        to,
        date,
        busName: bus.busName,
        departureTime: bus.departureTime,
        arrivalTime: bus.arrivalTime
      },
      totalAmount
    };
    
    try {
      // Send email notification if enabled
      if (emailNotifications) {
        const emailSent = await NotificationService.sendBookingConfirmation(
          recipient,
          notificationData,
          'email'
        );
        
        if (emailSent) {
          toast({
            title: "Email Sent",
            description: `Booking confirmation sent to ${recipient.email}`,
            duration: 3000,
          });
        }
      }
      
      // Send SMS notification if enabled
      if (smsNotifications) {
        const smsSent = await NotificationService.sendBookingConfirmation(
          recipient,
          notificationData,
          'sms'
        );
        
        if (smsSent) {
          toast({
            title: "SMS Sent",
            description: `Booking confirmation sent to ${recipient.phone}`,
            duration: 3000,
          });
          
          // Schedule travel reminder for 24 hours before departure
          const reminderDate = new Date(travelDate);
          reminderDate.setDate(reminderDate.getDate() - 1);
          
          // In a real app, this would be handled by a background job/cron
          console.log(`Travel reminder scheduled for ${format(reminderDate, 'MMM d, yyyy HH:mm')}`);
        }
      }
      
      setNotificationsSent(true);
    } catch (error) {
      console.error('Error sending notifications:', error);
      toast({
        title: "Notification Error",
        description: "Failed to send some notifications. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50 pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Success Message */}
          <div className="bg-green-50 rounded-xl p-6 flex items-center gap-4 mb-8 animate-fade-in-up">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <Check size={24} className="text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-800 mb-1">Booking Confirmed!</h1>
              <p className="text-green-700">
                Your booking has been confirmed. Ticket details have been sent to your email.
              </p>
            </div>
          </div>
          
          {/* Booking Information */}
          <div className="bg-white rounded-xl shadow-soft overflow-hidden mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-primary/5 p-6 border-b border-primary/10">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Booking Information</h2>
                <div className="text-sm text-gray-600">
                  Booking Date: {format(bookingDate, 'MMM d, yyyy')}
                </div>
              </div>
              <div className="text-primary font-medium mt-1">
                Booking ID: {bookingId}
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Journey Details */}
                <div>
                  <h3 className="font-medium mb-3">Journey Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Calendar size={18} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Travel Date</div>
                        <div className="text-gray-600">{format(travelDate, 'EEEE, MMMM d, yyyy')}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin size={18} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Route</div>
                        <div className="text-gray-600">{from} to {to}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Bus size={18} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Bus Details</div>
                        <div className="text-gray-600">{bus.busName} - {bus.busType}</div>
                        <div className="text-gray-600">Departure: {bus.departureTime} | Arrival: {bus.arrivalTime}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Users size={18} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Seats</div>
                        <div className="text-gray-600">{selectedSeats.map(seat => seat.number).join(', ')}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Passenger Details */}
                <div>
                  <h3 className="font-medium mb-3">Passenger Details</h3>
                  <div className="space-y-4">
                    {passengerDetails.map((passenger, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-xs font-medium text-primary flex-shrink-0 mr-3">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{passenger.name}</div>
                          <div className="text-gray-600">
                            {passenger.age} years, {passenger.gender.charAt(0).toUpperCase() + passenger.gender.slice(1)}
                          </div>
                          <div className="text-primary text-sm">Seat: {passenger.seat}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Payment Information */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="font-medium mb-3">Payment Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-600">Payment Method</div>
                    <div className="font-medium">Credit Card</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Payment Status</div>
                    <div className="text-green-600 font-medium">Paid</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Transaction ID</div>
                    <div className="font-medium">TXN123456789</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Total Amount</div>
                    <div className="font-medium">NPR {totalAmount.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              
              {/* Notification Preferences */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center mb-4">
                  <Bell size={18} className="text-primary mr-2" />
                  <h3 className="font-medium">Stay Updated</h3>
                </div>
                
                <NotificationPreferences 
                  emailEnabled={emailNotifications}
                  smsEnabled={smsNotifications}
                  onEmailChange={(checked) => setEmailNotifications(checked)}
                  onSmsChange={(checked) => setSmsNotifications(checked)}
                />
                
                {isProcessing && (
                  <div className="mt-3 text-sm text-gray-600">
                    Processing notifications...
                  </div>
                )}
                
                {notificationsSent && (
                  <div className="mt-3 text-sm text-green-600">
                    Notifications sent successfully! You'll receive updates about your journey.
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button className="btn-secondary flex items-center">
              <Download size={18} className="mr-2" />
              Download E-Ticket
            </button>
            
            <Link to="/" className="btn-primary flex items-center">
              <Home size={18} className="mr-2" />
              Return to Home
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingConfirmation;

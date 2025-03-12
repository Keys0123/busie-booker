
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Check, Calendar, MapPin, Bus, Users, Download, Home, Bell } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useToast } from "@/hooks/use-toast";
import { NotificationService, NotificationType } from '@/services/NotificationService';
import NotificationPreferences from '@/components/booking/NotificationPreferences';
import PaymentMethodSelector from '@/components/payment/PaymentMethodSelector';
import PaymentProcessor from '@/components/payment/PaymentProcessor';
import { PaymentMethod } from '@/services/PaymentService';
import { TicketService } from '@/services/TicketService';
import { Button } from '@/components/ui/button';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const bookingData = location.state;
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [notificationsSent, setNotificationsSent] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit-card');
  const [paymentComplete, setPaymentComplete] = useState(false);
  
  // Check if payment was completed via URL params (for eSewa redirect)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentStatus = params.get('q');
    
    if (paymentStatus === 'su') {
      // eSewa success
      setPaymentComplete(true);
      toast({
        title: "Payment Successful",
        description: "Your eSewa payment has been processed successfully.",
        duration: 5000,
      });
    } else if (paymentStatus === 'fu') {
      // eSewa failure
      toast({
        title: "Payment Failed",
        description: "There was an issue processing your eSewa payment.",
        variant: "destructive",
        duration: 5000,
      });
    }
  }, [location.search]);
  
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

  const handlePaymentSuccess = () => {
    setPaymentComplete(true);
  };
  
  const handlePaymentCancel = () => {
    // Handle payment cancellation if needed
  };
  
  const handleDownloadTicket = () => {
    const paymentMethodName = 
      paymentMethod === 'esewa' ? 'eSewa' : 
      paymentMethod === 'khalti' ? 'Khalti' : 
      'Credit Card';
    
    // Prepare ticket data
    const ticketData = {
      bookingId,
      bookingDate,
      travelDate,
      from,
      to,
      busName: bus.busName,
      busType: bus.busType,
      departureTime: bus.departureTime,
      arrivalTime: bus.arrivalTime,
      passengerDetails,
      totalAmount,
      paymentMethod: paymentMethodName
    };
    
    // Generate and download the ticket
    TicketService.generateTicket(ticketData);
    
    // Show toast notification
    toast({
      title: "Ticket Downloaded",
      description: "Your e-ticket has been downloaded successfully.",
      duration: 3000,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50 pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Success Message - Only show if payment is complete */}
          {paymentComplete && (
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
          )}
          
          {/* Payment Selection - Only show if payment is not complete */}
          {!paymentComplete && (
            <div className="bg-white rounded-xl shadow-soft p-6 mb-8 animate-fade-in-up">
              <h2 className="text-xl font-semibold mb-4">Complete Your Payment</h2>
              <p className="text-gray-600 mb-6">
                Please select a payment method to complete your booking.
              </p>
              
              <div className="space-y-6">
                <PaymentMethodSelector 
                  selectedMethod={paymentMethod}
                  onMethodChange={setPaymentMethod}
                />
                
                <div className="pt-4 border-t border-gray-100">
                  <PaymentProcessor
                    paymentMethod={paymentMethod}
                    amount={totalAmount}
                    bookingId={bookingId}
                    onSuccess={handlePaymentSuccess}
                    onCancel={handlePaymentCancel}
                  />
                </div>
              </div>
            </div>
          )}
          
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
                    <div className="font-medium">
                      {paymentComplete ? (
                        paymentMethod === 'esewa' ? 'eSewa' : 
                        paymentMethod === 'khalti' ? 'Khalti' : 
                        'Credit Card'
                      ) : 'Pending'}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Payment Status</div>
                    <div className={`font-medium ${paymentComplete ? 'text-green-600' : 'text-amber-600'}`}>
                      {paymentComplete ? 'Paid' : 'Pending'}
                    </div>
                  </div>
                  {paymentComplete && (
                    <>
                      <div>
                        <div className="text-gray-600">Transaction ID</div>
                        <div className="font-medium">TXN{Math.floor(100000000 + Math.random() * 900000000)}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Total Amount</div>
                        <div className="font-medium">NPR {totalAmount.toLocaleString()}</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              {/* Notification Preferences - Only show if payment is complete */}
              {paymentComplete && (
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
              )}
            </div>
          </div>
          
          {/* Actions - Only show if payment is complete */}
          {paymentComplete && (
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Button 
                variant="secondary" 
                className="flex items-center"
                onClick={handleDownloadTicket}
              >
                <Download size={18} className="mr-2" />
                Download E-Ticket
              </Button>
              
              <Link to="/" className="btn-primary flex items-center">
                <Home size={18} className="mr-2" />
                Return to Home
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingConfirmation;

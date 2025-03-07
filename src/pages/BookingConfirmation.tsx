
import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Check, Calendar, MapPin, Bus, Users, Download, Home } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;
  
  // If no booking data is available, redirect to the home page
  React.useEffect(() => {
    if (!bookingData) {
      navigate('/');
    }
  }, [bookingData, navigate]);
  
  if (!bookingData) {
    return null; // Will redirect in the useEffect
  }
  
  const { bus, selectedSeats, passengerDetails, from, to, date, totalAmount } = bookingData;
  const bookingDate = new Date();
  const travelDate = new Date(date);
  const bookingId = `NB${Math.floor(100000 + Math.random() * 900000)}`;
  
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

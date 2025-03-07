
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Users, CreditCard } from 'lucide-react';
import { format } from 'date-fns';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SeatMap, { Seat } from '@/components/ui/SeatMap';
import { BusInfo } from '@/components/ui/BusCard';

const SeatSelection = () => {
  const { busId } = useParams<{ busId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const [bus, setBus] = useState<BusInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [passengerDetails, setPassengerDetails] = useState<any[]>([]);
  
  // Get search parameters
  const from = queryParams.get('from') || '';
  const to = queryParams.get('to') || '';
  const dateString = queryParams.get('date') || '';
  const passengers = parseInt(queryParams.get('passengers') || '1');
  const date = new Date(dateString);
  
  // Fetch bus and seat data
  useEffect(() => {
    // In a real app, this would be an API call to get the bus details and seat layout
    const mockBus: BusInfo = {
      id: 'bus1',
      busName: 'Sajha Yatayat',
      busType: 'Deluxe',
      departureTime: '06:30 AM',
      arrivalTime: '12:30 PM',
      duration: '6h 0m',
      price: 1200,
      availableSeats: 18,
      rating: 4.5,
      amenities: ['WiFi', 'Water', 'Blanket', 'Charging Port'],
    };
    
    const generateSeats = (): Seat[] => {
      // Generate 30 seats (A1-F5 layout)
      const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
      const columns = [1, 2, 3, 4];
      
      const seatArray: Seat[] = [];
      let id = 1;
      
      rows.forEach(row => {
        columns.forEach(col => {
          // Randomly assign some seats as booked
          const isBooked = Math.random() < 0.3;
          const status = isBooked ? 'booked' : 'available';
          
          seatArray.push({
            id: `seat-${id}`,
            number: `${row}${col}`,
            status,
            price: 1200 // Base price, could vary by seat position
          });
          
          id++;
        });
      });
      
      return seatArray;
    };
    
    // Simulate API delay
    setTimeout(() => {
      setBus(mockBus);
      setSeats(generateSeats());
      setLoading(false);
    }, 800);
  }, [busId]);
  
  // Initialize passenger details when selectedSeats changes
  useEffect(() => {
    setPassengerDetails(
      selectedSeats.map(seat => ({
        seat: seat.number,
        name: '',
        age: '',
        gender: ''
      }))
    );
  }, [selectedSeats]);
  
  const handleSeatSelect = (seat: Seat) => {
    if (seat.status === 'selected') {
      // Deselect the seat
      setSeats(seats.map(s => 
        s.id === seat.id ? { ...s, status: 'available' } : s
      ));
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else if (seat.status === 'available') {
      // Check if max seats are already selected
      if (selectedSeats.length >= passengers) {
        // If max reached, we can show a message or toast here
        return;
      }
      
      // Select the seat
      setSeats(seats.map(s => 
        s.id === seat.id ? { ...s, status: 'selected' } : s
      ));
      setSelectedSeats([...selectedSeats, seat]);
    }
  };
  
  const handlePassengerDetailsChange = (index: number, field: string, value: string) => {
    const updatedDetails = [...passengerDetails];
    updatedDetails[index] = { ...updatedDetails[index], [field]: value };
    setPassengerDetails(updatedDetails);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here we would normally validate and process the booking
    // For demo, we'll just navigate to a confirmation page
    navigate('/booking-confirmation', { 
      state: { 
        bus,
        selectedSeats,
        passengerDetails,
        from,
        to,
        date: dateString,
        totalAmount: selectedSeats.reduce((total, seat) => total + seat.price, 0)
      } 
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse-soft">Loading...</div>
        </main>
      </div>
    );
  }
  
  if (!bus) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div>Bus not found</div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50 pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <button 
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-gray-600 hover:text-primary mb-4"
            >
              <ArrowLeft size={18} className="mr-1" />
              Back to Bus List
            </button>
            
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Select Your Seats</h1>
            <div className="text-gray-600">
              {from} to {to} | {format(date, 'EEEE, MMMM d, yyyy')}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Seat Map */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
                <h2 className="text-xl font-semibold mb-2">{bus.busName} - {bus.busType}</h2>
                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
                  <div>
                    <strong>Departure:</strong> {bus.departureTime} ({from})
                  </div>
                  <div>
                    <strong>Arrival:</strong> {bus.arrivalTime} ({to})
                  </div>
                  <div>
                    <strong>Duration:</strong> {bus.duration}
                  </div>
                </div>
                
                <SeatMap 
                  seats={seats} 
                  onSeatSelect={handleSeatSelect}
                  maxSelectableSeats={passengers}
                />
              </div>
              
              {/* Passenger Details Form */}
              {selectedSeats.length > 0 && (
                <div className="bg-white rounded-xl shadow-soft p-6 animate-fade-in">
                  <h2 className="text-xl font-semibold mb-4">Passenger Details</h2>
                  
                  <form onSubmit={handleSubmit}>
                    {passengerDetails.map((passenger, index) => (
                      <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium">Passenger {index + 1}</h3>
                          <div className="text-primary font-medium">Seat {passenger.seat}</div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name
                            </label>
                            <input 
                              type="text"
                              className="form-input"
                              placeholder="Enter full name"
                              value={passenger.name}
                              onChange={(e) => handlePassengerDetailsChange(index, 'name', e.target.value)}
                              required
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Age
                              </label>
                              <input 
                                type="number"
                                min="1"
                                max="120"
                                className="form-input"
                                placeholder="Age"
                                value={passenger.age}
                                onChange={(e) => handlePassengerDetailsChange(index, 'age', e.target.value)}
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Gender
                              </label>
                              <select
                                className="form-input"
                                value={passenger.gender}
                                onChange={(e) => handlePassengerDetailsChange(index, 'gender', e.target.value)}
                                required
                              >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-6 lg:hidden">
                      <button 
                        type="submit"
                        className="btn-primary w-full py-3 flex items-center justify-center"
                        disabled={selectedSeats.length === 0}
                      >
                        <CreditCard size={18} className="mr-2" />
                        Proceed to Payment
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
            
            {/* Right Column - Booking Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-soft p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Selected Seats</span>
                    <span>
                      {selectedSeats.length > 0 
                        ? selectedSeats.map(s => s.number).join(', ') 
                        : 'None'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Passengers</span>
                    <span className="flex items-center">
                      <Users size={16} className="mr-1" />
                      {selectedSeats.length}
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ticket Price</span>
                      <span>NPR {bus.price.toLocaleString()} × {selectedSeats.length}</span>
                    </div>
                    
                    {/* You can add other charges here like service fee, etc. */}
                    
                    <div className="flex justify-between font-bold text-lg mt-2">
                      <span>Total</span>
                      <span>NPR {(bus.price * selectedSeats.length).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button 
                    type="submit"
                    form="passenger-form"
                    className="btn-primary w-full py-3 flex items-center justify-center"
                    disabled={selectedSeats.length === 0}
                    onClick={handleSubmit}
                  >
                    <CreditCard size={18} className="mr-2" />
                    Proceed to Payment
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    By proceeding, you agree to our terms and conditions and cancellation policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SeatSelection;

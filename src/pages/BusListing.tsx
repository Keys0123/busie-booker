
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowLeft, MapPin, Calendar, Users, Filter, SortAsc, SortDesc } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BusCard, { BusInfo } from '@/components/ui/BusCard';

const BusListing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const [from, setFrom] = useState(queryParams.get('from') || '');
  const [to, setTo] = useState(queryParams.get('to') || '');
  const [dateString, setDateString] = useState(queryParams.get('date') || format(new Date(), 'yyyy-MM-dd'));
  const [passengers, setPassengers] = useState(parseInt(queryParams.get('passengers') || '1'));
  
  const [filters, setFilters] = useState({
    busType: 'all',
    priceRange: [0, 5000],
    timeOfDay: 'all',
  });
  
  const [sortBy, setSortBy] = useState('price-asc');
  const [buses, setBuses] = useState<BusInfo[]>([]);
  const [filteredBuses, setFilteredBuses] = useState<BusInfo[]>([]);
  
  // Mock data for buses
  useEffect(() => {
    // In a real app, this would be an API call with the query parameters
    const mockBuses: BusInfo[] = [
      {
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
      },
      {
        id: 'bus2',
        busName: 'Nepal Yatayat',
        busType: 'AC',
        departureTime: '07:00 AM',
        arrivalTime: '01:30 PM',
        duration: '6h 30m',
        price: 1000,
        availableSeats: 10,
        rating: 4.2,
        amenities: ['WiFi', 'Water', 'TV'],
      },
      {
        id: 'bus3',
        busName: 'Gandaki Express',
        busType: 'Premium',
        departureTime: '08:15 AM',
        arrivalTime: '02:15 PM',
        duration: '6h 0m',
        price: 1500,
        availableSeats: 5,
        rating: 4.8,
        amenities: ['WiFi', 'Water', 'Blanket', 'Charging Port', 'Snacks', 'TV'],
      },
      {
        id: 'bus4',
        busName: 'Mountain Express',
        busType: 'Super Deluxe',
        departureTime: '09:00 AM',
        arrivalTime: '03:00 PM',
        duration: '6h 0m',
        price: 1800,
        availableSeats: 12,
        rating: 4.7,
        amenities: ['WiFi', 'Water', 'Blanket', 'Charging Port', 'Snacks', 'TV'],
      },
      {
        id: 'bus5',
        busName: 'Tourist Bus Service',
        busType: 'Tourist',
        departureTime: '04:30 PM',
        arrivalTime: '10:30 PM',
        duration: '6h 0m',
        price: 1300,
        availableSeats: 8,
        rating: 4.4,
        amenities: ['WiFi', 'Water', 'Blanket', 'Charging Port'],
      },
    ];
    
    setBuses(mockBuses);
  }, [from, to, dateString]);
  
  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...buses];
    
    // Apply filters
    if (filters.busType !== 'all') {
      filtered = filtered.filter(bus => bus.busType === filters.busType);
    }
    
    filtered = filtered.filter(bus => 
      bus.price >= filters.priceRange[0] && bus.price <= filters.priceRange[1]
    );
    
    // Apply time of day filter
    if (filters.timeOfDay === 'morning') {
      filtered = filtered.filter(bus => bus.departureTime.includes('AM'));
    } else if (filters.timeOfDay === 'evening') {
      filtered = filtered.filter(bus => bus.departureTime.includes('PM'));
    }
    
    // Apply sorting
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'departure-asc') {
      filtered.sort((a, b) => {
        const timeA = convertToMinutes(a.departureTime);
        const timeB = convertToMinutes(b.departureTime);
        return timeA - timeB;
      });
    } else if (sortBy === 'rating-desc') {
      filtered.sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredBuses(filtered);
  }, [buses, filters, sortBy]);
  
  // Helper to convert time to minutes for sorting
  const convertToMinutes = (timeStr: string) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (hours === 12) {
      hours = 0;
    }
    
    if (modifier === 'PM') {
      hours += 12;
    }
    
    return hours * 60 + minutes;
  };
  
  const date = new Date(dateString);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50 pt-20">
        {/* Search summary bar */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto py-4 px-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <button 
                onClick={() => navigate('/')}
                className="inline-flex items-center text-gray-600 hover:text-primary"
              >
                <ArrowLeft size={18} className="mr-1" />
                Back to Search
              </button>
              
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center">
                  <MapPin size={16} className="text-gray-400 mr-1" />
                  <span className="font-medium">{from}</span>
                  <span className="mx-2">→</span>
                  <span className="font-medium">{to}</span>
                </div>
                
                <div className="flex items-center">
                  <Calendar size={16} className="text-gray-400 mr-1" />
                  <span>{format(date, 'EEEE, MMM d, yyyy')}</span>
                </div>
                
                <div className="flex items-center">
                  <Users size={16} className="text-gray-400 mr-1" />
                  <span>{passengers} {passengers === 1 ? 'passenger' : 'passengers'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Filters */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-soft p-6 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <Filter size={18} />
                </div>
                
                {/* Bus Type Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-2">Bus Type</h4>
                  <div className="space-y-2">
                    {['all', 'Deluxe', 'AC', 'Premium', 'Super Deluxe', 'Tourist'].map((type) => (
                      <div key={type} className="flex items-center">
                        <input 
                          type="radio"
                          id={`type-${type}`}
                          name="busType"
                          className="form-radio h-4 w-4 text-primary"
                          checked={filters.busType === type}
                          onChange={() => setFilters({...filters, busType: type})}
                        />
                        <label htmlFor={`type-${type}`} className="ml-2 text-sm text-gray-700">
                          {type === 'all' ? 'All Types' : type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price Range Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-2">Price Range</h4>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">NPR {filters.priceRange[0]}</span>
                    <span className="text-sm text-gray-600">NPR {filters.priceRange[1]}</span>
                  </div>
                  <input 
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({
                      ...filters, 
                      priceRange: [filters.priceRange[0], parseInt(e.target.value)]
                    })}
                    className="w-full"
                  />
                </div>
                
                {/* Departure Time Filter */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Departure Time</h4>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'Any Time' },
                      { value: 'morning', label: 'Morning (Before 12 PM)' },
                      { value: 'evening', label: 'Evening (After 12 PM)' },
                    ].map((time) => (
                      <div key={time.value} className="flex items-center">
                        <input 
                          type="radio"
                          id={`time-${time.value}`}
                          name="timeOfDay"
                          className="form-radio h-4 w-4 text-primary"
                          checked={filters.timeOfDay === time.value}
                          onChange={() => setFilters({...filters, timeOfDay: time.value})}
                        />
                        <label htmlFor={`time-${time.value}`} className="ml-2 text-sm text-gray-700">
                          {time.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content - Bus List */}
            <div className="lg:col-span-3">
              {/* Sort Options */}
              <div className="bg-white rounded-xl shadow-soft p-4 mb-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {filteredBuses.length} {filteredBuses.length === 1 ? 'bus' : 'buses'} found
                    </h3>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">Sort by:</span>
                    <select 
                      className="form-input py-1"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="departure-asc">Departure Time</option>
                      <option value="rating-desc">Rating</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Bus List */}
              <div className="space-y-6">
                {filteredBuses.length > 0 ? (
                  filteredBuses.map((bus) => (
                    <BusCard 
                      key={bus.id} 
                      bus={bus} 
                      searchParams={{ from, to, date: dateString, passengers }}
                    />
                  ))
                ) : (
                  <div className="bg-white rounded-xl shadow-soft p-8 text-center">
                    <h3 className="text-xl font-medium mb-2">No buses found</h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your filters or changing your travel date.
                    </p>
                    <button 
                      onClick={() => setFilters({
                        busType: 'all',
                        priceRange: [0, 5000],
                        timeOfDay: 'all',
                      })}
                      className="btn-primary"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BusListing;

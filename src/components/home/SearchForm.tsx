
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Search } from 'lucide-react';
import { format } from 'date-fns';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

const popularCities = [
  "Kathmandu", "Pokhara", "Chitwan", "Lumbini", 
  "Biratnagar", "Birgunj", "Bhaktapur", "Butwal",
  "Dharan", "Nepalgunj", "Ilam", "Janakpur"
];

const SearchForm = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [passengers, setPassengers] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Navigate to search results with query params
    navigate(`/bus-listing?from=${from}&to=${to}&date=${format(date, 'yyyy-MM-dd')}&passengers=${passengers}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h2 className="text-xl font-medium mb-4">Search for Bus Tickets</h2>
      
      {/* From Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
        <Popover>
          <PopoverTrigger asChild>
            <div className="form-input flex items-center cursor-text">
              <MapPin size={18} className="text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Departure City"
                className="w-full bg-transparent border-none outline-none p-0"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                required
              />
            </div>
          </PopoverTrigger>
          <PopoverContent 
            className="w-full p-2 max-h-64 overflow-auto"
            align="start"
          >
            <div className="grid grid-cols-1 gap-1">
              {popularCities.map((city) => (
                <button
                  key={city}
                  type="button"
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md text-sm transition-colors"
                  onClick={() => setFrom(city)}
                >
                  {city}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      {/* To Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
        <Popover>
          <PopoverTrigger asChild>
            <div className="form-input flex items-center cursor-text">
              <MapPin size={18} className="text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Arrival City"
                className="w-full bg-transparent border-none outline-none p-0"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
              />
            </div>
          </PopoverTrigger>
          <PopoverContent 
            className="w-full p-2 max-h-64 overflow-auto"
            align="start"
          >
            <div className="grid grid-cols-1 gap-1">
              {popularCities.map((city) => (
                <button
                  key={city}
                  type="button"
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md text-sm transition-colors"
                  onClick={() => setTo(city)}
                >
                  {city}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      {/* Date and Passengers */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Date Picker */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <button 
                type="button"
                className="form-input flex items-center justify-start cursor-pointer w-full"
              >
                <Calendar size={18} className="text-gray-400 mr-2" />
                <span>{format(date, 'MMM dd, yyyy')}</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Passengers */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
          <div className="form-input flex items-center">
            <Users size={18} className="text-gray-400 mr-2" />
            <select 
              className="w-full bg-transparent border-none outline-none p-0 appearance-none cursor-pointer"
              value={passengers}
              onChange={(e) => setPassengers(parseInt(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Person' : 'People'}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Submit Button */}
      <button 
        type="submit" 
        className="btn-primary w-full py-3 flex items-center justify-center"
      >
        <Search size={18} className="mr-2" />
        Search Buses
      </button>
    </form>
  );
};

export default SearchForm;

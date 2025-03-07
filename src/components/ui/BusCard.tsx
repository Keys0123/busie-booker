
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, PiggyBank, Stars, ChevronRight } from 'lucide-react';

export type BusInfo = {
  id: string;
  busName: string;
  busType: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availableSeats: number;
  rating: number;
  amenities: string[];
};

type BusCardProps = {
  bus: BusInfo;
  searchParams: {
    from: string;
    to: string;
    date: string;
    passengers: number;
  };
};

const BusCard = ({ bus, searchParams }: BusCardProps) => {
  const navigate = useNavigate();
  
  const handleSelectBus = () => {
    const queryParams = new URLSearchParams(searchParams as any).toString();
    navigate(`/seat-selection/${bus.id}?${queryParams}`);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-soft overflow-hidden border border-gray-100 hover:border-blue-100 transition-all duration-300 animate-fade-in-up">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center">
          {/* Bus Info */}
          <div className="lg:flex-1">
            <div className="flex items-center mb-3">
              <h3 className="text-xl font-semibold">{bus.busName}</h3>
              <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-50 text-primary rounded-md">
                {bus.busType}
              </span>
            </div>
            
            {/* Time and Duration */}
            <div className="flex flex-wrap items-center gap-y-3">
              <div className="flex flex-col items-center mr-5">
                <span className="text-xl font-semibold">{bus.departureTime}</span>
                <span className="text-xs text-gray-500">Departure</span>
              </div>
              
              <div className="relative mx-5 w-16 lg:w-24">
                <div className="h-0.5 bg-gray-300 absolute top-1/2 w-full"></div>
                <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-gray-400"></div>
                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary"></div>
              </div>
              
              <div className="flex flex-col items-center mr-5">
                <span className="text-xl font-semibold">{bus.arrivalTime}</span>
                <span className="text-xs text-gray-500">Arrival</span>
              </div>
              
              <div className="flex items-center text-gray-600 ml-auto lg:ml-0">
                <Clock size={16} className="mr-1" />
                <span className="text-sm">{bus.duration}</span>
              </div>
            </div>
            
            {/* Amenities */}
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {bus.amenities.map((amenity, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 text-xs bg-gray-50 text-gray-700 rounded-md"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Price and CTA */}
          <div className="border-t lg:border-t-0 lg:border-l border-gray-100 pl-0 lg:pl-6 pt-4 lg:pt-0 mt-4 lg:mt-0 flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4">
            <div className="flex flex-col items-start lg:items-end">
              <div className="flex items-center mb-1">
                <Stars size={14} className="text-yellow-500 mr-1" />
                <span className="text-sm text-gray-600">{bus.rating.toFixed(1)}/5</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <PiggyBank size={16} className="text-green-500" />
                <span className="text-gray-600">{bus.availableSeats} seats left</span>
              </div>
              
              <div className="text-primary font-bold text-2xl mt-1">
                NPR {bus.price.toLocaleString()}
              </div>
            </div>
            
            <button 
              className="btn-primary flex items-center whitespace-nowrap"
              onClick={handleSelectBus}
            >
              Select Seats
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusCard;

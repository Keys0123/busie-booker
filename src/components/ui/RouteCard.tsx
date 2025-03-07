
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

type RouteCardProps = {
  from: string;
  to: string;
  price: number;
  imageUrl: string;
};

const RouteCard = ({ from, to, price, imageUrl }: RouteCardProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    navigate(`/bus-listing?from=${from}&to=${to}&date=${format(tomorrow, 'yyyy-MM-dd')}&passengers=1`);
  };
  
  return (
    <div 
      className="group rounded-xl overflow-hidden shadow-soft transition-all duration-300 hover:shadow-medium cursor-pointer bg-white"
      onClick={handleClick}
    >
      {/* Image */}
      <div className="h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={`${from} to ${to}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-lg font-medium">
            <span>{from}</span>
            <ArrowRight size={16} className="text-gray-400" />
            <span>{to}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Starts from
            <span className="block text-primary font-semibold text-lg">
              NPR {price.toLocaleString()}
            </span>
          </div>
          
          <div 
            className="p-2 rounded-full bg-blue-50 text-primary transition-all duration-300 
                      group-hover:bg-primary group-hover:text-white"
          >
            <ArrowRight size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteCard;


import React from 'react';
import { Clock, TrendingDown } from 'lucide-react';
import { PriceAlert } from '@/services/NotificationService';
import { Button } from '@/components/ui/button';

interface PriceAlertCardProps {
  alert: PriceAlert;
  onViewDeal?: () => void;
}

const PriceAlertCard: React.FC<PriceAlertCardProps> = ({ alert, onViewDeal }) => {
  const discountPercentage = alert.discount || 
    Math.round(((alert.originalPrice - alert.newPrice) / alert.originalPrice) * 100);

  return (
    <div className="bg-white border border-green-100 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="bg-green-50 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <TrendingDown className="text-green-600 mr-2 h-5 w-5" />
          <span className="font-medium text-green-800">Price Drop Alert</span>
        </div>
        <div className="bg-green-100 text-green-800 font-medium px-2 py-0.5 rounded-full text-sm">
          {discountPercentage}% Off
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2">{alert.route}</h3>
        
        <div className="flex items-baseline mb-4">
          <span className="text-gray-500 line-through mr-2">NPR {alert.originalPrice.toLocaleString()}</span>
          <span className="text-green-600 font-bold text-xl">NPR {alert.newPrice.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Clock className="h-4 w-4 mr-1" />
          <span>Offer expires in {alert.expiresIn}</span>
        </div>
        
        {onViewDeal && (
          <Button 
            className="w-full" 
            variant="outline"
            onClick={onViewDeal}
          >
            View Deal
          </Button>
        )}
      </div>
    </div>
  );
};

export default PriceAlertCard;

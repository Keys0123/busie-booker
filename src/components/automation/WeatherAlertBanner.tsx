
import React from 'react';
import { Cloud, CloudRain, CloudSnow, CloudSun, AlertCircle } from 'lucide-react';
import { WeatherAlert } from '@/services/NotificationService';

interface WeatherAlertBannerProps {
  alert: WeatherAlert;
  onDismiss?: () => void;
}

const WeatherAlertBanner: React.FC<WeatherAlertBannerProps> = ({ alert, onDismiss }) => {
  const getBgColor = () => {
    switch (alert.severity) {
      case 'high':
        return 'bg-red-50 border-red-200';
      case 'medium':
        return 'bg-amber-50 border-amber-200';
      case 'low':
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getTextColor = () => {
    switch (alert.severity) {
      case 'high':
        return 'text-red-800';
      case 'medium':
        return 'text-amber-800';
      case 'low':
      default:
        return 'text-blue-800';
    }
  };

  const getIcon = () => {
    const className = "h-5 w-5 flex-shrink-0";
    const iconColor = alert.severity === 'high' ? 'text-red-500' : 
                      alert.severity === 'medium' ? 'text-amber-500' : 
                      'text-blue-500';
    
    switch (alert.condition.toLowerCase()) {
      case 'rain':
      case 'rainy':
      case 'showers':
        return <CloudRain className={`${className} ${iconColor}`} />;
      case 'snow':
      case 'snowy':
        return <CloudSnow className={`${className} ${iconColor}`} />;
      case 'partly cloudy':
      case 'mostly cloudy':
        return <CloudSun className={`${className} ${iconColor}`} />;
      case 'cloudy':
        return <Cloud className={`${className} ${iconColor}`} />;
      default:
        return <AlertCircle className={`${className} ${iconColor}`} />;
    }
  };

  return (
    <div className={`rounded-md border p-4 mb-4 ${getBgColor()}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${getTextColor()}`}>
            Weather Alert: {alert.location}
          </h3>
          <div className={`mt-2 text-sm ${getTextColor()}`}>
            <p>{alert.message}</p>
          </div>
        </div>
        {onDismiss && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onDismiss}
                className={`inline-flex rounded-md p-1.5 ${getTextColor()} hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50`}
              >
                <span className="sr-only">Dismiss</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherAlertBanner;

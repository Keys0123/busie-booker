
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export interface NotificationPreferencesProps {
  emailEnabled: boolean;
  smsEnabled: boolean;
  weatherAlertsEnabled?: boolean;
  priceAlertsEnabled?: boolean;
  onEmailChange: (checked: boolean) => void;
  onSmsChange: (checked: boolean) => void;
  onWeatherAlertsChange?: (checked: boolean) => void;
  onPriceAlertsChange?: (checked: boolean) => void;
}

const NotificationPreferences = ({
  emailEnabled,
  smsEnabled,
  weatherAlertsEnabled = false,
  priceAlertsEnabled = false,
  onEmailChange,
  onSmsChange,
  onWeatherAlertsChange,
  onPriceAlertsChange
}: NotificationPreferencesProps) => {
  return (
    <div className="space-y-4 mt-4">
      <h3 className="text-sm font-medium">Notification Preferences</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="email-notifications" 
            checked={emailEnabled}
            onCheckedChange={onEmailChange}
          />
          <Label htmlFor="email-notifications">
            Send booking confirmation and updates via email
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="sms-notifications" 
            checked={smsEnabled}
            onCheckedChange={onSmsChange}
          />
          <Label htmlFor="sms-notifications">
            Send journey reminders via SMS (24 hours before departure)
          </Label>
        </div>

        {onWeatherAlertsChange && (
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="weather-alerts" 
              checked={weatherAlertsEnabled}
              onCheckedChange={onWeatherAlertsChange}
            />
            <Label htmlFor="weather-alerts">
              Send weather alerts for your journey location
            </Label>
          </div>
        )}

        {onPriceAlertsChange && (
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="price-alerts" 
              checked={priceAlertsEnabled}
              onCheckedChange={onPriceAlertsChange}
            />
            <Label htmlFor="price-alerts">
              Notify me of price drops on routes I've viewed
            </Label>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPreferences;

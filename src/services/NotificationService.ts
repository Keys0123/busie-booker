
import { toast } from "@/hooks/use-toast";

export type NotificationType = 'email' | 'sms';

export interface NotificationRecipient {
  email?: string;
  phone?: string;
  name: string;
}

export interface NotificationData {
  bookingId: string;
  passengerDetails: {
    name: string;
    seat: string;
  }[];
  journeyDetails: {
    from: string;
    to: string;
    date: string;
    busName: string;
    departureTime: string;
    arrivalTime: string;
  };
  totalAmount: number;
}

export interface WeatherAlert {
  location: string;
  condition: string;
  severity: 'low' | 'medium' | 'high';
  message: string;
  date: string;
}

export interface PriceAlert {
  route: string;
  originalPrice: number;
  newPrice: number;
  expiresIn: string;
  discount?: number;
}

// Mock implementation for demonstration purposes
// In a real app, this would connect to an email service like SendGrid
// and an SMS gateway like Twilio or Vonage
export class NotificationService {
  static async sendBookingConfirmation(
    recipient: NotificationRecipient,
    data: NotificationData,
    type: NotificationType
  ): Promise<boolean> {
    console.log(`Sending ${type} confirmation to ${recipient.name}`);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (type === 'email' && recipient.email) {
        console.log(`Email sent to ${recipient.email} with booking ID: ${data.bookingId}`);
        return true;
      } 
      else if (type === 'sms' && recipient.phone) {
        console.log(`SMS sent to ${recipient.phone} with booking ID: ${data.bookingId}`);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error(`Failed to send ${type} notification:`, error);
      return false;
    }
  }
  
  static async sendTravelReminder(
    recipient: NotificationRecipient,
    data: NotificationData,
    type: NotificationType
  ): Promise<boolean> {
    console.log(`Sending ${type} travel reminder to ${recipient.name}`);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (type === 'email' && recipient.email) {
        console.log(`Travel reminder email sent to ${recipient.email} for journey on ${data.journeyDetails.date}`);
        return true;
      } 
      else if (type === 'sms' && recipient.phone) {
        console.log(`Travel reminder SMS sent to ${recipient.phone} for journey on ${data.journeyDetails.date}`);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error(`Failed to send ${type} travel reminder:`, error);
      return false;
    }
  }

  static async sendWeatherAlert(
    recipient: NotificationRecipient,
    weatherAlert: WeatherAlert,
    type: NotificationType
  ): Promise<boolean> {
    console.log(`Sending ${type} weather alert to ${recipient.name}`);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const alertMessage = `Weather Alert: ${weatherAlert.condition} (${weatherAlert.severity} severity) in ${weatherAlert.location} on ${weatherAlert.date}. ${weatherAlert.message}`;
      
      if (type === 'email' && recipient.email) {
        console.log(`Weather alert email sent to ${recipient.email}: ${alertMessage}`);
        return true;
      } 
      else if (type === 'sms' && recipient.phone) {
        console.log(`Weather alert SMS sent to ${recipient.phone}: ${alertMessage}`);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error(`Failed to send ${type} weather alert:`, error);
      return false;
    }
  }

  static async sendPriceAlert(
    recipient: NotificationRecipient,
    priceAlert: PriceAlert,
    type: NotificationType
  ): Promise<boolean> {
    console.log(`Sending ${type} price alert to ${recipient.name}`);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const discountPercentage = priceAlert.discount || 
        Math.round(((priceAlert.originalPrice - priceAlert.newPrice) / priceAlert.originalPrice) * 100);
        
      const alertMessage = `Price Drop Alert: ${priceAlert.route} now at NPR ${priceAlert.newPrice} (${discountPercentage}% off). Offer expires in ${priceAlert.expiresIn}.`;
      
      if (type === 'email' && recipient.email) {
        console.log(`Price alert email sent to ${recipient.email}: ${alertMessage}`);
        return true;
      } 
      else if (type === 'sms' && recipient.phone) {
        console.log(`Price alert SMS sent to ${recipient.phone}: ${alertMessage}`);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error(`Failed to send ${type} price alert:`, error);
      return false;
    }
  }
}


import React, { useState, useEffect } from 'react';
import { Bell, CloudLightning, TrendingDown, Users, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WeatherAlert, PriceAlert, NotificationService } from '@/services/NotificationService';
import { PricingService } from '@/services/PricingService';
import WeatherAlertBanner from '@/components/automation/WeatherAlertBanner';
import PriceAlertCard from '@/components/automation/PriceAlertCard';
import NotificationPreferences from '@/components/booking/NotificationPreferences';
import { useToast } from "@/hooks/use-toast";

const AutomationShowcase: React.FC = () => {
  const { toast } = useToast();
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setEmailSMS] = useState(false);
  const [weatherAlertsEnabled, setWeatherAlertsEnabled] = useState(true);
  const [priceAlertsEnabled, setPriceAlertsEnabled] = useState(true);
  
  const [weatherAlerts, setWeatherAlerts] = useState<WeatherAlert[]>([]);
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    // Generate sample weather alerts
    const sampleWeatherAlerts: WeatherAlert[] = [
      {
        location: 'Pokhara',
        condition: 'Rain',
        severity: 'medium',
        message: 'Heavy rainfall expected tomorrow. Please plan your journey accordingly.',
        date: '2023-07-15'
      },
      {
        location: 'Kathmandu',
        condition: 'Partly Cloudy',
        severity: 'low',
        message: 'Mild weather conditions with occasional clouds.',
        date: '2023-07-18'
      }
    ];
    
    // Generate sample price alerts
    const routePairs = [
      { from: 'Kathmandu', to: 'Pokhara' },
      { from: 'Pokhara', to: 'Chitwan' },
      { from: 'Chitwan', to: 'Lumbini' }
    ];
    
    const samplePriceAlerts: PriceAlert[] = routePairs.map(({ from, to }) => {
      const discount = PricingService.generatePriceDiscount(from, to);
      return {
        route: `${from} to ${to}`,
        originalPrice: discount.originalPrice,
        newPrice: discount.newPrice,
        expiresIn: `${discount.expiryHours} hours`,
        discount: discount.discountPercentage
      };
    });
    
    setWeatherAlerts(sampleWeatherAlerts);
    setPriceAlerts(samplePriceAlerts);
  }, []);

  const dismissWeatherAlert = (index: number) => {
    setWeatherAlerts(prevAlerts => prevAlerts.filter((_, i) => i !== index));
  };

  const handleSendNotification = async () => {
    if (!emailEnabled && !smsEnabled) {
      toast({
        title: "Notification Error",
        description: "Please enable at least one notification method.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const mockRecipient = {
        name: "John Doe",
        email: emailEnabled ? "john.doe@example.com" : undefined,
        phone: smsEnabled ? "+9779812345678" : undefined
      };

      // Send different types of notifications based on user preferences
      if (weatherAlertsEnabled && weatherAlerts.length > 0) {
        const weatherAlert = weatherAlerts[0];
        
        if (emailEnabled) {
          await NotificationService.sendWeatherAlert(mockRecipient, weatherAlert, 'email');
          toast({
            title: "Weather Alert Sent",
            description: `Weather alert for ${weatherAlert.location} sent to your email.`,
            duration: 3000,
          });
        }
        
        if (smsEnabled) {
          await NotificationService.sendWeatherAlert(mockRecipient, weatherAlert, 'sms');
          toast({
            title: "Weather Alert Sent",
            description: `Weather alert for ${weatherAlert.location} sent to your phone.`,
            duration: 3000,
          });
        }
      }

      if (priceAlertsEnabled && priceAlerts.length > 0) {
        const priceAlert = priceAlerts[0];
        
        if (emailEnabled) {
          await NotificationService.sendPriceAlert(mockRecipient, priceAlert, 'email');
          toast({
            title: "Price Alert Sent",
            description: `Price alert for ${priceAlert.route} sent to your email.`,
            duration: 3000,
          });
        }
        
        if (smsEnabled) {
          await NotificationService.sendPriceAlert(mockRecipient, priceAlert, 'sms');
          toast({
            title: "Price Alert Sent",
            description: `Price alert for ${priceAlert.route} sent to your phone.`,
            duration: 3000,
          });
        }
      }
    } catch (error) {
      console.error("Error sending notifications:", error);
      toast({
        title: "Notification Error",
        description: "Failed to send notifications. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Smart Booking Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience our automated features designed to make your travel planning easier, 
            more informed, and more affordable.
          </p>
        </div>

        <Tabs defaultValue="notifications" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="mr-2 h-4 w-4" />
              <span>Smart Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="weather" className="flex items-center">
              <CloudLightning className="mr-2 h-4 w-4" />
              <span>Weather Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center">
              <TrendingDown className="mr-2 h-4 w-4" />
              <span>Dynamic Pricing</span>
            </TabsTrigger>
          </TabsList>

          {/* Notification Preferences Tab */}
          <TabsContent value="notifications" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Personalize Your Travel Updates</CardTitle>
                <CardDescription>
                  Choose how and when you want to receive important information about your journeys.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NotificationPreferences 
                  emailEnabled={emailEnabled}
                  smsEnabled={smsEnabled}
                  weatherAlertsEnabled={weatherAlertsEnabled}
                  priceAlertsEnabled={priceAlertsEnabled}
                  onEmailChange={setEmailEnabled}
                  onSmsChange={setEmailSMS}
                  onWeatherAlertsChange={setWeatherAlertsEnabled}
                  onPriceAlertsChange={setPriceAlertsEnabled}
                />
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSendNotification} 
                  disabled={isProcessing}
                  className="w-full"
                >
                  {isProcessing ? 'Sending Test Notification...' : 'Send Test Notification'}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Weather Alerts Tab */}
          <TabsContent value="weather" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Weather-Aware Travel</CardTitle>
                <CardDescription>
                  Get real-time weather alerts for your destination to plan your journey better.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {weatherAlerts.length > 0 ? (
                  <div className="space-y-4">
                    {weatherAlerts.map((alert, index) => (
                      <WeatherAlertBanner 
                        key={index} 
                        alert={alert} 
                        onDismiss={() => dismissWeatherAlert(index)} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertTriangle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-500">No Current Weather Alerts</h3>
                    <p className="text-gray-400 mt-2">
                      Any weather conditions that might affect your travel will appear here.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <div className="w-full bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
                  <p>
                    <strong>How it works:</strong> Our system monitors weather forecasts along your 
                    travel route and sends you alerts if adverse conditions are expected. 
                    This helps you prepare or reschedule if needed.
                  </p>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Dynamic Pricing Tab */}
          <TabsContent value="pricing" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Smart Price Alerts</CardTitle>
                <CardDescription>
                  Never miss a deal on routes you care about. Get notified when prices drop.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {priceAlerts.map((alert, index) => (
                    <PriceAlertCard 
                      key={index} 
                      alert={alert} 
                      onViewDeal={() => {
                        toast({
                          title: "Deal Selected",
                          description: `You're being redirected to book ${alert.route} at the discounted price.`,
                        });
                      }} 
                    />
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full bg-green-50 rounded-lg p-4 text-sm text-green-800">
                  <p>
                    <strong>How it works:</strong> Our dynamic pricing system adjusts prices based on 
                    demand, availability, and time to departure. Enable price alerts to be notified when 
                    prices drop for routes you've searched for.
                  </p>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default AutomationShowcase;

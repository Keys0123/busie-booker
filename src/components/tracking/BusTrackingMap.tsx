
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Bus, Map } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/components/theme/ThemeProvider';

// This would normally come from an environment variable
const MAPBOX_TOKEN = 'YOUR_MAPBOX_PUBLIC_TOKEN';

// Simulated bus data
const simulatedBuses = [
  {
    id: 1,
    routeName: 'Kathmandu - Pokhara',
    coordinates: [85.3240, 27.7172], // Kathmandu coordinates
    destination: [83.9856, 28.2096], // Pokhara coordinates
  },
  {
    id: 2,
    routeName: 'Kathmandu - Chitwan',
    coordinates: [85.3240, 27.7172], // Kathmandu coordinates
    destination: [84.5160, 27.5291], // Chitwan coordinates
  },
];

const BusTrackingMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: number]: mapboxgl.Marker }>({});
  const [mapboxToken, setMapboxToken] = useState<string>(MAPBOX_TOKEN);
  const [showTokenInput, setShowTokenInput] = useState(true);
  const { toast } = useToast();
  const { theme } = useTheme();

  const initializeMap = () => {
    if (!mapContainer.current) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      // Use different map styles based on theme
      const mapStyle = theme === 'dark' 
        ? 'mapbox://styles/mapbox/dark-v11'
        : 'mapbox://styles/mapbox/streets-v11';
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: mapStyle,
        center: [84.1240, 27.7172], // Center of Nepal
        zoom: 7
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add markers for each bus
      simulatedBuses.forEach((bus) => {
        const el = document.createElement('div');
        el.className = 'bus-marker';
        el.innerHTML = '<div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 3H8C5.23858 3 3 5.23858 3 8V16C3 18.7614 5.23858 21 8 21H16C18.7614 21 21 18.7614 21 16V8C21 5.23858 18.7614 3 16 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>';

        const marker = new mapboxgl.Marker(el)
          .setLngLat({ lng: bus.coordinates[0], lat: bus.coordinates[1] })
          .setPopup(new mapboxgl.Popup().setHTML(`<h3 class="font-bold">${bus.routeName}</h3>`))
          .addTo(map.current);

        markersRef.current[bus.id] = marker;
      });

      toast({
        title: "Map initialized",
        description: "Bus tracking is now active",
      });
    } catch (error) {
      console.error("Error initializing map:", error);
      toast({
        title: "Map initialization failed",
        description: "Please check your Mapbox token and try again",
        variant: "destructive",
      });
      setShowTokenInput(true);
    }
  };

  // Simulate bus movement
  const simulateMovement = () => {
    simulatedBuses.forEach((bus) => {
      const marker = markersRef.current[bus.id];
      if (!marker) return;

      const currentPos = marker.getLngLat();
      const dx = (bus.destination[0] - currentPos.lng) * 0.01;
      const dy = (bus.destination[1] - currentPos.lat) * 0.01;

      // Update marker position
      marker.setLngLat({
        lng: currentPos.lng + dx,
        lat: currentPos.lat + dy
      });
    });
  };

  // Effect for theme change - reinitialize map when theme changes
  useEffect(() => {
    if (!mapboxToken || showTokenInput) return;
    
    // If map exists, remove it first
    if (map.current) {
      map.current.remove();
    }
    
    // Initialize the map with the new theme
    initializeMap();

    // Simulate movement every 2 seconds
    const interval = setInterval(simulateMovement, 2000);

    return () => {
      clearInterval(interval);
      if (map.current) {
        map.current.remove();
      }
    };
  }, [mapboxToken, showTokenInput, theme]);

  if (showTokenInput) {
    return (
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Map Configuration</h2>
        <p className="mb-4 text-muted-foreground">
          Please enter your Mapbox public token to initialize the tracking system.
          You can get one from mapbox.com
        </p>
        <div className="flex gap-4">
          <Input
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            placeholder="Enter your Mapbox public token"
            className="flex-1"
          />
          <Button onClick={() => setShowTokenInput(false)}>
            <Map className="mr-2 h-4 w-4" />
            Initialize Map
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Live Bus Tracking</h2>
        <div className="flex items-center gap-2">
          <Bus className="h-5 w-5 text-primary" />
          <span className="font-medium">{simulatedBuses.length} Active Buses</span>
        </div>
      </div>
      <Card>
        <div ref={mapContainer} className="w-full h-[600px] rounded-lg" />
      </Card>
    </div>
  );
};

export default BusTrackingMap;


import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RouteOptimizationService, OptimizedRoute } from '@/services/RouteOptimizationService';
import { MapPin, ArrowRight, CheckCircle } from 'lucide-react';

const RouteOptimizer = () => {
  const [startPoint, setStartPoint] = useState<string>('');
  const [endPoint, setEndPoint] = useState<string>('');
  const [availableStartPoints, setAvailableStartPoints] = useState<string[]>([]);
  const [availableEndPoints, setAvailableEndPoints] = useState<string[]>([]);
  const [greedyResult, setGreedyResult] = useState<OptimizedRoute | null>(null);
  const [dijkstraResult, setDijkstraResult] = useState<OptimizedRoute | null>(null);
  const [comparison, setComparison] = useState<{
    isSamePath: boolean;
    distanceDifference: number;
  } | null>(null);

  // Initialize available start points on component mount
  useEffect(() => {
    const graph = RouteOptimizationService.buildRouteGraph();
    const locations = Object.keys(graph);
    setAvailableStartPoints(locations);
  }, []);

  // Update available end points when start point changes
  useEffect(() => {
    if (startPoint) {
      const destinations = RouteOptimizationService.getPossibleDestinations(startPoint);
      setAvailableEndPoints(destinations);
      setEndPoint(''); // Reset end point when start changes
      resetResults();
    }
  }, [startPoint]);

  const resetResults = () => {
    setGreedyResult(null);
    setDijkstraResult(null);
    setComparison(null);
  };

  const handleCompareAlgorithms = () => {
    if (!startPoint || !endPoint) return;
    
    const results = RouteOptimizationService.compareRouteAlgorithms(startPoint, endPoint);
    setGreedyResult(results.greedy);
    setDijkstraResult(results.dijkstra);
    setComparison({
      isSamePath: results.isSamePath,
      distanceDifference: results.distanceDifference
    });
  };

  const renderPath = (route: OptimizedRoute | null, algorithmName: string) => {
    if (!route) return <p className="text-sm text-gray-500">No path found</p>;

    return (
      <div className="space-y-3">
        <h3 className="font-medium text-lg">{algorithmName} Path</h3>
        <div className="flex flex-wrap items-center gap-2">
          {route.path.map((location, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{location}</span>
              </div>
              {i < route.path.length - 1 && (
                <ArrowRight className="h-4 w-4 text-gray-400" />
              )}
            </React.Fragment>
          ))}
        </div>
        <p className="text-sm font-medium">
          Total Distance: <span className="text-primary">{route.totalDistance} km</span>
        </p>
        <p className="text-sm">
          Stops: {route.stops.length}
        </p>
      </div>
    );
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Route Optimizer</CardTitle>
        <CardDescription>
          Compare different algorithms to find the optimal route between destinations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-point">Start Location</Label>
            <Select
              value={startPoint}
              onValueChange={setStartPoint}
            >
              <SelectTrigger id="start-point" className="w-full">
                <SelectValue placeholder="Select start point" />
              </SelectTrigger>
              <SelectContent>
                {availableStartPoints.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="end-point">Destination</Label>
            <Select
              value={endPoint}
              onValueChange={setEndPoint}
              disabled={!startPoint}
            >
              <SelectTrigger id="end-point" className="w-full">
                <SelectValue placeholder={startPoint ? "Select destination" : "Select start point first"} />
              </SelectTrigger>
              <SelectContent>
                {availableEndPoints.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button
          onClick={handleCompareAlgorithms}
          disabled={!startPoint || !endPoint}
          className="w-full"
        >
          Compare Algorithms
        </Button>
        
        {(greedyResult || dijkstraResult) && (
          <div className="pt-4 space-y-6">
            <Separator />
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                {renderPath(greedyResult, "Greedy Algorithm")}
              </div>
              <div className="space-y-3">
                {renderPath(dijkstraResult, "Dijkstra's Algorithm")}
              </div>
            </div>
            
            {comparison && (
              <>
                <Separator />
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-lg mb-2">Algorithm Comparison</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className={`h-5 w-5 ${comparison.isSamePath ? 'text-green-500' : 'text-amber-500'}`} />
                      <span>
                        {comparison.isSamePath 
                          ? "Both algorithms found the same path" 
                          : "Algorithms found different paths"}
                      </span>
                    </div>
                    
                    {!comparison.isSamePath && (
                      <div className="pl-7">
                        <p>
                          {comparison.distanceDifference > 0 
                            ? `Dijkstra's algorithm found a shorter path (${Math.abs(comparison.distanceDifference)} km shorter)` 
                            : comparison.distanceDifference < 0 
                              ? `Greedy algorithm found a shorter path (${Math.abs(comparison.distanceDifference)} km shorter)`
                              : "Both paths have the same distance"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RouteOptimizer;

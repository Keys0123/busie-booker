
// Define shared types for route optimization

export type Graph = {
  [key: string]: {
    [destination: string]: number;
  };
};

export type RouteNode = {
  location: string;
  distance: number;
  path: string[];
};

export type OptimizedRoute = {
  path: string[];
  totalDistance: number;
  stops: string[];
};


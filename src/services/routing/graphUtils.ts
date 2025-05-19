
// Utilities for building and manipulating route graphs
import { RouteService } from '../RouteService';
import { Graph } from './types';

export const GraphUtils = {
  // Build a graph representation of all routes
  buildRouteGraph(): Graph {
    const routes = RouteService.getAllRoutes();
    const graph: Graph = {};

    // Initialize graph with all locations
    routes.forEach((route) => {
      if (!graph[route.startPoint]) {
        graph[route.startPoint] = {};
      }
      if (!graph[route.endPoint]) {
        graph[route.endPoint] = {};
      }
    });

    // Add connections between locations
    routes.forEach((route) => {
      // Extract numeric distance (remove ' km' and convert to number)
      const distanceValue = parseInt(route.distance.replace(/[^0-9]/g, ''));
      
      // Only add active routes to the graph
      if (route.status === 'Active') {
        graph[route.startPoint][route.endPoint] = distanceValue;
        // Assuming routes can be traveled in both directions
        graph[route.endPoint][route.startPoint] = distanceValue;
      }
    });

    return graph;
  },
  
  // Get all possible destinations from a starting point
  getPossibleDestinations(graph: Graph, start: string): string[] {
    if (!graph[start]) {
      return [];
    }
    return Object.keys(graph[start]);
  }
};

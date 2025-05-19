
// RouteOptimizationService.ts
// This service provides route optimization algorithms for the NepalBus system
import { RouteData, RouteService } from './RouteService';

// Type definitions for graph operations
type Graph = {
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

export const RouteOptimizationService = {
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

  // Greedy algorithm for finding a route between locations
  // This algorithm always chooses the closest next destination
  findGreedyRoute(start: string, end: string): OptimizedRoute | null {
    const graph = this.buildRouteGraph();
    
    // Check if both start and end points exist in our graph
    if (!graph[start] || !graph[end]) {
      console.error("Start or end location not found in route graph");
      return null;
    }

    const visited: Set<string> = new Set();
    const path: string[] = [start];
    let currentNode = start;
    let totalDistance = 0;

    // While we haven't reached our destination
    while (currentNode !== end) {
      visited.add(currentNode);
      
      let nextNode = '';
      let shortestDistance = Infinity;

      // Find the closest unvisited neighbor
      Object.entries(graph[currentNode]).forEach(([neighbor, distance]) => {
        // Ensure distance is treated as a number
        const distanceValue = Number(distance);
        if (!visited.has(neighbor) && distanceValue < shortestDistance) {
          shortestDistance = distanceValue;
          nextNode = neighbor;
        }
      });

      // If we can't find an unvisited neighbor, we're stuck
      if (!nextNode) {
        // Check if we can directly reach the end from here
        if (graph[currentNode][end] !== undefined) {
          path.push(end);
          // Ensure we're adding a number to totalDistance
          totalDistance += Number(graph[currentNode][end]);
          return {
            path,
            totalDistance,
            stops: path
          };
        }
        console.error("No path found with greedy algorithm");
        return null;
      }

      // Move to the next node
      path.push(nextNode);
      // Ensure we're adding a number to totalDistance
      totalDistance += Number(graph[currentNode][nextNode]);
      currentNode = nextNode;
    }

    return {
      path,
      totalDistance,
      stops: path
    };
  },

  // Dijkstra's algorithm for finding the shortest path between locations
  findShortestPath(start: string, end: string): OptimizedRoute | null {
    const graph = this.buildRouteGraph();
    
    // Check if both start and end points exist in our graph
    if (!graph[start] || !graph[end]) {
      console.error("Start or end location not found in route graph");
      return null;
    }

    // Set up data structures for Dijkstra's algorithm
    const distances: Record<string, number> = {};
    const previous: Record<string, string | null> = {};
    const unvisited: Set<string> = new Set();

    // Initialize all distances as infinity and all previous nodes as null
    Object.keys(graph).forEach(location => {
      distances[location] = Infinity;
      previous[location] = null;
      unvisited.add(location);
    });

    // Distance from start to start is 0
    distances[start] = 0;

    // While there are unvisited nodes
    while (unvisited.size > 0) {
      // Find the unvisited node with the smallest distance
      let current: string | null = null;
      let smallestDistance = Infinity;

      unvisited.forEach(location => {
        if (distances[location] < smallestDistance) {
          smallestDistance = distances[location];
          current = location;
        }
      });

      // If we can't find an unvisited node or we've reached the destination, break
      if (current === null || current === end || smallestDistance === Infinity) {
        break;
      }

      // Remove current from unvisited
      unvisited.delete(current);

      // For each neighbor of current
      Object.entries(graph[current]).forEach(([neighbor, distance]) => {
        // Only consider unvisited neighbors
        if (unvisited.has(neighbor)) {
          // Calculate tentative distance, ensuring distance is treated as a number
          const tentativeDistance = distances[current] + Number(distance);
          
          // If tentative distance is smaller than current distance
          if (tentativeDistance < distances[neighbor]) {
            distances[neighbor] = tentativeDistance;
            previous[neighbor] = current;
          }
        }
      });
    }

    // If end is unreachable
    if (distances[end] === Infinity) {
      console.error("No path found to destination");
      return null;
    }

    // Reconstruct the path
    const path: string[] = [];
    let current: string | null = end;
    
    while (current) {
      path.unshift(current);
      current = previous[current];
    }

    return {
      path,
      totalDistance: distances[end],
      stops: path
    };
  },
  
  // Get all possible destinations from a starting point
  getPossibleDestinations(start: string): string[] {
    const graph = this.buildRouteGraph();
    if (!graph[start]) {
      return [];
    }
    return Object.keys(graph[start]);
  },
  
  // Compare the results of both algorithms
  compareRouteAlgorithms(start: string, end: string): {
    greedy: OptimizedRoute | null;
    dijkstra: OptimizedRoute | null;
    isSamePath: boolean;
    distanceDifference: number;
  } {
    const greedyRoute = this.findGreedyRoute(start, end);
    const dijkstraRoute = this.findShortestPath(start, end);
    
    let isSamePath = false;
    let distanceDifference = 0;
    
    if (greedyRoute && dijkstraRoute) {
      isSamePath = JSON.stringify(greedyRoute.path) === JSON.stringify(dijkstraRoute.path);
      distanceDifference = greedyRoute.totalDistance - dijkstraRoute.totalDistance;
    }
    
    return {
      greedy: greedyRoute,
      dijkstra: dijkstraRoute,
      isSamePath,
      distanceDifference
    };
  }
};


// RouteOptimizationService.ts
// This service provides route optimization algorithms for the NepalBus system
import { GraphUtils } from './routing/graphUtils';
import { GreedyAlgorithm } from './routing/greedyAlgorithm';
import { DijkstraAlgorithm } from './routing/dijkstraAlgorithm';
import { OptimizedRoute } from './routing/types';

export type { OptimizedRoute } from './routing/types';
export type { RouteNode } from './routing/types';

export const RouteOptimizationService = {
  // Build a graph representation of all routes
  buildRouteGraph() {
    return GraphUtils.buildRouteGraph();
  },

  // Greedy algorithm for finding a route between locations
  findGreedyRoute(start: string, end: string): OptimizedRoute | null {
    const graph = this.buildRouteGraph();
    return GreedyAlgorithm.findGreedyRoute(graph, start, end);
  },

  // Dijkstra's algorithm for finding the shortest path between locations
  findShortestPath(start: string, end: string): OptimizedRoute | null {
    const graph = this.buildRouteGraph();
    return DijkstraAlgorithm.findShortestPath(graph, start, end);
  },
  
  // Get all possible destinations from a starting point
  getPossibleDestinations(start: string): string[] {
    const graph = this.buildRouteGraph();
    return GraphUtils.getPossibleDestinations(graph, start);
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

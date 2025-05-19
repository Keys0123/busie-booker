
// Implementation of Dijkstra's algorithm for route optimization
import { Graph, OptimizedRoute } from './types';

export const DijkstraAlgorithm = {
  // Dijkstra's algorithm for finding the shortest path between locations
  findShortestPath(graph: Graph, start: string, end: string): OptimizedRoute | null {
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
  }
};

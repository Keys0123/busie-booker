
// Implementation of the Greedy algorithm for route optimization
import { Graph, OptimizedRoute } from './types';

export const GreedyAlgorithm = {
  // Greedy algorithm for finding a route between locations
  // This algorithm always chooses the closest next destination
  findGreedyRoute(graph: Graph, start: string, end: string): OptimizedRoute | null {
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
  }
};

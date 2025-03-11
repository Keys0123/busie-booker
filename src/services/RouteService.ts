
// Route data type used throughout the application
export type RouteData = {
  id: number;
  name: string;
  startPoint: string;
  endPoint: string;
  distance: string;
  duration: string;
  fareRange: string;
  buses: number;
  status: string;
  imageUrl?: string;
};

// Initial sample route data
const initialRoutes: RouteData[] = [
  { 
    id: 1, 
    name: 'Kathmandu - Pokhara', 
    startPoint: 'Kathmandu', 
    endPoint: 'Pokhara', 
    distance: '200 km', 
    duration: '6 hours', 
    fareRange: 'NPR 800 - 1500',
    buses: 12,
    status: 'Active',
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
  },
  { 
    id: 2, 
    name: 'Kathmandu - Chitwan', 
    startPoint: 'Kathmandu', 
    endPoint: 'Chitwan', 
    distance: '150 km', 
    duration: '5 hours', 
    fareRange: 'NPR 600 - 1200',
    buses: 8,
    status: 'Active',
    imageUrl: "https://images.unsplash.com/photo-1544735716-95351a09c5b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
  },
  { 
    id: 3, 
    name: 'Pokhara - Lumbini', 
    startPoint: 'Pokhara', 
    endPoint: 'Lumbini', 
    distance: '180 km', 
    duration: '5.5 hours', 
    fareRange: 'NPR 700 - 1300',
    buses: 6,
    status: 'Active',
    imageUrl: "https://images.unsplash.com/photo-1573471292307-6698cb6addb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
  },
  { 
    id: 4, 
    name: 'Kathmandu - Janakpur', 
    startPoint: 'Kathmandu', 
    endPoint: 'Janakpur', 
    distance: '225 km', 
    duration: '7 hours', 
    fareRange: 'NPR 900 - 1600',
    buses: 5,
    status: 'Inactive',
    imageUrl: "https://images.unsplash.com/photo-1585108718981-c5e09fd30f97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
  },
  { 
    id: 5, 
    name: 'Bhaktapur - Patan', 
    startPoint: 'Bhaktapur', 
    endPoint: 'Patan', 
    distance: '12 km', 
    duration: '40 minutes', 
    fareRange: 'NPR 100 - 200',
    buses: 15,
    status: 'Active',
    imageUrl: "https://images.unsplash.com/photo-1561016696-094e2baeab5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
  },
];

// Use localStorage to persist routes across browser sessions
const ROUTES_STORAGE_KEY = 'nepal_bus_routes';

// Get routes from localStorage or use initial data if none exists
const getStoredRoutes = (): RouteData[] => {
  const storedRoutes = localStorage.getItem(ROUTES_STORAGE_KEY);
  return storedRoutes ? JSON.parse(storedRoutes) : initialRoutes;
};

// Save routes to localStorage
const saveRoutes = (routes: RouteData[]) => {
  localStorage.setItem(ROUTES_STORAGE_KEY, JSON.stringify(routes));
};

// Initialize routes
let routes: RouteData[] = getStoredRoutes();

// Service methods
export const RouteService = {
  // Get all routes
  getAllRoutes: () => {
    return routes;
  },
  
  // Get active routes for public display
  getActiveRoutes: () => {
    return routes.filter(route => route.status === 'Active');
  },
  
  // Get a single route by ID
  getRouteById: (id: number) => {
    return routes.find(route => route.id === id);
  },
  
  // Add a new route
  addRoute: (route: Omit<RouteData, 'id'>) => {
    const newRoute = {
      ...route,
      id: Math.max(...routes.map(r => r.id), 0) + 1,
      imageUrl: route.imageUrl || "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
    };
    routes = [...routes, newRoute];
    saveRoutes(routes);
    return newRoute;
  },
  
  // Update an existing route
  updateRoute: (updatedRoute: RouteData) => {
    routes = routes.map(route => 
      route.id === updatedRoute.id ? updatedRoute : route
    );
    saveRoutes(routes);
    return updatedRoute;
  },
  
  // Delete a route
  deleteRoute: (id: number) => {
    routes = routes.filter(route => route.id !== id);
    saveRoutes(routes);
  }
};

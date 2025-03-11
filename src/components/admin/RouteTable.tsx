
import React from 'react';
import { Edit, Trash, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface RouteData {
  id: number;
  name: string;
  startPoint: string;
  endPoint: string;
  distance: string;
  duration: string;
  fareRange: string;
  buses: number;
  status: string;
}

interface RouteTableProps {
  routes: RouteData[];
  onEdit: (routeId: number) => void;
  onDelete: (routeId: number) => void;
}

const RouteTable = ({ routes, onEdit, onDelete }: RouteTableProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">
                  <div className="flex items-center">
                    Route Name
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th className="text-left p-4">Source</th>
                <th className="text-left p-4">Destination</th>
                <th className="text-left p-4">Distance</th>
                <th className="text-left p-4">Duration</th>
                <th className="text-left p-4">Fare Range</th>
                <th className="text-left p-4">Buses</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route) => (
                <tr key={route.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{route.name}</td>
                  <td className="p-4">{route.startPoint}</td>
                  <td className="p-4">{route.endPoint}</td>
                  <td className="p-4">{route.distance}</td>
                  <td className="p-4">{route.duration}</td>
                  <td className="p-4">{route.fareRange}</td>
                  <td className="p-4">{route.buses}</td>
                  <td className="p-4">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      route.status === 'Active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {route.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onEdit(route.id)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onDelete(route.id)}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {routes.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-4 text-center text-gray-500">
                    No routes found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteTable;

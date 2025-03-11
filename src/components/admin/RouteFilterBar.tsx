
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';

interface RouteFilterBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedStatus: string[];
  onStatusChange: (status: string) => void;
}

const RouteFilterBar = ({
  searchTerm,
  onSearchChange,
  selectedStatus,
  onStatusChange
}: RouteFilterBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="relative w-full sm:w-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search routes..."
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full sm:w-80"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="ml-auto">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-60">
          <div className="space-y-4">
            <h4 className="font-medium">Filter by Status</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="active" 
                  checked={selectedStatus.includes('Active')}
                  onCheckedChange={() => onStatusChange('Active')}
                />
                <label htmlFor="active" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Active
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="inactive" 
                  checked={selectedStatus.includes('Inactive')}
                  onCheckedChange={() => onStatusChange('Inactive')}
                />
                <label htmlFor="inactive" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Inactive
                </label>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default RouteFilterBar;

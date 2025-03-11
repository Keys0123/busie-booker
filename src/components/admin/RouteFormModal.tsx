
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

type RouteData = {
  id: number;
  name: string;
  startPoint: string;
  endPoint: string;
  distance: string;
  duration: string;
  fareRange: string;
  buses: number;
  status: string;
};

type RouteFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (route: RouteData) => void;
  initialData?: RouteData | null;
};

const defaultRouteData: RouteData = {
  id: Date.now(),
  name: '',
  startPoint: '',
  endPoint: '',
  distance: '',
  duration: '',
  fareRange: '',
  buses: 0,
  status: 'Active'
};

const RouteFormModal = ({ isOpen, onClose, onSave, initialData }: RouteFormModalProps) => {
  const [formData, setFormData] = useState<RouteData>(defaultRouteData);
  const [isActive, setIsActive] = useState(true);
  
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setIsActive(initialData.status === 'Active');
    } else {
      setFormData(defaultRouteData);
      setIsActive(true);
    }
  }, [initialData, isOpen]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleStatusChange = (checked: boolean) => {
    setIsActive(checked);
    setFormData(prev => ({
      ...prev,
      status: checked ? 'Active' : 'Inactive'
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.startPoint || !formData.endPoint) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    onSave(formData);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Edit Route' : 'Add New Route'}
          </DialogTitle>
          <DialogDescription>
            {initialData ? 'Update route details below' : 'Enter route details below'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Route Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Kathmandu - Pokhara"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="startPoint">Start Point *</Label>
              <Input
                id="startPoint"
                name="startPoint"
                value={formData.startPoint}
                onChange={handleChange}
                placeholder="e.g., Kathmandu"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endPoint">End Point *</Label>
              <Input
                id="endPoint"
                name="endPoint"
                value={formData.endPoint}
                onChange={handleChange}
                placeholder="e.g., Pokhara"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="distance">Distance</Label>
              <Input
                id="distance"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                placeholder="e.g., 200 km"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 6 hours"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fareRange">Fare Range</Label>
              <Input
                id="fareRange"
                name="fareRange"
                value={formData.fareRange}
                onChange={handleChange}
                placeholder="e.g., NPR 800 - 1500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="buses">Buses</Label>
              <Input
                id="buses"
                name="buses"
                type="number"
                value={formData.buses}
                onChange={handleChange}
                placeholder="e.g., 12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="status"
                  checked={isActive}
                  onCheckedChange={handleStatusChange}
                />
                <Label htmlFor="status">{isActive ? 'Active' : 'Inactive'}</Label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? 'Update Route' : 'Add Route'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RouteFormModal;

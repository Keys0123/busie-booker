
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type BusData = {
  id: number;
  number: string;
  type: string;
  capacity: number;
  route: string;
  driver: string;
  status: string;
  lastMaintenance: string;
};

type BusFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (bus: BusData) => void;
  initialData?: BusData | null;
  routes: { name: string }[];
};

const defaultBusData: BusData = {
  id: Date.now(),
  number: '',
  type: 'Normal',
  capacity: 40,
  route: '',
  driver: '',
  status: 'Active',
  lastMaintenance: new Date().toISOString().split('T')[0]
};

const BusFormModal = ({ isOpen, onClose, onSave, initialData, routes }: BusFormModalProps) => {
  const [formData, setFormData] = useState<BusData>(defaultBusData);
  const [statusType, setStatusType] = useState('Active');
  
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setStatusType(initialData.status);
    } else {
      setFormData(defaultBusData);
      setStatusType('Active');
    }
  }, [initialData, isOpen]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'capacity' ? parseInt(value) || 0 : value
    }));
  };
  
  const handleStatusChange = (status: string) => {
    setStatusType(status);
    setFormData(prev => ({
      ...prev,
      status
    }));
  };
  
  const handleRouteChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      route: value
    }));
  };
  
  const handleTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      type: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.number || !formData.driver || !formData.route) {
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
            {initialData ? 'Edit Bus' : 'Add New Bus'}
          </DialogTitle>
          <DialogDescription>
            {initialData ? 'Update bus details below' : 'Enter bus details below'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="number">Bus Number *</Label>
              <Input
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                placeholder="e.g., NP-01-001"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Select
                value={formData.type}
                onValueChange={handleTypeChange}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select bus type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="Deluxe">Deluxe</SelectItem>
                  <SelectItem value="Super Deluxe">Super Deluxe</SelectItem>
                  <SelectItem value="AC">AC</SelectItem>
                  <SelectItem value="Micro">Micro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity *</Label>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="e.g., 40"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="route">Route *</Label>
              <Select
                value={formData.route}
                onValueChange={handleRouteChange}
              >
                <SelectTrigger id="route">
                  <SelectValue placeholder="Select route" />
                </SelectTrigger>
                <SelectContent>
                  {routes.map((route, index) => (
                    <SelectItem key={index} value={route.name}>
                      {route.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="driver">Driver Name *</Label>
              <Input
                id="driver"
                name="driver"
                value={formData.driver}
                onChange={handleChange}
                placeholder="e.g., Ram Thapa"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastMaintenance">Last Maintenance</Label>
              <Input
                id="lastMaintenance"
                name="lastMaintenance"
                type="date"
                value={formData.lastMaintenance}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={statusType}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
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
              {initialData ? 'Update Bus' : 'Add Bus'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BusFormModal;

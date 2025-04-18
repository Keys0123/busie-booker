
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, Bus, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const Report = () => {
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(20);
    doc.setTextColor(41, 98, 255);
    doc.text('NepalBus System Report', 105, 15, { align: 'center' });
    
    // Add date
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 25, { align: 'center' });
    
    // Add statistics
    const stats = [
      ['Total Users', '1,234'],
      ['Active Buses', '42'],
      ['Popular Routes', '15'],
      ['Monthly Bookings', '856'],
      ['Revenue (Monthly)', 'NPR 456,789'],
    ];
    
    autoTable(doc, {
      head: [['Metric', 'Value']],
      body: stats,
      startY: 35,
      theme: 'grid',
      headStyles: { fillColor: [41, 98, 255] }
    });
    
    // Save the PDF
    doc.save('nepal-bus-report.pdf');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">System Report</h1>
        <Button onClick={generatePDF} className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Download PDF Report
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Users"
          value="1,234"
          description="Active accounts in system"
          icon={<Users className="h-8 w-8 text-primary" />}
        />
        <StatCard
          title="Active Buses"
          value="42"
          description="Currently operating"
          icon={<Bus className="h-8 w-8 text-primary" />}
        />
        <StatCard
          title="Popular Routes"
          value="15"
          description="High-traffic routes"
          icon={<MapPin className="h-8 w-8 text-primary" />}
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Monthly Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Bookings</span>
              <span className="text-2xl font-bold">856</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Revenue</span>
              <span className="text-2xl font-bold">NPR 456,789</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Average Daily Bookings</span>
              <span className="text-2xl font-bold">28.5</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const StatCard = ({ title, value, description, icon }: { 
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
};

export default Report;

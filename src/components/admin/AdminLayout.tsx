
import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Route, 
  Bus, 
  CalendarCheck, 
  Users, 
  LogOut, 
  Menu, 
  X,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // In a real app, perform actual logout logic here
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out bg-card shadow-md border-r border-border",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="h-full flex flex-col justify-between">
          <div>
            {/* Sidebar header with logo */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              {isSidebarOpen && (
                <Link to="/admin" className="text-xl font-bold text-primary">
                  NepalBus Admin
                </Link>
              )}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              >
                {isSidebarOpen ? <ChevronRight size={20} /> : <Menu size={20} />}
              </Button>
            </div>
            
            {/* Navigation Links */}
            <nav className="p-3 space-y-1">
              <NavItem
                to="/admin"
                icon={<LayoutDashboard size={20} />}
                label="Dashboard"
                isActive={location.pathname === '/admin'}
                isExpanded={isSidebarOpen}
              />
              <NavItem
                to="/admin/routes"
                icon={<Route size={20} />}
                label="Routes"
                isActive={location.pathname === '/admin/routes'}
                isExpanded={isSidebarOpen}
              />
              <NavItem
                to="/admin/buses"
                icon={<Bus size={20} />}
                label="Buses"
                isActive={location.pathname === '/admin/buses'}
                isExpanded={isSidebarOpen}
              />
              <NavItem
                to="/admin/bookings"
                icon={<CalendarCheck size={20} />}
                label="Bookings"
                isActive={location.pathname === '/admin/bookings'}
                isExpanded={isSidebarOpen}
              />
              <NavItem
                to="/admin/users"
                icon={<Users size={20} />}
                label="Users"
                isActive={location.pathname === '/admin/users'}
                isExpanded={isSidebarOpen}
              />
            </nav>
          </div>
          
          {/* Footer with logout */}
          <div className="p-3 border-t border-border">
            <button
              onClick={handleLogout}
              className={cn(
                "flex items-center w-full px-3 py-2 rounded-md transition-colors",
                "hover:bg-muted text-foreground"
              )}
            >
              <LogOut size={20} />
              {isSidebarOpen && <span className="ml-3">Logout</span>}
            </button>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <main className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        isSidebarOpen ? "ml-64" : "ml-20"
      )}>
        <header className="bg-card shadow-sm border-b border-border">
          <div className="flex justify-between items-center px-6 py-4">
            <h1 className="text-xl font-semibold text-foreground">
              Admin Panel
            </h1>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button variant="outline" size="sm" onClick={() => navigate('/')}>
                View Website
              </Button>
            </div>
          </div>
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isExpanded: boolean;
};

const NavItem = ({ to, icon, label, isActive, isExpanded }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center px-3 py-2 rounded-md transition-colors",
        isActive
          ? "bg-primary/10 text-primary font-medium"
          : "text-foreground hover:bg-muted",
        !isExpanded && "justify-center"
      )}
    >
      {icon}
      {isExpanded && <span className="ml-3">{label}</span>}
    </Link>
  );
};

export default AdminLayout;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, X, User, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 md:px-8",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-soft py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-primary font-bold text-2xl">
            NepalBus
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLinks />
            
            <div className="flex items-center gap-4">
              <Link 
                to="/login" 
                className="flex items-center gap-2 text-sm font-medium"
              >
                <User size={16} /> Sign In
              </Link>
              
              <Link 
                to="/contact" 
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Phone size={16} /> Contact
              </Link>
              
              <Link 
                to="/search" 
                className="btn-primary"
              >
                Book Tickets
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden z-50" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </nav>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full pt-24 px-8 pb-8">
          <MobileNavLinks />
          
          <div className="mt-auto flex flex-col gap-4">
            <Link 
              to="/login" 
              className="btn-secondary w-full text-center"
            >
              Sign In
            </Link>
            
            <Link 
              to="/search" 
              className="btn-primary w-full text-center"
            >
              Book Tickets
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavLinks = () => (
  <ul className="flex items-center gap-6">
    <NavLink to="/" label="Home" />
    <NavLink to="/routes" label="Routes" />
    <NavLink to="/about" label="About" />
    <NavLink to="/help" label="Help" />
  </ul>
);

const MobileNavLinks = () => (
  <ul className="flex flex-col gap-6 text-lg">
    <NavLink to="/" label="Home" mobile />
    <NavLink to="/routes" label="Routes" mobile />
    <NavLink to="/about" label="About" mobile />
    <NavLink to="/help" label="Help" mobile />
    <NavLink to="/contact" label="Contact" mobile />
  </ul>
);

type NavLinkProps = {
  to: string;
  label: string;
  mobile?: boolean;
};

const NavLink = ({ to, label, mobile }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <li>
      <Link 
        to={to} 
        className={cn(
          "transition-colors duration-200",
          isActive 
            ? "text-primary font-medium" 
            : "text-foreground/80 hover:text-primary",
          mobile && "block py-2"
        )}
      >
        {label}
      </Link>
    </li>
  );
};

export default Navbar;

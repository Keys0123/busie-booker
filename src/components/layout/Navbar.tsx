
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-background border-b border-border fixed w-full z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">NepalBus</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/routes" className="text-foreground hover:text-primary transition-colors">
              Routes
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            <Link to="/help" className="text-foreground hover:text-primary transition-colors">
              Help
            </Link>
          </nav>

          {/* Authentication Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/profile" className="text-foreground hover:text-primary transition-colors">
              My Profile
            </Link>
            <Link to="/login" className="px-4 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-primary-foreground transition-colors">
              Log In
            </Link>
            <Link to="/register" className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="text-foreground hover:text-primary focus:outline-none transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 w-full bg-background border-t border-border shadow-md rounded-b-md overflow-hidden z-50">
              <nav className="px-4 py-3 flex flex-col space-y-2">
                <Link
                  to="/"
                  className="block px-4 py-2 text-base font-medium text-foreground hover:bg-muted rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/routes"
                  className="block px-4 py-2 text-base font-medium text-foreground hover:bg-muted rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Routes
                </Link>
                <Link
                  to="/about"
                  className="block px-4 py-2 text-base font-medium text-foreground hover:bg-muted rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="block px-4 py-2 text-base font-medium text-foreground hover:bg-muted rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  to="/help"
                  className="block px-4 py-2 text-base font-medium text-foreground hover:bg-muted rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Help
                </Link>
              </nav>

              {/* Add Profile link to mobile menu */}
              <div className="pt-4 pb-3 border-t border-border">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-base font-medium text-foreground hover:bg-muted rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-base font-medium text-foreground hover:bg-muted rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 text-base font-medium text-foreground hover:bg-muted rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

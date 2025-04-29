
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card text-foreground pt-12 pb-6 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">NepalBus</h3>
            <p className="text-muted-foreground mb-4">
              The most trusted bus ticketing platform in Nepal, providing safe and comfortable journeys across the country.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink to="/about" label="About Us" />
              <FooterLink to="/routes" label="Routes" />
              <FooterLink to="/help" label="Help & FAQ" />
              <FooterLink to="/contact" label="Contact Us" />
              <FooterLink to="/admin/login" label="Admin Login" />
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-3 text-muted-foreground flex-shrink-0 mt-1" size={18} />
                <span className="text-muted-foreground">
                  123 Thamel Street, Kathmandu, Nepal
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 text-muted-foreground flex-shrink-0" size={18} />
                <span className="text-muted-foreground">+977-1-4123456</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 text-muted-foreground flex-shrink-0" size={18} />
                <span className="text-muted-foreground">info@nepalbus.com</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-2 rounded-md bg-background text-foreground border border-input focus:outline-none focus:border-primary"
              />
              <button 
                type="submit" 
                className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <hr className="border-border my-8" />
        
        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} NepalBus. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, label }: { to: string; label: string }) => (
  <li>
    <Link 
      to={to} 
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      {label}
    </Link>
  </li>
);

export default Footer;

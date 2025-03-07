
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-0">
          {/* Column 1 - About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">NepalBus</h3>
            <p className="text-gray-600 mb-4">
              The most trusted online bus ticket booking platform in Nepal, providing safe and comfortable travel experiences across the country.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<Facebook size={18} />} href="https://facebook.com" />
              <SocialLink icon={<Twitter size={18} />} href="https://twitter.com" />
              <SocialLink icon={<Instagram size={18} />} href="https://instagram.com" />
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink href="/about" label="About Us" />
              <FooterLink href="/routes" label="Popular Routes" />
              <FooterLink href="/terms" label="Terms & Conditions" />
              <FooterLink href="/privacy" label="Privacy Policy" />
              <FooterLink href="/faq" label="FAQs" />
            </ul>
          </div>

          {/* Column 3 - Popular Routes */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Routes</h3>
            <ul className="space-y-2">
              <FooterLink href="/routes/ktm-pkr" label="Kathmandu - Pokhara" />
              <FooterLink href="/routes/ktm-ctwn" label="Kathmandu - Chitwan" />
              <FooterLink href="/routes/ktm-lmb" label="Kathmandu - Lumbini" />
              <FooterLink href="/routes/ktm-brt" label="Kathmandu - Biratnagar" />
              <FooterLink href="/routes/pkr-ktm" label="Pokhara - Kathmandu" />
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-primary mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-600">
                  New Baneshwor, Kathmandu, Nepal
                </span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-primary mr-3 flex-shrink-0" />
                <a href="mailto:info@nepalbus.com" className="text-gray-600 hover:text-primary transition-colors">
                  info@nepalbus.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-primary mr-3 flex-shrink-0" />
                <a href="tel:+9771234567890" className="text-gray-600 hover:text-primary transition-colors">
                  +977 1-234-567-890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Horizontal Line */}
        <div className="h-px bg-gray-200 my-8 mx-4 md:mx-0"></div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm px-4 md:px-0">
          <p>&copy; {new Date().getFullYear()} NepalBus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

type FooterLinkProps = {
  href: string;
  label: string;
};

const FooterLink = ({ href, label }: FooterLinkProps) => (
  <li>
    <Link to={href} className="text-gray-600 hover:text-primary transition-colors">
      {label}
    </Link>
  </li>
);

type SocialLinkProps = {
  icon: React.ReactNode;
  href: string;
};

const SocialLink = ({ icon, href }: SocialLinkProps) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white h-8 w-8 rounded-full flex items-center justify-center shadow-soft text-gray-600 hover:text-primary transition-colors"
  >
    {icon}
  </a>
);

export default Footer;

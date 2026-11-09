import React from 'react';
import { Phone, Instagram, Youtube, Facebook, MapPin, MessageCircle, Heart } from 'lucide-react';

const Footer = () => {
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: 'Book Appointment', href: '#booking' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Location', href: '#location' },
  ];

  const services = [
    'Bridal Makeup',
    'Party Makeup',
    'Nanoplastia',
    'Nail Extensions',
    'Pre-Bridal Package',
  ];

  return (
    <footer className="bg-espresso text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand */}
          <div className="space-y-3">
            <h3 className="font-heading text-2xl font-bold">
              <span className="text-gold">Muskaan</span> Luxury Salon
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Saharanpur's Premier Bridal Couture & Luxury Beauty Destination
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="text-sm text-gray-400 hover:text-gold transition-colors font-body"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold text-white">Our Services</h4>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    onClick={(e) => handleSmoothScroll(e, '#services')}
                    className="text-sm text-gray-400 hover:text-gold transition-colors font-body"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold text-white">Connect With Us</h4>
            <div className="space-y-3">
              {/* Phone */}
              <a
                href="tel:+917500702702"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-gold transition-colors font-body"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                +91 75007 02702
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/917500702702"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-green-400 transition-colors font-body"
              >
                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                Chat on WhatsApp
              </a>

              {/* Social Icons */}
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="https://www.instagram.com/muskaanluxurysalon_official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-pink-400 hover:border-pink-400 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.youtube.com/@MuskaanLuxurySalon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-red-400 hover:border-red-400 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/MuskaanLuxurySalon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-400 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-400 font-body leading-relaxed">
                  2C/2994, Shastri Nagar, Saharanpur, UP 247001
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 mt-8 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm text-gray-400 font-body">
            © 2026 Muskaan Luxury Salon. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 font-body flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> in Saharanpur
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

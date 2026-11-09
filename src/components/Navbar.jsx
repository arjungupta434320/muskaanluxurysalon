import React, { useState, useEffect, useCallback } from 'react';
import {
  Menu,
  X,
  Phone,
  Instagram,
  Youtube,
  Facebook,
  Calendar,
  MapPin,
  ChevronRight,
  MessageCircle,
  Star,
} from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Booking', href: '#booking' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Location', href: '#location' },
];

const socialLinks = [
  {
    icon: Instagram,
    href: 'https://www.instagram.com/muskaanluxurysalon_official/',
    label: 'Instagram',
    handle: '@muskaanluxurysalon_official',
    description: 'Behind-the-scenes bridal looks & transformations',
  },
  {
    icon: Youtube,
    href: 'https://www.youtube.com/@poonambali',
    label: 'YouTube',
    handle: '@poonambali',
    description: 'Tutorials, vlogs & bridal makeover reveals',
  },
  {
    icon: Facebook,
    href: 'https://www.facebook.com/profile.php?id=100084967725423&sk=directory_intro',
    label: 'Facebook',
    handle: 'Muskaan Luxury Salon',
    description: 'Reviews, updates & community stories',
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for navbar shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // IntersectionObserver for active section
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace('#', ''));
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavClick = useCallback(
    (e, href) => {
      e.preventDefault();
      setIsOpen(false);
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    },
    []
  );

  return (
    <>
      {/* Announcement Bar – desktop only */}
      <div className="hidden md:block bg-gradient-to-r from-gold/10 via-gold/15 to-gold/10 border-b border-champagne-border">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-center gap-2 text-xs md:text-sm text-espresso/80 font-body">
          <span>✨ Saharanpur's Premier Bridal Couture — Open 7 Days: 9 AM – 9 PM</span>
          <span className="mx-1 text-champagne-border">|</span>
          <a
            href="tel:+917500702702"
            className="font-semibold text-gold hover:text-gold-hover transition-colors"
          >
            075007 02702
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-champagne-border transition-shadow duration-300 ${
          scrolled ? 'shadow-md' : 'shadow-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            {/* Logo */}
            <a href="#home" className="flex flex-col leading-tight shrink-0">
              <span className="font-heading text-xl md:text-2xl font-bold tracking-tight">
                <span className="text-gold">Muskaan</span>{' '}
                <span className="text-espresso">Luxury Salon</span>
              </span>
            </a>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-3 py-2 text-sm font-body font-medium rounded-lg transition-colors ${
                    activeSection === link.href.replace('#', '')
                      ? 'text-gold'
                      : 'text-espresso/70 hover:text-espresso'
                  }`}
                >
                  {link.label}
                  {activeSection === link.href.replace('#', '') && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-gold rounded-full" />
                  )}
                </a>
              ))}
            </div>

            {/* Desktop right side: socials + CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Social icons */}
              <div className="flex items-center gap-1 mr-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-2 text-taupe hover:text-gold transition-colors rounded-full hover:bg-gold/5"
                  >
                    <social.icon className="w-[18px] h-[18px]" />
                  </a>
                ))}
              </div>

              {/* CTA */}
              <a
                href="#booking"
                onClick={(e) => handleNavClick(e, '#booking')}
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-hover text-white rounded-xl px-5 py-2.5 text-sm font-semibold font-body transition-colors shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-2.5 -mr-2 text-espresso hover:text-gold transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 lg:hidden ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-espresso/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full overflow-y-auto">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-champagne-border">
              <a href="#home" className="flex flex-col leading-tight">
                <span className="font-heading text-lg font-bold">
                  <span className="text-gold">Muskaan</span>{' '}
                  <span className="text-espresso">Luxury Salon</span>
                </span>
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2.5 -mr-2 text-espresso hover:text-gold transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Nav links */}
            <div className="px-5 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-body font-medium transition-colors min-h-[48px] ${
                    activeSection === link.href.replace('#', '')
                      ? 'bg-gold/10 text-gold'
                      : 'text-espresso/80 hover:bg-champagne-blush hover:text-espresso'
                  }`}
                >
                  {link.label}
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </a>
              ))}
            </div>

            {/* Divider */}
            <div className="mx-5 border-t border-champagne-border" />

            {/* Social cards */}
            <div className="px-5 py-4 space-y-2.5">
              <p className="text-xs font-semibold text-taupe uppercase tracking-wider px-1 mb-2">
                Follow Us
              </p>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 p-3.5 rounded-xl border border-champagne-border hover:border-gold/30 hover:bg-gold/5 transition-all min-h-[48px]"
                >
                  <div className="p-2 rounded-lg bg-champagne-blush text-gold shrink-0">
                    <social.icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-espresso font-body">
                      {social.label}
                    </p>
                    <p className="text-xs text-gold font-body">{social.handle}</p>
                    <p className="text-xs text-taupe font-body mt-0.5 leading-relaxed">
                      {social.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Bottom actions */}
            <div className="px-5 py-5 border-t border-champagne-border space-y-3 bg-champagne-blush/30">
              {/* Phone */}
              <a
                href="tel:+917500702702"
                className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl border border-champagne-border bg-white text-espresso font-semibold text-sm font-body hover:border-gold/40 transition-colors min-h-[48px]"
              >
                <Phone className="w-4 h-4 text-gold" />
                Call 075007 02702
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/917500702702"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl border border-green-200 bg-green-50 text-green-700 font-semibold text-sm font-body hover:bg-green-100 transition-colors min-h-[48px]"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>

              {/* Book Now CTA */}
              <a
                href="#booking"
                onClick={(e) => handleNavClick(e, '#booking')}
                className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl bg-gold hover:bg-gold-hover text-white font-semibold text-sm font-body transition-colors shadow-sm min-h-[48px]"
              >
                <Calendar className="w-4 h-4" />
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, Navigation, Copy, Check, ExternalLink, MessageCircle } from 'lucide-react';
import { RevealOnScroll } from '../hooks/useScrollReveal';

const LocationCard = () => {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const checkIfOpen = () => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const ist = new Date(utc + 5.5 * 3600000);
    const hours = ist.getHours();
    const minutes = ist.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    // Open from 9:00 (540) to 21:00 (1260)
    return totalMinutes >= 540 && totalMinutes < 1260;
  };

  useEffect(() => {
    setIsOpen(checkIfOpen());
    const interval = setInterval(() => {
      setIsOpen(checkIfOpen());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyPlusCode = async () => {
    try {
      await navigator.clipboard.writeText('XH22+3J');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="location" className="bg-champagne-blush py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-espresso">
              Visit Our <span className="italic text-gold">Studio</span>
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Info Card */}
          <RevealOnScroll>
            <div className="bg-white rounded-2xl border border-champagne-border p-6 shadow-sm space-y-5">
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <p className="font-medium text-espresso font-body">
                  2C/2994, Shastri Nagar, Saharanpur, Uttar Pradesh 247001
                </p>
              </div>

              {/* Plus Code */}
              <div className="flex items-center gap-3">
                <Navigation className="w-5 h-5 text-gold flex-shrink-0" />
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-taupe font-body">
                    Plus Code: XH22+3J Saharanpur, Uttar Pradesh
                  </span>
                  <button
                    onClick={handleCopyPlusCode}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-gold hover:text-gold-hover transition-colors px-2 py-1 rounded-lg border border-champagne-border hover:bg-champagne-blush"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy Plus Code
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gold flex-shrink-0" />
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm text-espresso font-body font-medium">
                    Monday to Sunday: 9:00 AM – 9:00 PM
                  </span>
                  {/* Live Open/Closed Indicator */}
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                      isOpen
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                      }`}
                    />
                    {isOpen ? 'Open Now' : 'Closed'}
                  </span>
                </div>
              </div>

              {/* Trust Pills */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-full border border-champagne-border bg-champagne-blush text-espresso">
                  Women-Owned 💜
                </span>
                <span className="inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-full border border-champagne-border bg-champagne-blush text-espresso">
                  LGBTQ+ Friendly 🏳️‍🌈
                </span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                <a
                  href="tel:+917500702702"
                  className="text-sm font-medium text-espresso hover:text-gold transition-colors font-body"
                >
                  075007 02702
                </a>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="https://www.google.com/maps/place/Muskaan+Luxury+Salon/@29.9502065,77.5515495,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-hover text-white rounded-xl px-6 py-3 font-semibold text-sm transition-colors min-h-[48px]"
                >
                  <ExternalLink className="w-4 h-4" />
                  Get Directions
                </a>
                <a
                  href="tel:+917500702702"
                  className="inline-flex items-center justify-center gap-2 border border-champagne-border hover:border-gold text-espresso hover:text-gold rounded-xl px-6 py-3 font-semibold text-sm transition-colors min-h-[48px]"
                >
                  <Phone className="w-4 h-4" />
                  Call 075007 02702
                </a>
                <a
                  href="https://wa.me/917500702702"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 py-3 font-semibold text-sm transition-colors min-h-[48px]"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right Column - Embedded Google Map */}
          <RevealOnScroll>
            <div className="rounded-2xl border border-champagne-border overflow-hidden shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456!2d77.5515495!3d29.9502065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390eeb322fef86b7%3A0x655fc8f5dfbabec5!2sMuskaan%20Luxury%20Salon!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Muskaan Luxury Salon Location"
                className="w-full"
              />
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default LocationCard;

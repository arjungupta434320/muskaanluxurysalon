import React from 'react';
import { Phone, MessageCircle, Instagram, Calendar } from 'lucide-react';

const MobileBottomBar = ({ selectedCount = 0 }) => {
  const handleBookNowClick = (e) => {
    e.preventDefault();
    const element = document.querySelector('#booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-champagne-border safe-bottom">
      <div className="grid grid-cols-4">
        {/* Call */}
        <a
          href="tel:+917500702702"
          className="flex flex-col items-center justify-center py-2 min-h-[56px] text-[10px] font-medium text-espresso active:bg-gray-100 transition-colors"
        >
          <Phone className="w-5 h-5 mb-1" />
          Call
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/917500702702"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 min-h-[56px] text-[10px] font-medium text-green-600 active:bg-green-50 transition-colors"
        >
          <MessageCircle className="w-5 h-5 mb-1" />
          WhatsApp
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/muskaanluxurysalon_official/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 min-h-[56px] text-[10px] font-medium text-pink-600 active:bg-pink-50 transition-colors"
        >
          <Instagram className="w-5 h-5 mb-1" />
          Instagram
        </a>

        {/* Book Now */}
        <button
          onClick={handleBookNowClick}
          className="relative flex flex-col items-center justify-center py-2 min-h-[56px] text-[10px] font-medium bg-gold text-white rounded-xl mx-1 active:bg-gold-hover transition-colors"
        >
          <span className="relative">
            <Calendar className="w-5 h-5 mb-1" />
            {selectedCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-mauve text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {selectedCount}
              </span>
            )}
          </span>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default MobileBottomBar;

import React from 'react';
import { Calendar, ChevronRight, Star } from 'lucide-react';
import { RevealOnScroll } from '../hooks/useScrollReveal';
import { useTypingAnimation } from '../hooks/useTypingAnimation';

const Hero = () => {
  const displayText = useTypingAnimation();

  const scrollTo = (e, selector) => {
    e.preventDefault();
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #F5ECE6 0%, #FAF7F2 60%, #FAF7F2 100%)',
      }}
    >
      {/* Decorative radial gold glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(197,155,109,0.12) 0%, rgba(197,155,109,0.04) 40%, transparent 70%)',
        }}
      />

      {/* Subtle decorative dots / accents */}
      <div className="absolute top-16 right-10 w-24 h-24 rounded-full border border-gold/10 pointer-events-none hidden md:block" />
      <div className="absolute bottom-20 left-10 w-16 h-16 rounded-full border border-gold/10 pointer-events-none hidden md:block" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-20 md:py-28 text-center">
        {/* Trust badges */}
        <RevealOnScroll>
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold font-body bg-white border border-champagne-border text-espresso/80 shadow-sm">
              Proudly Women-Owned 💜
            </span>
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold font-body bg-white border border-champagne-border text-espresso/80 shadow-sm">
              LGBTQ+ Friendly 🏳️‍🌈
            </span>
          </div>
        </RevealOnScroll>

        {/* Small label */}
        <RevealOnScroll delay={100}>
          <p className="tracking-[0.2em] text-xs font-semibold text-gold uppercase font-body mb-4 md:mb-5">
            Saharanpur's Premier Bridal Destination
          </p>
        </RevealOnScroll>

        {/* Main heading */}
        <RevealOnScroll delay={200}>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-espresso leading-[1.1] mb-6">
            Crafting Flawless Elegance
            <br />
            for Your{' '}
            <span className="text-gold italic">
              {displayText}
              <span className="typing-cursor" />
            </span>
          </h1>
        </RevealOnScroll>

        {/* Subheading */}
        <RevealOnScroll delay={300}>
          <p className="text-taupe text-base md:text-lg max-w-2xl mx-auto font-body leading-relaxed mb-10">
            Expert HD & Airbrush Bridal Makeup, Nanoplastia Hair Transformations
            & Couture Styling — Trusted by 500+ Brides across Saharanpur
          </p>
        </RevealOnScroll>

        {/* CTA buttons */}
        <RevealOnScroll delay={400}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
            <a
              href="#booking"
              onClick={(e) => scrollTo(e, '#booking')}
              className="inline-flex items-center justify-center gap-2.5 bg-gold hover:bg-gold-hover text-white rounded-xl px-6 py-3.5 font-semibold font-body text-sm md:text-base transition-colors shadow-md hover:shadow-lg w-full sm:w-auto min-h-[48px]"
            >
              <Calendar className="w-5 h-5" />
              Book Your Bridal Consultation
            </a>
            <a
              href="#services"
              onClick={(e) => scrollTo(e, '#services')}
              className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-champagne-blush text-espresso border border-champagne-border rounded-xl px-6 py-3.5 font-semibold font-body text-sm md:text-base transition-colors shadow-sm w-full sm:w-auto min-h-[48px]"
            >
              Explore Services & Pricing
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </RevealOnScroll>

        {/* Rating bar */}
        <RevealOnScroll delay={500}>
          <div className="flex flex-col items-center gap-3">
            {/* Google rating pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-champagne-border shadow-sm">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-gold fill-gold"
                  />
                ))}
                {/* Half star */}
                <div className="relative w-4 h-4">
                  <Star className="absolute inset-0 w-4 h-4 text-gold/30" />
                  <div className="absolute inset-0 overflow-hidden w-[50%]">
                    <Star className="w-4 h-4 text-gold fill-gold" />
                  </div>
                </div>
              </div>
              <span className="text-sm font-semibold text-espresso font-body">
                4.5 on Google
              </span>
            </div>

            {/* Stats line */}
            <p className="text-xs md:text-sm text-taupe font-body">
              4.5★ Rated · 418+ Google Reviews · Open 7 Days
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Hero;

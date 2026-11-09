import React from 'react';
import { Instagram, Youtube, Facebook, ExternalLink, ArrowRight } from 'lucide-react';
import { RevealOnScroll } from '../hooks/useScrollReveal';

const platforms = [
  {
    id: 'instagram',
    Icon: Instagram,
    iconColor: 'text-gold',
    handle: '@muskaanluxurysalon_official',
    description: 'Explore Daily Bridal Reels & Ring Ceremony Lookbooks',
    cta: 'Follow on Instagram',
    href: 'https://www.instagram.com/muskaanluxurysalon_official/',
    btnClass: 'bg-gold hover:bg-gold-hover text-white',
  },
  {
    id: 'youtube',
    Icon: Youtube,
    iconColor: 'text-[#FF0000]',
    handle: '@poonambali',
    description: 'Watch Full Bridal Transformation Vlogs & Makeup Tutorials',
    cta: 'Subscribe on YouTube',
    href: 'https://www.youtube.com/@poonambali',
    btnClass: 'bg-[#FF0000] hover:bg-[#CC0000] text-white',
  },
  {
    id: 'facebook',
    Icon: Facebook,
    iconColor: 'text-[#1877F2]',
    handle: 'Muskaan Luxury Salon',
    description: 'Join Our Saharanpur Beauty Community & Client Albums',
    cta: 'Join on Facebook',
    href: 'https://www.facebook.com/profile.php?id=100084967725423&sk=directory_intro',
    btnClass: 'bg-[#1877F2] hover:bg-[#1565C0] text-white',
  },
];

export default function SocialShowcase() {
  return (
    <section id="gallery" className="py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <RevealOnScroll className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-espresso mb-4">
            Follow Our Real Brides &{' '}
            <em className="text-gold italic">Transformations</em>
          </h2>
          <p className="text-taupe text-base md:text-lg max-w-2xl mx-auto">
            Behind-the-scenes, real bride reveals & daily inspiration
          </p>
        </RevealOnScroll>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {platforms.map((platform, index) => {
            const { Icon } = platform;
            return (
              <RevealOnScroll key={platform.id} delay={index * 120}>
                <div className="bg-white rounded-2xl border border-champagne-border p-6 card-glow text-center flex flex-col items-center h-full">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-full bg-champagne-blush flex items-center justify-center mb-4">
                    <Icon className={`w-8 h-8 ${platform.iconColor}`} />
                  </div>

                  {/* Handle */}
                  <p className="font-semibold text-espresso text-lg mb-2">
                    {platform.handle}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-taupe leading-relaxed mb-6 flex-1">
                    {platform.description}
                  </p>

                  {/* CTA Button */}
                  <a
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all min-h-[48px] ${platform.btnClass}`}
                  >
                    {platform.cta}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}

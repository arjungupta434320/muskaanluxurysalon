import React, { useState, useMemo } from 'react';
import { Search, Clock, Plus, Check, Sparkles } from 'lucide-react';
import { services, categories } from '../data/services';
import { RevealOnScroll } from '../hooks/useScrollReveal';

const formatPrice = (p) => '₹' + p.toLocaleString('en-IN');

export default function ServiceMenu({ selectedServices = [], onToggleService, onScrollToBooking }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesCategory =
        activeCategory === 'All' || service.category === activeCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        service.name.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const badgeColors = {
    Bestseller: 'bg-gold/10 text-gold',
    Premium: 'bg-mauve/10 text-mauve',
    Popular: 'bg-gold/10 text-gold',
    Trending: 'bg-gold/10 text-gold',
    Artisan: 'bg-mauve/10 text-mauve',
    'Best Value': 'bg-gold/10 text-gold',
  };

  return (
    <section id="services" className="py-16 md:py-24 px-4 md:px-6 bg-silk">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-gold" />
              <span className="text-sm font-semibold text-gold tracking-wide uppercase">
                Services
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-espresso mb-4">
              Our <em className="text-gold italic">Signature</em> Services & Price Book
            </h2>
            <p className="text-taupe text-base md:text-lg max-w-2xl mx-auto">
              Handcrafted luxury beauty experiences, transparently priced
            </p>
          </div>
        </RevealOnScroll>

        {/* Category Pills */}
        <RevealOnScroll>
          <div className="mb-6 overflow-x-auto hide-scrollbar -mx-4 px-4">
            <div className="flex gap-2 md:gap-3 w-max">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap rounded-xl px-5 py-2.5 text-sm font-semibold transition-all min-h-[48px] ${
                    activeCategory === category
                      ? 'bg-gold text-white shadow-md'
                      : 'bg-white border border-champagne-border text-espresso hover:border-gold hover:text-gold'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Search Input */}
        <RevealOnScroll>
          <div className="relative mb-8 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-taupe" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 min-h-[48px] rounded-xl border border-champagne-border bg-white text-espresso placeholder:text-taupe/60 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all font-body"
            />
          </div>
        </RevealOnScroll>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.map((service, index) => {
            const isSelected = selectedServices.includes(service.id);
            const badgeColor = badgeColors[service.badge] || 'bg-gold/10 text-gold';

            return (
              <RevealOnScroll key={service.id} delay={index * 80}>
                <div className="bg-white rounded-2xl border border-champagne-border p-5 card-glow relative flex flex-col h-full">
                  {/* Badge */}
                  {service.badge && (
                    <span
                      className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${badgeColor}`}
                    >
                      {service.badge}
                    </span>
                  )}

                  {/* Service Info */}
                  <div className="flex-1">
                    <h3 className="font-heading text-lg font-semibold text-espresso pr-20 mb-2 leading-snug">
                      {service.name}
                    </h3>
                    <p className="text-sm text-taupe mb-4 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Price & Duration Row */}
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                      <span className="text-xl font-bold text-gold font-heading">
                        {formatPrice(service.price)}
                      </span>
                      <div className="flex items-center gap-1.5 text-sm text-taupe">
                        <Clock className="w-4 h-4" />
                        <span>
                          {typeof service.duration === 'number'
                            ? `${service.duration} Mins`
                            : service.duration}
                        </span>
                      </div>
                    </div>

                    {/* Artist */}
                    {service.artist && service.artist !== 'Any' && (
                      <p className="text-xs text-mauve font-medium mb-4">
                        by {service.artist}
                      </p>
                    )}
                  </div>

                  {/* Add Button */}
                  <button
                    onClick={() => onToggleService(service.id)}
                    className={`mt-4 w-full flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 min-h-[48px] text-sm font-semibold transition-all ${
                      isSelected
                        ? 'bg-gold text-white'
                        : 'border border-gold text-gold hover:bg-gold hover:text-white'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-4 h-4" />
                        Added
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Add to Appointment
                      </>
                    )}
                  </button>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-champagne-border mx-auto mb-4" />
            <p className="text-taupe text-lg font-heading">No services found</p>
            <p className="text-taupe/60 text-sm mt-1">
              Try adjusting your search or category filter
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

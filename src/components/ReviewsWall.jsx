import React, { useState } from 'react';
import { Star, Quote, ExternalLink } from 'lucide-react';
import { RevealOnScroll } from '../hooks/useScrollReveal';
import { reviews, reviewTags } from '../data/reviews';

export default function ReviewsWall() {
  const [activeTag, setActiveTag] = useState('All');
  const [expandedCards, setExpandedCards] = useState({});

  const filteredReviews =
    activeTag === 'All'
      ? reviews
      : reviews.filter((r) => r.tags.includes(activeTag));

  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="reviews" className="py-16 md:py-24 px-4 md:px-6 bg-silk">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <RevealOnScroll className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-espresso mb-4">
            What Our <em className="text-gold italic">Brides</em> Say
          </h2>
          <p className="text-taupe text-base md:text-lg max-w-2xl mx-auto">
            Real stories from real brides — 418+ verified Google reviews
          </p>
        </RevealOnScroll>

        {/* Google Badge */}
        <RevealOnScroll className="flex justify-center mb-8" delay={100}>
          <div className="rounded-xl bg-white border border-champagne-border p-3 inline-flex items-center gap-2 shadow-sm">
            {/* Google G */}
            <span className="text-lg font-bold">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
            </span>
            <span className="font-bold text-espresso text-lg">4.5</span>
            <div className="flex items-center gap-0.5">
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
              ))}
              <Star className="w-4 h-4 fill-gold/50 text-gold" />
            </div>
            <span className="text-sm text-taupe font-medium">
              418+ Verified Google Reviews
            </span>
          </div>
        </RevealOnScroll>

        {/* Filter Pills */}
        <RevealOnScroll className="mb-8" delay={150}>
          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {reviewTags.map((tag) => (
              <button
                key={tag.label}
                onClick={() => setActiveTag(tag.label)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all min-h-[48px] flex items-center gap-1 ${
                  activeTag === tag.label
                    ? 'bg-gold text-white shadow-sm'
                    : 'bg-white border border-champagne-border text-espresso hover:border-gold/40'
                }`}
              >
                {tag.label}
                {tag.count !== null && (
                  <span
                    className={`text-xs ${
                      activeTag === tag.label ? 'text-white/80' : 'text-taupe'
                    }`}
                  >
                    ({tag.count})
                  </span>
                )}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReviews.map((review, index) => {
            const isExpanded = expandedCards[review.id];
            const needsTruncate = review.text.length > 150;
            const displayText =
              needsTruncate && !isExpanded
                ? review.text.slice(0, 150) + '...'
                : review.text;

            return (
              <RevealOnScroll key={review.id} delay={index * 80}>
                <div className="bg-white rounded-2xl border border-champagne-border p-5 card-glow h-full flex flex-col">
                  {/* Header: Avatar + Name */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-champagne-blush flex items-center justify-center font-heading font-bold text-gold text-lg shrink-0">
                      {review.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-espresso">
                        {review.name}
                      </p>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 fill-gold text-gold"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quote Icon */}
                  <Quote className="w-5 h-5 text-gold/30 mb-2" />

                  {/* Review Text */}
                  <p className="text-sm text-taupe leading-relaxed flex-1">
                    {displayText}
                    {needsTruncate && (
                      <button
                        onClick={() => toggleExpand(review.id)}
                        className="text-gold font-semibold ml-1 hover:text-gold-hover transition-colors"
                      >
                        {isExpanded ? 'Show less' : 'Read more'}
                      </button>
                    )}
                  </p>

                  {/* Tag Pills */}
                  {review.tags && review.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-champagne-border/50">
                      {review.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gold/10 text-gold text-xs font-medium px-2.5 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* View All on Google */}
        <RevealOnScroll className="text-center mt-10" delay={200}>
          <a
            href="https://www.google.com/search?q=muskaan+luxury+salon+saharanpur+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-hover font-semibold transition-colors"
          >
            View all reviews on Google
            <ExternalLink className="w-4 h-4" />
          </a>
        </RevealOnScroll>
      </div>
    </section>
  );
}

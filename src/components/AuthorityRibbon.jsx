import React from 'react';
import { Star, Clock, Shield, Users } from 'lucide-react';
import { useCountUp } from '../hooks/useCountUp';
import { RevealOnScroll } from '../hooks/useScrollReveal';

const stats = [
  {
    icon: Star,
    end: 418,
    duration: 2400,
    suffix: '+',
    label: 'Verified Google Reviews (4.5★ Rated)',
    animate: true,
  },
  {
    icon: Clock,
    displayValue: '9 AM – 9 PM',
    label: 'Open 7 Days a Week',
    animate: false,
  },
  {
    icon: Shield,
    end: 100,
    duration: 1800,
    suffix: '%',
    label: 'Long-Lasting, Sweat & Tear-Proof Artistry',
    animate: true,
  },
  {
    icon: Users,
    end: 2,
    duration: 1000,
    suffix: '',
    label: 'Master Lead Artists (Muskaan Ma\'am & Swati Ma\'am)',
    animate: true,
  },
];

function AnimatedStat({ stat, index }) {
  const { count, ref, hasStarted } = useCountUp(stat.end, stat.duration || 2000);

  return (
    <RevealOnScroll delay={index * 120}>
      <div
        ref={ref}
        className={`flex flex-col items-center justify-center text-center px-4 py-6 md:py-8 transition-transform duration-500 ${
          hasStarted ? 'scale-100' : 'scale-95'
        } ${
          index < stats.length - 1 ? 'md:border-r md:border-champagne-border' : ''
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-champagne-blush/60 flex items-center justify-center mb-3">
          <stat.icon className="w-6 h-6 text-gold" strokeWidth={1.75} />
        </div>
        <span className="font-heading text-3xl md:text-5xl font-bold text-gold leading-tight tabular-nums tracking-tight">
          {stat.animate ? `${count}${stat.suffix}` : stat.displayValue}
        </span>
        <span className="text-xs md:text-sm text-taupe mt-2 max-w-[200px] leading-snug font-medium">
          {stat.label}
        </span>
      </div>
    </RevealOnScroll>
  );
}

export default function AuthorityRibbon() {
  return (
    <section id="authority" className="bg-white border-y border-champagne-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-0">
          {stats.map((stat, index) => (
            <AnimatedStat key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

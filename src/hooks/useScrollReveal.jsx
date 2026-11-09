import React, { useEffect, useRef } from 'react';

export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              entry.target.classList.add('reveal-visible');
              entry.target.classList.remove('reveal-hidden');
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: options.threshold ?? 0.05, rootMargin: options.rootMargin || '0px 0px -20px 0px' }
    );

    const elements = node.querySelectorAll('.reveal-hidden');
    elements.forEach((el) => observer.observe(el));
    if (node.classList.contains('reveal-hidden')) {
      observer.observe(node);
    }

    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return ref;
}

export function RevealOnScroll({ children, className = '', delay = 0, as: Component = 'div' }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timeoutId = setTimeout(() => {
            requestAnimationFrame(() => {
              if (node) {
                node.classList.add('reveal-visible');
                node.classList.remove('reveal-hidden');
              }
            });
          }, delay);

          observer.unobserve(node);
          return () => clearTimeout(timeoutId);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Component ref={ref} className={`reveal-hidden ${className}`}>
      {children}
    </Component>
  );
}

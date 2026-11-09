import { useState, useEffect, useRef } from 'react';

/**
 * High-precision ease-out quart: starts with gentle momentum, smoothly rolls to final number
 * without sudden stops or visual freezes.
 */
function easeOutQuart(x) {
  return 1 - Math.pow(1 - x, 4);
}

export function useCountUp(end, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -20px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnView, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const numericEnd = typeof end === 'number' ? end : parseFloat(end);
    if (isNaN(numericEnd)) {
      setCount(end);
      return;
    }

    // Adaptive duration for small numbers so they transition naturally
    let effectiveDuration = duration;
    if (numericEnd <= 5) {
      effectiveDuration = Math.min(duration, 900);
    } else if (numericEnd <= 100) {
      effectiveDuration = Math.min(duration, 1700);
    }

    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / effectiveDuration, 1);
      
      const easedProgress = easeOutQuart(progress);
      const currentVal = Math.round(easedProgress * numericEnd);
      
      setCount(currentVal);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setCount(numericEnd);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [hasStarted, end, duration]);

  return { count, ref, hasStarted };
}

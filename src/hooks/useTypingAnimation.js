import { useState, useEffect, useCallback } from 'react';

const phrases = [
  'Dream Wedding Day',
  'Ring Ceremony & Engagement',
  'Grand Reception Night',
  'Nanoplastia Hair Transformations',
  'Bespoke Nail Extensions',
  'Flawless Party Makeovers',
];

export function useTypingAnimation() {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      setDisplayText(currentPhrase.substring(0, displayText.length + 1));
      if (displayText.length + 1 === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), 2000);
        return 150;
      }
      return 80;
    } else {
      setDisplayText(currentPhrase.substring(0, displayText.length - 1));
      if (displayText.length - 1 === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        return 400;
      }
      return 40;
    }
  }, [displayText, phraseIndex, isDeleting]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      tick();
    }, tick());
    return () => clearTimeout(timeout);
  }, [tick]);

  return displayText;
}

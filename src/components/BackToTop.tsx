import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 p-3 bg-neutral-900 text-white hover:bg-neutral-800 transition-all shadow-md hover:shadow-lg rounded-sm cursor-pointer group"
      aria-label="Scroll back to top"
      title="Back to top"
    >
      <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
};

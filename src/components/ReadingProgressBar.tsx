import React, { useEffect, useState } from 'react';

export const ReadingProgressBar: React.FC = () => {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setCompletion(Number((currentProgress / scrollHeight).toFixed(3)) * 100);
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  if (completion <= 0) return null;

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-1 bg-neutral-200 z-50 pointer-events-none"
      aria-hidden="true"
    >
      <div 
        className="h-full bg-gradient-to-r from-neutral-900 via-neutral-800 to-rose-600 transition-all duration-75"
        style={{ width: `${Math.min(completion, 100)}%` }}
      />
    </div>
  );
};

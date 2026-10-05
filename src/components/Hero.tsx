import React from 'react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onReadLatestClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onReadLatestClick
}) => {
  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-neutral-200/80 bg-[#FAFAFA] overflow-hidden">
      {/* Editorial Decorative Grid Lines */}
      <div 
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Masthead Sub-Label */}
          <div className="inline-flex items-center gap-2 mb-6 text-xs uppercase font-mono tracking-widest text-neutral-500">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>2026 Edition · Multi-Surface Ranking Architecture</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900 leading-[1.05] sm:leading-[0.98] mb-6 sm:mb-8">
            THE INSTAGRAM ALGORITHM, DECODED.
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-neutral-600 font-light leading-relaxed max-w-2xl mx-auto mb-10 sm:mb-12">
            Understand how Instagram decides what people see — from Reels and Stories to Explore, engagement and search.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-sm sm:text-base tracking-wide transition-all shadow-sm hover:shadow-md cursor-pointer group"
            >
              <Compass className="w-4 h-4 text-neutral-300 group-hover:rotate-45 transition-transform" />
              <span>Explore the Algorithm</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={onReadLatestClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-300 font-medium text-sm sm:text-base tracking-wide transition-all cursor-pointer"
            >
              <span>Read Latest Articles</span>
            </button>
          </div>

          {/* Editorial Trust Disclaimers */}
          <div className="mt-12 sm:mt-16 pt-8 border-t border-neutral-200/60 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div>
              <p className="font-mono text-xs text-neutral-400 uppercase">Architecture</p>
              <p className="text-sm font-semibold text-neutral-800 mt-1">Multi-Model Pipeline</p>
            </div>
            <div>
              <p className="font-mono text-xs text-neutral-400 uppercase">Primary Driver</p>
              <p className="text-sm font-semibold text-neutral-800 mt-1">DM Shares & Retention</p>
            </div>
            <div>
              <p className="font-mono text-xs text-neutral-400 uppercase">Standard</p>
              <p className="text-sm font-semibold text-neutral-800 mt-1">Official Meta Telemetry</p>
            </div>
            <div>
              <p className="font-mono text-xs text-neutral-400 uppercase">Perspective</p>
              <p className="text-sm font-semibold text-neutral-800 mt-1">Zero Snake-Oil Hype</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

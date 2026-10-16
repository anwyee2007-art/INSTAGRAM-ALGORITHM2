import React, { useState, useEffect } from 'react';
import { ArrowRight, Compass, Award, BookOpen, Maximize2, X, Sparkles } from 'lucide-react';
import algorithmPipelineHero from '../assets/images/home_hero_algorithm_1792115108682.jpg';

interface HeroProps {
  onExploreClick: () => void;
  onNavigateArticles: () => void;
  onNavigateQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onNavigateArticles,
  onNavigateQuiz
}) => {
  const [showLightbox, setShowLightbox] = useState(false);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowLightbox(false);
    };
    if (showLightbox) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showLightbox]);

  return (
    <section className="relative pt-10 pb-14 sm:pt-16 sm:pb-20 border-b border-neutral-200/80 bg-[#FAFAFA] overflow-hidden">
      {/* Subtle Editorial Background Grid */}
      <div 
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Masthead Sub-Label */}
          <div className="inline-flex items-center gap-2 mb-5 text-xs uppercase font-mono tracking-widest text-neutral-500">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>2026 Edition · Independent Ranking Telemetry</span>
          </div>

          {/* Main H1 Headline with Main Keyword */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.08] sm:leading-[1.02] mb-6">
            The Instagram Algorithm, Decoded.
          </h1>

          {/* Subheading Naturally Integrating Main & Related Keywords */}
          <p className="text-base sm:text-xl text-neutral-600 font-light leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10">
            Understand how the <strong>Instagram algorithm</strong> decides what people see. Discover verified <strong>Instagram algorithm tips</strong> for Reels and Stories, and implement proven <strong>Instagram growth strategies</strong> to scale organic reach without paid ads.
          </p>

          {/* Clear, Streamlined Navigation CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12">
            <button
              onClick={onNavigateArticles}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs sm:text-sm uppercase tracking-wider transition-all shadow-sm hover:shadow cursor-pointer group"
            >
              <BookOpen className="w-4 h-4 text-neutral-300 group-hover:scale-110 transition-transform" />
              <span>Browse All Articles</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={onNavigateQuiz}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-300 font-medium text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer group"
            >
              <Award className="w-4 h-4 text-rose-600 group-hover:rotate-12 transition-transform" />
              <span>Take Algorithm Quiz</span>
            </button>

            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-neutral-600 hover:text-neutral-900 font-medium text-xs sm:text-sm tracking-wide transition-colors cursor-pointer"
            >
              <Compass className="w-4 h-4 text-neutral-400" />
              <span>Explore 6 Systems</span>
            </button>
          </div>

          {/* Home Page Editorial Visual Image: Instagram Algorithm Ranking Pipeline */}
          <div className="relative my-8 sm:my-10 text-left">
            <div 
              onClick={() => setShowLightbox(true)}
              className="relative group rounded-xl overflow-hidden border border-neutral-300/80 bg-neutral-950 shadow-xl cursor-zoom-in transition-all duration-300 hover:border-neutral-400 hover:shadow-2xl"
              title="Click to view full architecture diagram"
            >
              <img
                src={algorithmPipelineHero}
                alt="Technical architectural diagram of the Instagram algorithm ranking pipeline illustrating content discovery, recommendation neural networks, user signal analysis, and final distribution across Home Feed, Explore, and Reels"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover max-h-[540px] transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                loading="eager"
              />
              
              {/* Overlay badges */}
              <div className="absolute top-3 left-3 bg-neutral-950/85 backdrop-blur-md text-white px-3 py-1.5 text-[11px] font-mono tracking-wider uppercase border border-neutral-700/60 flex items-center gap-2 rounded shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                <span>System Architecture · Verified 2026 Telemetry</span>
              </div>

              <div className="absolute bottom-3 right-3 bg-neutral-950/85 backdrop-blur-md text-neutral-300 px-3 py-1.5 text-[11px] font-mono border border-neutral-700/60 hidden sm:flex items-center gap-1.5 rounded shadow-sm group-hover:text-white transition-colors">
                <Maximize2 className="w-3.5 h-3.5 text-rose-400" />
                <span>Click to expand full blueprint</span>
              </div>
            </div>

            {/* Editorial Caption */}
            <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-neutral-500 font-mono gap-1">
              <p className="flex items-center gap-1.5">
                <span className="font-semibold text-neutral-700">FIGURE 1.0</span>
                <span className="text-neutral-300">|</span>
                <span>The End-to-End Instagram Algorithm: Ingestion, Neural Scoring, and Multi-Surface Output</span>
              </p>
              <button
                onClick={() => setShowLightbox(true)}
                className="text-rose-600 hover:text-rose-700 underline underline-offset-2 cursor-pointer font-medium"
              >
                Inspect High-Resolution Diagram →
              </button>
            </div>
          </div>

          {/* Quick Technical Summary Strip */}
          <div className="mt-10 sm:mt-12 pt-6 border-t border-neutral-200/70 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div>
              <p className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider">Ranking System</p>
              <p className="text-xs sm:text-sm font-semibold text-neutral-800 mt-0.5">Multi-Model Pipeline</p>
            </div>
            <div>
              <p className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider">Top Reel Metric</p>
              <p className="text-xs sm:text-sm font-semibold text-neutral-800 mt-0.5">Watch Time & DM Shares</p>
            </div>
            <div>
              <p className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider">Standards</p>
              <p className="text-xs sm:text-sm font-semibold text-neutral-800 mt-0.5">Verified Meta Telemetry</p>
            </div>
            <div>
              <p className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider">Assessment</p>
              <p className="text-xs sm:text-sm font-semibold text-neutral-800 mt-0.5">Interactive Knowledge Test</p>
            </div>
          </div>
        </div>
      </div>

      {/* High-Resolution Diagram Lightbox Modal */}
      {showLightbox && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/90 backdrop-blur-md p-4 sm:p-6"
          onClick={() => setShowLightbox(false)}
        >
          <div 
            className="relative max-w-6xl w-full bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl p-2 sm:p-4 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-800 mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-500" />
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-300 font-semibold">
                  Instagram Algorithm Technical Architecture (2026 Pipeline)
                </span>
              </div>
              <button
                onClick={() => setShowLightbox(false)}
                className="text-neutral-400 hover:text-white p-1 rounded-md hover:bg-neutral-800 transition-colors cursor-pointer"
                aria-label="Close high-resolution blueprint"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-auto max-h-[80vh] rounded-lg">
              <img
                src={algorithmPipelineHero}
                alt="High-resolution architecture diagram of the Instagram algorithm ranking pipeline"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain rounded"
              />
            </div>

            <div className="mt-3 px-3 py-2 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-neutral-400 border-t border-neutral-800">
              <p>Diagram illustrates: Ingestion → Neural Embeddings → Retention Modeling → Multi-Surface Delivery</p>
              <button
                onClick={() => setShowLightbox(false)}
                className="mt-2 sm:mt-0 text-white hover:text-rose-400 underline cursor-pointer"
              >
                Close Blueprint [ESC]
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

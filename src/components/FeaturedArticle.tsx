import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Article } from '../types';

interface FeaturedArticleProps {
  article: Article;
  onSelect: (slug: string) => void;
}

export const FeaturedArticle: React.FC<FeaturedArticleProps> = ({
  article,
  onSelect
}) => {
  return (
    <section className="py-12 sm:py-16 border-b border-neutral-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-neutral-900" />
            <h2 className="text-xs uppercase tracking-widest font-mono font-bold text-neutral-900">
              Pillar Analysis · Featured
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            Comprehensive 2026 Breakdown
          </span>
        </div>

        {/* Featured Card Layout */}
        <div 
          onClick={() => onSelect(article.slug)}
          className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center cursor-pointer"
        >
          {/* Large Editorial Image */}
          <div className="lg:col-span-7 overflow-hidden aspect-[16/10] sm:aspect-[16/9] bg-neutral-100 relative">
            <img
              src={article.featuredImage}
              alt={article.imageAlt}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
            <div className="absolute bottom-3 left-3 bg-neutral-900/80 backdrop-blur-sm text-white px-3 py-1 text-[11px] font-mono tracking-wider uppercase">
              Verified Meta Documentation
            </div>
          </div>

          {/* Editorial Content Column */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Zero-pill clean unboxed metadata */}
            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3 tracking-wider uppercase font-mono">
              <span className="text-rose-600 font-bold">{article.category}</span>
              <span aria-hidden="true" className="text-neutral-300">·</span>
              <span>{article.date}</span>
              <span aria-hidden="true" className="text-neutral-300">·</span>
              <span className="lowercase">{article.readTime}</span>
            </div>

            {/* Title */}
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-[1.1] mb-4 group-hover:text-rose-600 transition-colors">
              {article.title}
            </h3>

            {/* Subtitle / Deck */}
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal mb-6">
              {article.description}
            </p>

            {/* Author info */}
            <div className="flex items-center gap-3 mb-8">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-10 h-10 rounded-full object-cover border border-neutral-200 grayscale contrast-125"
              />
              <div>
                <p className="text-sm font-semibold text-neutral-900">{article.author.name}</p>
                <p className="text-xs text-neutral-500">{article.author.role}</p>
              </div>
            </div>

            {/* "Read Article" Button */}
            <div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(article.slug);
                }}
                className="inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-sm tracking-wide transition-all shadow-sm hover:shadow group-hover:bg-neutral-800"
              >
                <span>Read Article</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { ArrowLeft, ChevronRight, ShieldCheck, Compass } from 'lucide-react';
import { CategorySlug, Article } from '../types';
import { CATEGORIES } from '../data/categories';
import { ARTICLES } from '../data/articles';
import { ArticleCard } from './ArticleCard';
import { FeaturedArticle } from './FeaturedArticle';

interface CategoryViewProps {
  categorySlug: CategorySlug;
  onBack: () => void;
  onSelectArticle: (slug: string) => void;
  bookmarkedSlugs?: string[];
  onToggleBookmark?: (e: React.MouseEvent, slug: string) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  categorySlug,
  onBack,
  onSelectArticle,
  bookmarkedSlugs = [],
  onToggleBookmark
}) => {
  const category = CATEGORIES[categorySlug] || CATEGORIES.algorithm;
  
  // Articles in this category
  const categoryArticles = ARTICLES.filter(a => a.categorySlug === categorySlug);
  
  // Choose featured article for category (first one) and remaining ones
  const featured = categoryArticles[0] || ARTICLES[0];
  const remaining = categoryArticles.slice(1);

  return (
    <div className="min-h-screen bg-white">
      {/* Category Hero / Header */}
      <header className="border-b border-neutral-200/80 bg-[#FAFAFA] pt-8 pb-12 sm:pt-14 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs text-neutral-500 mb-6 font-mono">
            <button 
              onClick={onBack}
              className="hover:text-neutral-900 transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
            <span className="text-neutral-900 font-semibold uppercase">
              {category.name}
            </span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3 text-xs uppercase font-mono tracking-widest text-neutral-500">
              <span className="w-2 h-2 rounded-full bg-rose-600" />
              <span>Surface Architecture Guide</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-900 tracking-tight leading-[1.08] mb-4">
              {category.name}
            </h1>

            <p className="text-lg sm:text-xl text-neutral-600 font-light leading-relaxed mb-8">
              {category.tagline}
            </p>

            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-normal bg-white p-5 border border-neutral-200 shadow-xs">
              {category.description}
            </p>
          </div>

          {/* Core Signals Strip */}
          <div className="mt-8 pt-6 border-t border-neutral-200">
            <div className="text-xs uppercase font-mono tracking-wider text-neutral-400 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Core Ranking Signals for this Surface:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {category.coreSignals.map((signal, idx) => (
                <div key={idx} className="p-3 bg-white border border-neutral-200/90 text-xs text-neutral-800 font-medium flex items-start gap-2">
                  <span className="font-mono text-neutral-400">{idx + 1}.</span>
                  <span>{signal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Featured Article for this category */}
      {featured && (
        <FeaturedArticle
          article={featured}
          onSelect={onSelectArticle}
        />
      )}

      {/* Relevant Article Grid */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 pb-4 border-b border-neutral-200 flex items-center justify-between">
          <div>
            <h2 className="text-xs uppercase tracking-widest font-mono font-bold text-neutral-900">
              In-Depth Articles · {category.name}
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              {categoryArticles.length} guides available in this domain
            </p>
          </div>
        </div>

        {remaining.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remaining.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onSelect={onSelectArticle}
                isBookmarked={bookmarkedSlugs.includes(article.slug)}
                onToggleBookmark={onToggleBookmark}
              />
            ))}
          </div>
        ) : (
          <div className="py-8 bg-neutral-50 border border-neutral-200 text-center p-8">
            <p className="text-sm text-neutral-600">
              Additional deep dives are being indexed for {category.name}. Explore the featured master guide above.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

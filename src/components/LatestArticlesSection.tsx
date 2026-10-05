import React, { useState } from 'react';
import { ArticleCard } from './ArticleCard';
import { ARTICLES } from '../data/articles';
import { CategorySlug } from '../types';

interface LatestArticlesSectionProps {
  onSelectArticle: (slug: string) => void;
  bookmarkedSlugs?: string[];
  onToggleBookmark?: (e: React.MouseEvent, slug: string) => void;
}

export const LatestArticlesSection: React.FC<LatestArticlesSectionProps> = ({
  onSelectArticle,
  bookmarkedSlugs = [],
  onToggleBookmark
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'All Articles' },
    { id: 'algorithm', label: 'Algorithm' },
    { id: 'reels', label: 'Reels' },
    { id: 'feed', label: 'Feed' },
    { id: 'stories', label: 'Stories' },
    { id: 'explore', label: 'Explore' },
    { id: 'seo', label: 'SEO' },
    { id: 'growth', label: 'Growth' }
  ];

  const filteredArticles = activeFilter === 'all'
    ? ARTICLES
    : ARTICLES.filter(art => art.categorySlug === activeFilter);

  return (
    <section id="latest-articles" className="py-16 sm:py-24 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-4 bg-neutral-900" />
              <span className="text-xs uppercase tracking-widest font-mono font-bold text-neutral-900">
                Editorial Dispatch
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
              THE LATEST
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600">
              Twelve comprehensive investigations into Meta’s current recommendation algorithms and organic reach.
            </p>
          </div>

          {/* Interactive filter tabs (Buttons allowed by Frontend Design Constitution) */}
          <div className="flex items-center flex-wrap gap-1.5 p-1 bg-neutral-100 rounded-lg self-start md:self-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 12 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onSelect={onSelectArticle}
              isBookmarked={bookmarkedSlugs.includes(article.slug)}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

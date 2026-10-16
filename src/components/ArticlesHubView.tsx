import React, { useState } from 'react';
import { Search, ChevronRight, SlidersHorizontal, BookOpen, Layers } from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { ArticleCard } from './ArticleCard';
import { CategorySlug } from '../types';

interface ArticlesHubViewProps {
  onBack: () => void;
  onSelectArticle: (slug: string) => void;
  bookmarkedSlugs?: string[];
  onToggleBookmark?: (e: React.MouseEvent, slug: string) => void;
}

export const ArticlesHubView: React.FC<ArticlesHubViewProps> = ({
  onBack,
  onSelectArticle,
  bookmarkedSlugs = [],
  onToggleBookmark
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterTabs = [
    { id: 'all', label: 'All Articles' },
    { id: 'algorithm', label: 'Instagram Algorithm' },
    { id: 'reels', label: 'Reels' },
    { id: 'feed', label: 'Feed' },
    { id: 'stories', label: 'Stories' },
    { id: 'explore', label: 'Explore' },
    { id: 'seo', label: 'Instagram SEO' },
    { id: 'growth', label: 'Growth Strategies' }
  ];

  const filteredArticles = ARTICLES.filter(art => {
    const matchesCat = activeCategory === 'all' || art.categorySlug === activeCategory;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesCat;

    const inTitle = art.title.toLowerCase().includes(query);
    const inSubtitle = art.subtitle.toLowerCase().includes(query);
    const inDesc = art.description.toLowerCase().includes(query);
    const inCat = art.category.toLowerCase().includes(query);
    return matchesCat && (inTitle || inSubtitle || inDesc || inCat);
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 pb-20">
      {/* Editorial Header */}
      <header className="bg-white border-b border-neutral-200 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-neutral-500 font-mono mb-4">
            <button 
              onClick={onBack}
              className="hover:text-neutral-900 transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
            <span className="text-neutral-900 font-semibold uppercase">
              All Articles & Research
            </span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3 text-xs uppercase font-mono tracking-widest text-neutral-500">
              <span className="w-2 h-2 rounded-full bg-rose-600" />
              <span>Complete Editorial Knowledge Base</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-4">
              Instagram Algorithm Guides & Analysis
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed mb-6">
              Browse our complete library of investigations into the <strong>Instagram algorithm</strong>. Each guide is packed with verified <strong>Instagram algorithm tips</strong> and actionable <strong>Instagram growth strategies</strong> to help you scale organic reach across Feed, Reels, Stories, and Explore.
            </p>

            {/* Quick Keyword / Topic Search Bar */}
            <div className="relative max-w-lg">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by keyword (e.g., watch time, SEO, DM shares)..."
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-300 focus:border-neutral-900 focus:outline-none text-sm placeholder:text-neutral-400 text-neutral-900 rounded-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-neutral-400 hover:text-neutral-700"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Filter Tabs Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-neutral-200">
          <div className="flex items-center gap-1.5 flex-wrap">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-neutral-900 text-white font-semibold shadow-xs'
                    : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-400 hover:text-neutral-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-neutral-500">
            Showing {filteredArticles.length} of {ARTICLES.length} Guides
          </div>
        </div>

        {/* Article Grid */}
        <div className="pt-8">
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          ) : (
            <div className="py-16 text-center bg-white border border-neutral-200 p-8 rounded-sm">
              <BookOpen className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
              <h3 className="text-base font-semibold text-neutral-800">No articles match your search</h3>
              <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                Try searching for related keywords such as "Reels", "Explore", "watch time", or "SEO".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-4 px-4 py-2 bg-neutral-900 text-white text-xs font-mono uppercase tracking-wider"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

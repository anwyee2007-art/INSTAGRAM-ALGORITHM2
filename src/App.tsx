import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedArticle } from './components/FeaturedArticle';
import { ExploreSystemSection } from './components/ExploreSystemSection';
import { LatestArticlesSection } from './components/LatestArticlesSection';
import { ArticleView } from './components/ArticleView';
import { CategoryView } from './components/CategoryView';
import { SearchModal } from './components/SearchModal';
import { BookmarksModal } from './components/BookmarksModal';
import { AboutModal } from './components/AboutModal';
import { ContactModal } from './components/ContactModal';
import { BackToTop } from './components/BackToTop';
import { Footer } from './components/Footer';
import { ARTICLES } from './data/articles';
import { CATEGORIES } from './data/categories';
import { CategorySlug, ViewState } from './types';
import { ArrowRight, Compass, Sparkles, Layers, BookOpen } from 'lucide-react';

export default function App() {
  const [viewState, setViewState] = useState<ViewState>({ type: 'home' });
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  
  // Bookmarks persistence in localStorage
  const [bookmarkedSlugs, setBookmarkedSlugs] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('the_algorithm_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleToggleBookmark = (slug: string) => {
    setBookmarkedSlugs(prev => {
      const updated = prev.includes(slug)
        ? prev.filter(s => s !== slug)
        : [...prev, slug];
      try {
        localStorage.setItem('the_algorithm_bookmarks', JSON.stringify(updated));
      } catch {
        // ignore storage errors
      }
      return updated;
    });
  };

  const handleToggleBookmarkEvent = (e: React.MouseEvent, slug: string) => {
    e.stopPropagation();
    handleToggleBookmark(slug);
  };

  const handleClearBookmarks = () => {
    setBookmarkedSlugs([]);
    try {
      localStorage.removeItem('the_algorithm_bookmarks');
    } catch {}
  };

  // Sync route state with browser URL path and popstate
  const navigateTo = (newView: ViewState, pushHistory = true) => {
    setViewState(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pushHistory) {
      let path = '/';
      if (newView.type === 'category') {
        path = `/${newView.categorySlug}`;
      } else if (newView.type === 'article') {
        path = `/article/${newView.slug}`;
      }
      if (window.location.pathname !== path) {
        window.history.pushState({ view: newView }, '', path);
      }
    }
  };

  // Parse path on initial mount
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        setViewState(event.state.view);
      } else {
        parseCurrentPath();
      }
    };

    const parseCurrentPath = () => {
      const path = window.location.pathname.replace(/^\/+/g, '');
      if (!path) {
        setViewState({ type: 'home' });
        return;
      }

      if (path.startsWith('article/')) {
        const slug = path.replace('article/', '');
        const exists = ARTICLES.find(a => a.slug === slug);
        if (exists) {
          setViewState({ type: 'article', slug });
          return;
        }
      }

      const validCategories: CategorySlug[] = ['algorithm', 'reels', 'feed', 'stories', 'explore', 'seo', 'growth'];
      if (validCategories.includes(path as CategorySlug)) {
        setViewState({ type: 'category', categorySlug: path as CategorySlug });
        return;
      }

      // Default home
      setViewState({ type: 'home' });
    };

    parseCurrentPath();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update document title dynamically
  useEffect(() => {
    if (viewState.type === 'article') {
      const art = ARTICLES.find(a => a.slug === viewState.slug);
      if (art) {
        document.title = `${art.title} | THE ALGORITHM`;
        return;
      }
    } else if (viewState.type === 'category') {
      const cat = CATEGORIES[viewState.categorySlug];
      if (cat) {
        document.title = `${cat.name} Algorithm & Ranking | THE ALGORITHM`;
        return;
      }
    }
    document.title = 'THE ALGORITHM | Understanding the System Behind Your Reach';
  }, [viewState]);

  // Pillar article
  const pillarArticle = ARTICLES.find(a => a.slug === 'how-the-instagram-algorithm-works-in-2026') || ARTICLES[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Sticky Editorial Navbar */}
      <Navbar
        currentCategory={viewState.type === 'category' ? viewState.categorySlug : null}
        isHome={viewState.type === 'home'}
        onNavigateHome={() => navigateTo({ type: 'home' })}
        onNavigateCategory={(slug) => navigateTo({ type: 'category', categorySlug: slug })}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBookmarks={() => setBookmarksOpen(true)}
        bookmarkCount={bookmarkedSlugs.length}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {viewState.type === 'home' && (
          <div>
            {/* 1. Hero Section */}
            <Hero
              onExploreClick={() => {
                const element = document.getElementById('explore-system');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigateTo({ type: 'category', categorySlug: 'algorithm' });
                }
              }}
              onReadLatestClick={() => {
                const element = document.getElementById('latest-articles');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />

            {/* 2. Featured Pillar Article Section */}
            <FeaturedArticle
              article={pillarArticle}
              onSelect={(slug) => navigateTo({ type: 'article', slug })}
            />

            {/* 3. Explore the System: 6 Category Cards */}
            <div id="explore-system">
              <ExploreSystemSection
                onSelectCategory={(slug) => navigateTo({ type: 'category', categorySlug: slug })}
              />
            </div>

            {/* 4. Content Architecture Cluster Explainer */}
            <section className="py-12 bg-neutral-900 text-white border-b border-neutral-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-2">
                      Content Cluster Strategy
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                      The Pillar & Cluster System
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                      Our curriculum centers on one master pillar article supported by specialized technical clusters. Explore how individual surface signals converge into overall account reach.
                    </p>
                  </div>
                  <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
                    <div 
                      onClick={() => navigateTo({ type: 'category', categorySlug: 'reels' })}
                      className="p-3.5 bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/80 cursor-pointer transition-all group"
                    >
                      <span className="text-[10px] font-mono text-rose-400 uppercase font-bold block mb-1">Reels Cluster</span>
                      <p className="text-xs text-neutral-300 font-medium group-hover:text-white">Watch time → Retention → Virality</p>
                    </div>
                    <div 
                      onClick={() => navigateTo({ type: 'category', categorySlug: 'stories' })}
                      className="p-3.5 bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/80 cursor-pointer transition-all group"
                    >
                      <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block mb-1">Stories Cluster</span>
                      <p className="text-xs text-neutral-300 font-medium group-hover:text-white">Ranking → DM Signals → Views</p>
                    </div>
                    <div 
                      onClick={() => navigateTo({ type: 'category', categorySlug: 'explore' })}
                      className="p-3.5 bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/80 cursor-pointer transition-all group"
                    >
                      <span className="text-[10px] font-mono text-sky-400 uppercase font-bold block mb-1">Explore Cluster</span>
                      <p className="text-xs text-neutral-300 font-medium group-hover:text-white">Embeddings → Taste Models → Reach</p>
                    </div>
                    <div 
                      onClick={() => navigateTo({ type: 'category', categorySlug: 'seo' })}
                      className="p-3.5 bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/80 cursor-pointer transition-all group"
                    >
                      <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block mb-1">SEO Cluster</span>
                      <p className="text-xs text-neutral-300 font-medium group-hover:text-white">Keywords → Profile Tags → Search</p>
                    </div>
                    <div 
                      onClick={() => navigateTo({ type: 'category', categorySlug: 'growth' })}
                      className="p-3.5 bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/80 cursor-pointer transition-all group sm:col-span-2"
                    >
                      <span className="text-[10px] font-mono text-purple-400 uppercase font-bold block mb-1">Growth Cluster</span>
                      <p className="text-xs text-neutral-300 font-medium group-hover:text-white">Engagement Friction → Saves/Shares → Distribution Multipliers</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. The Latest: 12 Articles Grid */}
            <LatestArticlesSection
              onSelectArticle={(slug) => navigateTo({ type: 'article', slug })}
              bookmarkedSlugs={bookmarkedSlugs}
              onToggleBookmark={handleToggleBookmarkEvent}
            />
          </div>
        )}

        {viewState.type === 'article' && (
          (() => {
            const article = ARTICLES.find(a => a.slug === viewState.slug);
            if (!article) {
              return (
                <div className="max-w-2xl mx-auto py-24 px-4 text-center">
                  <h2 className="font-serif text-3xl font-bold mb-4">Article Not Found</h2>
                  <p className="text-neutral-600 mb-8">The requested guide could not be located in our index.</p>
                  <button
                    onClick={() => navigateTo({ type: 'home' })}
                    className="px-6 py-3 bg-neutral-900 text-white text-xs uppercase tracking-wider font-medium"
                  >
                    Return to Master Index
                  </button>
                </div>
              );
            }
            return (
              <ArticleView
                article={article}
                onBack={() => navigateTo({ type: 'home' })}
                onSelectArticle={(slug) => navigateTo({ type: 'article', slug })}
                onSelectCategory={(slug) => navigateTo({ type: 'category', categorySlug: slug })}
                isBookmarked={bookmarkedSlugs.includes(article.slug)}
                onToggleBookmark={handleToggleBookmark}
              />
            );
          })()
        )}

        {viewState.type === 'category' && (
          <CategoryView
            categorySlug={viewState.categorySlug}
            onBack={() => navigateTo({ type: 'home' })}
            onSelectArticle={(slug) => navigateTo({ type: 'article', slug })}
            bookmarkedSlugs={bookmarkedSlugs}
            onToggleBookmark={handleToggleBookmarkEvent}
          />
        )}
      </main>

      {/* Editorial Footer */}
      <Footer
        onNavigateHome={() => navigateTo({ type: 'home' })}
        onNavigateCategory={(slug) => navigateTo({ type: 'category', categorySlug: slug })}
        onOpenAbout={() => setAboutOpen(true)}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Floating Back to Top */}
      <BackToTop />

      {/* Modals & Overlays */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectArticle={(slug) => navigateTo({ type: 'article', slug })}
      />

      <BookmarksModal
        isOpen={bookmarksOpen}
        onClose={() => setBookmarksOpen(false)}
        bookmarkedSlugs={bookmarkedSlugs}
        onSelectArticle={(slug) => navigateTo({ type: 'article', slug })}
        onRemoveBookmark={handleToggleBookmark}
        onClearAll={handleClearBookmarks}
      />

      <AboutModal
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
      />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}

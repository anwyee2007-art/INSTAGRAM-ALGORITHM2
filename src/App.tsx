import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedArticle } from './components/FeaturedArticle';
import { ExploreSystemSection } from './components/ExploreSystemSection';
import { LatestArticlesSection } from './components/LatestArticlesSection';
import { ArticleView } from './components/ArticleView';
import { CategoryView } from './components/CategoryView';
import { ArticlesHubView } from './components/ArticlesHubView';
import { QuestionnaireView } from './components/QuestionnaireView';
import { SearchModal } from './components/SearchModal';
import { BookmarksModal } from './components/BookmarksModal';
import { AboutModal } from './components/AboutModal';
import { ContactModal } from './components/ContactModal';
import { BackToTop } from './components/BackToTop';
import { Footer } from './components/Footer';
import { ARTICLES } from './data/articles';
import { CATEGORIES } from './data/categories';
import { CategorySlug, ViewState } from './types';
import { ArrowRight, Compass, Sparkles, Layers, BookOpen, Award, CheckCircle2, HelpCircle } from 'lucide-react';

const CANONICAL_DOMAIN = 'https://instagramhacks.vercel.app';

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
      } catch {}
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

  // Helper to sync meta tags and canonical URL for SEO & AEO
  const updateSEOMetadata = (title: string, description: string, path: string, schemaGraph?: object[]) => {
    document.title = title;
    const fullCanonical = `${CANONICAL_DOMAIN}${path}`;
    
    // Update or create meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update or create canonical link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', fullCanonical);

    // Update OpenGraph url & title
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', fullCanonical);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // Update Schema.org JSON-LD
    let script = document.getElementById('seo-structured-data');
    if (!script) {
      script = document.createElement('script');
      script.id = 'seo-structured-data';
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }

    const defaultGraph = [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "THE ALGORITHM",
        "url": CANONICAL_DOMAIN,
        "description": "Educational resource explaining the Instagram algorithm, verified Instagram algorithm tips, and sustainable Instagram growth strategies.",
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${CANONICAL_DOMAIN}/articles?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      }
    ];

    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": schemaGraph || defaultGraph
    });
  };

  // Sync route state with browser URL path and popstate
  const navigateTo = (newView: ViewState, pushHistory = true) => {
    setViewState(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pushHistory) {
      let path = '/';
      if (newView.type === 'articles') {
        path = '/articles';
      } else if (newView.type === 'quiz') {
        path = '/quiz';
      } else if (newView.type === 'category') {
        path = `/${newView.categorySlug}`;
      } else if (newView.type === 'article') {
        path = `/${newView.slug}`;
      }
      if (window.location.pathname !== path) {
        window.history.pushState({ view: newView }, '', path);
      }
    }
  };

  // Parse path on initial mount & back/forward
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        setViewState(event.state.view);
      } else {
        parseCurrentPath();
      }
    };

    const parseCurrentPath = () => {
      const rawPath = window.location.pathname.replace(/^\/+/g, '').replace(/\/+$/g, '');
      if (!rawPath) {
        setViewState({ type: 'home' });
        return;
      }

      // 1. Articles Hub route
      if (rawPath === 'articles') {
        setViewState({ type: 'articles' });
        return;
      }

      // 2. Quiz / Questionnaire routes
      if (rawPath === 'quiz' || rawPath === 'questionnaires' || rawPath === 'questionnaire' || rawPath === 'assessment') {
        setViewState({ type: 'quiz' });
        return;
      }

      // 3. Optional prefixes
      let candidateSlug = rawPath;
      if (candidateSlug.startsWith('article/')) {
        candidateSlug = candidateSlug.replace('article/', '');
      } else if (candidateSlug.startsWith('read/')) {
        candidateSlug = candidateSlug.replace('read/', '');
      } else if (candidateSlug.startsWith('p/')) {
        candidateSlug = candidateSlug.replace('p/', '');
      }

      // Match short article slug or legacy slug
      const matchedArticle = ARTICLES.find(a => 
        a.slug === candidateSlug || 
        a.id === candidateSlug || 
        a.legacySlugs?.includes(candidateSlug)
      );

      if (matchedArticle) {
        setViewState({ type: 'article', slug: matchedArticle.slug });
        const cleanPath = `/${matchedArticle.slug}`;
        if (window.location.pathname !== cleanPath) {
          window.history.replaceState({ view: { type: 'article', slug: matchedArticle.slug } }, '', cleanPath);
        }
        return;
      }

      // Match dedicated category surface
      const validCategories: CategorySlug[] = ['algorithm', 'reels', 'feed', 'stories', 'explore', 'seo', 'growth'];
      if (validCategories.includes(candidateSlug as CategorySlug)) {
        setViewState({ type: 'category', categorySlug: candidateSlug as CategorySlug });
        return;
      }

      // Fallback: Home
      setViewState({ type: 'home' });
    };

    parseCurrentPath();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update document title & metadata dynamically
  useEffect(() => {
    if (viewState.type === 'articles') {
      updateSEOMetadata(
        'Instagram Algorithm Guides & Tips | THE ALGORITHM',
        'Explore our central library of investigations on the Instagram algorithm, verified Instagram algorithm tips, and compounding Instagram growth strategies.',
        '/articles',
        [
          {
            "@type": "CollectionPage",
            "name": "Instagram Algorithm Articles & Research",
            "description": "Complete directory of guides covering the Instagram algorithm, ranking signals, and growth strategies.",
            "url": `${CANONICAL_DOMAIN}/articles`
          }
        ]
      );
      return;
    }

    if (viewState.type === 'quiz') {
      updateSEOMetadata(
        'Instagram Algorithm Quiz: Test Your Knowledge | THE ALGORITHM',
        'Take our 10-question assessment on the Instagram algorithm. Discover practical Instagram algorithm tips and test your grasp of Instagram growth strategies.',
        '/quiz',
        [
          {
            "@type": "Quiz",
            "name": "Instagram Algorithm Knowledge Assessment",
            "description": "Evaluate your understanding of Instagram ranking systems, watch time, and growth strategies.",
            "url": `${CANONICAL_DOMAIN}/quiz`
          }
        ]
      );
      return;
    }

    if (viewState.type === 'article') {
      const art = ARTICLES.find(a => a.slug === viewState.slug);
      if (art) {
        const schemaGraph: object[] = [
          {
            "@type": "Article",
            "headline": art.title,
            "description": art.description,
            "image": art.featuredImage,
            "author": {
              "@type": "Person",
              "name": art.author.name,
              "jobTitle": art.author.role
            },
            "publisher": {
              "@type": "Organization",
              "name": "THE ALGORITHM",
              "url": CANONICAL_DOMAIN
            },
            "datePublished": art.isoDate,
            "dateModified": "2026-10-15",
            "mainEntityOfPage": `${CANONICAL_DOMAIN}/${art.slug}`
          },
          {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": CANONICAL_DOMAIN },
              { "@type": "ListItem", "position": 2, "name": "Articles", "item": `${CANONICAL_DOMAIN}/articles` },
              { "@type": "ListItem", "position": 3, "name": art.title, "item": `${CANONICAL_DOMAIN}/${art.slug}` }
            ]
          }
        ];

        if (art.faqs && art.faqs.length > 0) {
          schemaGraph.push({
            "@type": "FAQPage",
            "mainEntity": art.faqs.map(f => ({
              "@type": "Question",
              "name": f.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
              }
            }))
          });
        }

        updateSEOMetadata(
          `${art.title} | THE ALGORITHM`,
          art.description,
          `/${art.slug}`,
          schemaGraph
        );
        return;
      }
    }

    if (viewState.type === 'category') {
      const cat = CATEGORIES[viewState.categorySlug];
      if (cat) {
        updateSEOMetadata(
          `Instagram Algorithm: ${cat.name} Ranking Tips | THE ALGORITHM`,
          `Learn how the Instagram algorithm powers ${cat.name}. Master verified Instagram algorithm tips and high-retention Instagram growth strategies.`,
          `/${cat.id}`,
          [
            {
              "@type": "CollectionPage",
              "name": `${cat.name} Instagram Algorithm Ranking`,
              "description": cat.description,
              "url": `${CANONICAL_DOMAIN}/${cat.id}`
            }
          ]
        );
        return;
      }
    }

    // Default Home metadata
    updateSEOMetadata(
      'Instagram Algorithm Decoded: Tips & Growth Strategies | THE ALGORITHM',
      'Master the Instagram algorithm with verified Instagram algorithm tips and sustainable Instagram growth strategies across Feed, Reels, Stories, and Explore.',
      '/'
    );
  }, [viewState]);

  // Pillar article
  const pillarArticle = ARTICLES.find(a => a.slug === 'algorithm-2026') || ARTICLES[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Sticky Editorial Navbar */}
      <Navbar
        currentCategory={viewState.type === 'category' ? viewState.categorySlug : null}
        isHome={viewState.type === 'home'}
        isArticles={viewState.type === 'articles'}
        isQuiz={viewState.type === 'quiz'}
        onNavigateHome={() => navigateTo({ type: 'home' })}
        onNavigateArticles={() => navigateTo({ type: 'articles' })}
        onNavigateQuiz={() => navigateTo({ type: 'quiz' })}
        onNavigateCategory={(slug) => navigateTo({ type: 'category', categorySlug: slug })}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBookmarks={() => setBookmarksOpen(true)}
        bookmarkCount={bookmarkedSlugs.length}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {viewState.type === 'home' && (
          <div>
            {/* 1. Hero Section with concise intro and direct actions */}
            <Hero
              onExploreClick={() => {
                const element = document.getElementById('explore-system');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigateTo({ type: 'category', categorySlug: 'algorithm' });
                }
              }}
              onNavigateArticles={() => navigateTo({ type: 'articles' })}
              onNavigateQuiz={() => navigateTo({ type: 'quiz' })}
            />

            {/* 2. Concise AEO Introduction to the Instagram Algorithm */}
            <section className="py-12 bg-white border-b border-neutral-200">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-rose-600" />
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold">
                    Direct Answer & Overview
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">
                  What is the Instagram algorithm and how does it work?
                </h2>
                <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-normal mb-4">
                  The <strong>Instagram algorithm</strong> is a collection of machine learning rankers that determine the order of content across Feed, Stories, Explore, Reels, and Search based on user interest, relationship history, and engagement velocity.
                </p>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
                  To achieve sustainable reach, creators must apply verified <strong>Instagram algorithm tips</strong>—such as optimizing for Direct Message shares and loop completion—while building multi-format <strong>Instagram growth strategies</strong> tailored to each tab’s user intent.
                </p>
              </div>
            </section>

            {/* 3. Featured Master Pillar Guide */}
            <FeaturedArticle
              article={pillarArticle}
              onSelect={(slug) => navigateTo({ type: 'article', slug })}
            />

            {/* 4. Interactive Quiz Assessment Promo Banner */}
            <section className="py-12 bg-neutral-900 text-white border-b border-neutral-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-widest text-rose-400 font-bold">
                      <Award className="w-4 h-4" />
                      <span>Interactive Assessment</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                      Test Your Instagram Algorithm Knowledge
                    </h3>
                    <p className="text-sm text-neutral-400 font-light max-w-xl leading-relaxed">
                      Evaluate your understanding of ranking signals, watch time math, and <strong>Instagram algorithm tips</strong> with our 10-question interactive assessment.
                    </p>
                  </div>
                  <button
                    onClick={() => navigateTo({ type: 'quiz' })}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-neutral-900 hover:bg-neutral-100 font-medium text-xs uppercase tracking-wider transition-colors cursor-pointer shrink-0"
                  >
                    <span>Start 10-Question Quiz</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* 5. Explore the System: 6 Surfaces */}
            <div id="explore-system">
              <ExploreSystemSection
                onSelectCategory={(slug) => navigateTo({ type: 'category', categorySlug: slug })}
              />
            </div>

            {/* 6. The Latest Guides Preview with direct link to /articles */}
            <LatestArticlesSection
              onSelectArticle={(slug) => navigateTo({ type: 'article', slug })}
              bookmarkedSlugs={bookmarkedSlugs}
              onToggleBookmark={handleToggleBookmarkEvent}
            />
          </div>
        )}

        {viewState.type === 'articles' && (
          <ArticlesHubView
            onBack={() => navigateTo({ type: 'home' })}
            onSelectArticle={(slug) => navigateTo({ type: 'article', slug })}
            bookmarkedSlugs={bookmarkedSlugs}
            onToggleBookmark={handleToggleBookmarkEvent}
          />
        )}

        {viewState.type === 'quiz' && (
          <QuestionnaireView
            onBack={() => navigateTo({ type: 'home' })}
            onSelectArticle={(slug) => navigateTo({ type: 'article', slug })}
          />
        )}

        {viewState.type === 'article' && (
          (() => {
            const article = ARTICLES.find(a => a.slug === viewState.slug);
            if (!article) {
              return (
                <div className="max-w-2xl mx-auto py-24 px-4 text-center">
                  <h2 className="font-serif text-3xl font-bold mb-4">Guide Not Found</h2>
                  <p className="text-neutral-600 mb-8">The requested Instagram algorithm guide could not be located in our index.</p>
                  <button
                    onClick={() => navigateTo({ type: 'articles' })}
                    className="px-6 py-3 bg-neutral-900 text-white text-xs uppercase tracking-wider font-medium cursor-pointer"
                  >
                    Browse All Articles
                  </button>
                </div>
              );
            }
            return (
              <ArticleView
                article={article}
                onBack={() => navigateTo({ type: 'home' })}
                onNavigateArticles={() => navigateTo({ type: 'articles' })}
                onNavigateQuiz={() => navigateTo({ type: 'quiz' })}
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
            onNavigateArticles={() => navigateTo({ type: 'articles' })}
            onSelectArticle={(slug) => navigateTo({ type: 'article', slug })}
            bookmarkedSlugs={bookmarkedSlugs}
            onToggleBookmark={handleToggleBookmarkEvent}
          />
        )}
      </main>

      {/* Editorial Footer */}
      <Footer
        onNavigateHome={() => navigateTo({ type: 'home' })}
        onNavigateArticles={() => navigateTo({ type: 'articles' })}
        onNavigateQuiz={() => navigateTo({ type: 'quiz' })}
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

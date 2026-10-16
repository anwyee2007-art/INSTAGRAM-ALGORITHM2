import React, { useState } from 'react';
import { Search, Menu, X, Bookmark, BookOpen, Award } from 'lucide-react';
import { CategorySlug } from '../types';

interface NavbarProps {
  currentCategory?: CategorySlug | null;
  isHome: boolean;
  isArticles: boolean;
  isQuiz: boolean;
  onNavigateHome: () => void;
  onNavigateArticles: () => void;
  onNavigateQuiz: () => void;
  onNavigateCategory: (slug: CategorySlug) => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  bookmarkCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCategory,
  isHome,
  isArticles,
  isQuiz,
  onNavigateHome,
  onNavigateArticles,
  onNavigateQuiz,
  onNavigateCategory,
  onOpenSearch,
  onOpenBookmarks,
  bookmarkCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainNavItems = [
    { label: 'Home', action: onNavigateHome, isActive: isHome },
    { label: 'Articles', action: onNavigateArticles, isActive: isArticles },
    { label: 'Quiz', action: onNavigateQuiz, isActive: isQuiz, icon: true },
    { label: 'Algorithm', action: () => onNavigateCategory('algorithm'), isActive: currentCategory === 'algorithm' },
    { label: 'Reels', action: () => onNavigateCategory('reels'), isActive: currentCategory === 'reels' },
    { label: 'Stories', action: () => onNavigateCategory('stories'), isActive: currentCategory === 'stories' },
    { label: 'Explore', action: () => onNavigateCategory('explore'), isActive: currentCategory === 'explore' },
    { label: 'SEO', action: () => onNavigateCategory('seo'), isActive: currentCategory === 'seo' },
    { label: 'Growth', action: () => onNavigateCategory('growth'), isActive: currentCategory === 'growth' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      {/* Top Editorial Ticker Bar */}
      <div className="hidden md:flex items-center justify-between px-6 py-1.5 bg-[#171717] text-white text-[11px] font-mono tracking-wider">
        <div className="flex items-center gap-3">
          <span className="uppercase text-rose-400 font-bold">THE ALGORITHM</span>
          <span>·</span>
          <span className="text-neutral-300">Understanding the Instagram algorithm and ranking systems</span>
        </div>
        <div className="flex items-center gap-4 text-neutral-400">
          <span>Instagram Algorithm Tips & Growth Strategies</span>
          <span>·</span>
          <span>Updated October 2026</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo / Brand Name */}
          <div className="flex items-center gap-6">
            <button
              onClick={onNavigateHome}
              className="text-left group cursor-pointer focus:outline-none"
              aria-label="The Algorithm Home"
            >
              <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tighter text-neutral-900 group-hover:text-neutral-700 transition-colors block leading-none">
                THE ALGORITHM
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 hidden sm:block mt-1">
                Engineering & Discovery Review
              </span>
            </button>
          </div>

          {/* Desktop Nav Links - Zero-Pill Text Links with subtle hover underlines */}
          <nav aria-label="Primary navigation" className="hidden lg:flex items-center space-x-5 xl:space-x-6 text-xs uppercase font-medium tracking-wider text-neutral-700">
            {mainNavItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  item.action();
                  setMobileMenuOpen(false);
                }}
                className={`py-1 transition-colors cursor-pointer relative hover:text-neutral-900 flex items-center gap-1 ${
                  item.isActive ? 'text-neutral-950 font-bold' : 'text-neutral-600'
                }`}
              >
                {item.icon && <Award className="w-3 h-3 text-rose-600" />}
                <span>{item.label}</span>
                {item.isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-900" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 text-xs font-mono uppercase tracking-wider text-neutral-600 hover:text-neutral-900 border border-neutral-200 hover:border-neutral-400 bg-neutral-50/50 transition-colors cursor-pointer"
              title="Search articles (⌘K)"
              aria-label="Open search dialog"
            >
              <Search className="w-4 h-4 text-neutral-500" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[10px] bg-white border border-neutral-300 text-neutral-500 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Saved Bookmarks List */}
            <button
              onClick={onOpenBookmarks}
              className="p-2 sm:px-3 sm:py-2 flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-600 hover:text-neutral-900 border border-neutral-200 hover:border-neutral-400 bg-neutral-50/50 transition-colors cursor-pointer"
              title="Saved reading list"
              aria-label="Open saved reading list"
            >
              <Bookmark className={`w-4 h-4 ${bookmarkCount > 0 ? 'fill-neutral-900 text-neutral-900' : 'text-neutral-500'}`} />
              <span className="hidden sm:inline">Saved</span>
              {bookmarkCount > 0 && (
                <span className="ml-0.5 text-[11px] font-bold text-neutral-900">
                  ({bookmarkCount})
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-700 hover:text-neutral-900 border border-neutral-200 transition-colors"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown / Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white px-4 pt-4 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="text-[11px] font-mono uppercase text-neutral-400 tracking-wider mb-2 px-3">
            Navigation
          </div>
          {mainNavItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                item.action();
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-3 text-sm tracking-wide font-medium transition-colors flex items-center justify-between ${
                item.isActive 
                  ? 'bg-neutral-100 text-neutral-950 font-bold border-l-2 border-neutral-900 pl-3' 
                  : 'text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-center gap-2">
                {item.icon && <Award className="w-4 h-4 text-rose-600" />}
                <span>{item.label}</span>
              </div>
              {item.isActive && <span className="text-xs font-mono text-neutral-400">Current</span>}
            </button>
          ))}

          <div className="pt-4 border-t border-neutral-100 px-3 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full py-2.5 px-3 bg-neutral-100 text-neutral-900 text-xs font-mono uppercase flex items-center justify-center gap-2"
              aria-label="Search all 12 guides"
            >
              <Search className="w-4 h-4" />
              <span>Search All 12 Guides</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

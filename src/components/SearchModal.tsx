import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, FileText } from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { Article } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Handled externally or triggers search
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      setResults([]);
      return;
    }

    const filtered = ARTICLES.filter(article => {
      const inTitle = article.title.toLowerCase().includes(trimmed);
      const inSubtitle = article.subtitle.toLowerCase().includes(trimmed);
      const inCategory = article.category.toLowerCase().includes(trimmed);
      const inDescription = article.description.toLowerCase().includes(trimmed);
      const inSections = article.sections.some(sec => 
        sec.title.toLowerCase().includes(trimmed) || 
        sec.content.toLowerCase().includes(trimmed)
      );
      return inTitle || inSubtitle || inCategory || inDescription || inSections;
    });

    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-neutral-900/60 backdrop-blur-sm transition-opacity">
      <div 
        className="relative w-full max-w-2xl bg-white border border-neutral-200 shadow-2xl overflow-hidden rounded-xl animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-neutral-200">
          <Search className="w-5 h-5 text-neutral-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Instagram algorithms, signals, SEO, Reels, watch time..."
            className="w-full text-base sm:text-lg text-neutral-900 placeholder:text-neutral-400 bg-transparent focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-neutral-700 mr-2"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs text-neutral-400 bg-neutral-100 border border-neutral-200 rounded font-mono">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="sm:hidden p-1.5 text-neutral-500 hover:text-neutral-900"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-neutral-100">
          {query.trim() === '' ? (
            <div className="py-8 text-center">
              <p className="text-xs uppercase tracking-wider text-neutral-400 font-mono mb-2">Recommended Queries</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {['Watch time', 'Reels 200 views', 'Feed ranking', 'DM shares', 'Hashtags vs keywords', 'Explore page'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setQuery(suggestion)}
                    className="text-xs px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors rounded-md"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-1">
              <div className="px-2 py-1 text-xs font-mono text-neutral-400 uppercase tracking-wider">
                {results.length} {results.length === 1 ? 'Article' : 'Articles'} Found
              </div>
              {results.map((article) => (
                <div
                  key={article.id}
                  onClick={() => {
                    onSelectArticle(article.slug);
                    onClose();
                  }}
                  className="group p-3 hover:bg-neutral-50 cursor-pointer rounded-lg transition-colors flex items-start justify-between gap-4"
                >
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <span className="font-semibold text-neutral-700 uppercase tracking-wider text-[10px]">
                        {article.category}
                      </span>
                      <span>·</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-semibold text-neutral-900 group-hover:text-rose-600 transition-colors line-clamp-1">
                      {article.title}
                    </h4>
                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                      {article.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 pt-2 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-neutral-500">
              <FileText className="w-8 h-8 mx-auto text-neutral-300 mb-2" />
              <p className="text-sm font-medium text-neutral-800">No matching articles found</p>
              <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                Try searching for broader terms like "Reels", "Explore", "SEO", "Signals", or "Engagement".
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
          <span className="text-[11px]">THE ALGORITHM · Editorial Knowledge Base</span>
          <span className="text-[11px] font-mono">12 Guides Indexed</span>
        </div>
      </div>
    </div>
  );
};

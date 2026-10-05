import React from 'react';
import { Bookmark, X, ArrowRight, Trash2 } from 'lucide-react';
import { ARTICLES } from '../data/articles';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedSlugs: string[];
  onSelectArticle: (slug: string) => void;
  onRemoveBookmark: (slug: string) => void;
  onClearAll: () => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  bookmarkedSlugs,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll
}) => {
  if (!isOpen) return null;

  const savedArticles = ARTICLES.filter(a => bookmarkedSlugs.includes(a.slug));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-lg bg-white border border-neutral-200 shadow-2xl overflow-hidden rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-neutral-900 fill-neutral-900" />
            <h3 className="font-serif text-lg font-bold text-neutral-900">
              Saved Reading List
            </h3>
            <span className="text-xs font-mono text-neutral-500">
              ({savedArticles.length})
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors"
            aria-label="Close saved articles"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-6 divide-y divide-neutral-100">
          {savedArticles.length === 0 ? (
            <div className="py-12 text-center text-neutral-500">
              <Bookmark className="w-8 h-8 mx-auto text-neutral-300 mb-2" />
              <p className="text-sm font-medium text-neutral-800">Your reading list is empty</p>
              <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
                Bookmark articles across The Algorithm to save in-depth technical breakdowns for offline reading.
              </p>
            </div>
          ) : (
            savedArticles.map((article) => (
              <div key={article.id} className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4 group">
                <div 
                  onClick={() => {
                    onSelectArticle(article.slug);
                    onClose();
                  }}
                  className="cursor-pointer flex-1"
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider text-rose-600 font-bold block mb-1">
                    {article.category} · {article.readTime}
                  </span>
                  <h4 className="text-sm font-semibold text-neutral-900 group-hover:text-rose-600 transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onRemoveBookmark(article.slug)}
                    className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors"
                    title="Remove from list"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      onSelectArticle(article.slug);
                      onClose();
                    }}
                    className="p-1.5 text-neutral-600 hover:text-neutral-900 group-hover:translate-x-0.5 transition-all"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {savedArticles.length > 0 && (
          <div className="px-6 py-3 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <span>Stored locally in browser</span>
            <button
              onClick={onClearAll}
              className="text-neutral-500 hover:text-red-600 transition-colors font-mono uppercase tracking-wider text-[11px]"
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { ArrowRight, Bookmark } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onSelect: (slug: string) => void;
  featured?: boolean;
  isBookmarked?: boolean;
  onToggleBookmark?: (e: React.MouseEvent, slug: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  featured = false,
  isBookmarked = false,
  onToggleBookmark
}) => {
  return (
    <article 
      onClick={() => onSelect(article.slug)}
      className="group flex flex-col justify-between bg-white border border-neutral-200/80 hover:border-neutral-400/80 transition-all duration-200 cursor-pointer overflow-hidden p-6 sm:p-7 relative"
    >
      {/* Top Image if featured or standard card */}
      <div className="relative mb-5 overflow-hidden aspect-[16/10] bg-neutral-100">
        <img
          src={article.featuredImage}
          alt={article.imageAlt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        {onToggleBookmark && (
          <button
            onClick={(e) => onToggleBookmark(e, article.slug)}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark for later'}
            className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-neutral-700 hover:text-neutral-900 backdrop-blur-sm transition-colors rounded-sm shadow-sm"
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-neutral-900 text-neutral-900' : ''}`} />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Clean Unboxed Metadata: Zero-Pill Rule */}
          <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2.5 tracking-wide uppercase font-mono">
            <span className="text-neutral-900 font-semibold">{article.category}</span>
            <span aria-hidden="true" className="text-neutral-300">·</span>
            <span>{article.date}</span>
            <span aria-hidden="true" className="text-neutral-300">·</span>
            <span className="lowercase">{article.readTime}</span>
          </div>

          {/* Article Title */}
          <h3 className={`font-serif text-neutral-900 font-semibold tracking-tight leading-snug mb-3 group-hover:text-rose-600 transition-colors ${
            featured ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
          }`}>
            {article.title}
          </h3>

          {/* Short 1-2 sentence description */}
          <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3 mb-6 font-normal">
            {article.description}
          </p>
        </div>

        {/* Read Article Link & Author Footer */}
        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <img 
              src={article.author.avatar} 
              alt={article.author.name}
              className="w-5 h-5 rounded-full object-cover grayscale contrast-125" 
            />
            <span className="text-xs text-neutral-600 font-medium">{article.author.name}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900 group-hover:text-rose-600 transition-colors">
            <span>Read article</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </article>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Bookmark, 
  Share2, 
  Check, 
  Clock, 
  User, 
  Calendar,
  Sparkles,
  Info,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Eye,
  Type
} from 'lucide-react';
import { Article, CategorySlug } from '../types';
import { ARTICLES } from '../data/articles';
import { ReadingProgressBar } from './ReadingProgressBar';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (slug: string) => void;
  onSelectCategory: (categorySlug: CategorySlug) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (slug: string) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  onBack,
  onSelectArticle,
  onSelectCategory,
  isBookmarked = false,
  onToggleBookmark
}) => {
  const [copied, setCopied] = useState(false);
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState<'normal' | 'large'>('normal');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [article.slug]);

  // Find previous and next articles
  const currentIndex = ARTICLES.findIndex(a => a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? ARTICLES[currentIndex - 1] : null;
  const nextArticle = currentIndex < ARTICLES.length - 1 ? ARTICLES[currentIndex + 1] : null;

  // Find related articles
  const relatedArticles = ARTICLES.filter(a => 
    article.relatedSlugs?.includes(a.slug) || 
    (a.categorySlug === article.categorySlug && a.slug !== article.slug)
  ).slice(0, 3);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.subtitle,
          url: window.location.href,
        });
      } catch {
        // Fallback to copy link
        copyLink();
      }
    } else {
      copyLink();
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="min-h-screen bg-white">
      {/* Top Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Header Container */}
      <header className="border-b border-neutral-200/80 bg-[#FAFAFA] pt-8 pb-12 sm:pt-12 sm:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs text-neutral-500 mb-8 font-mono">
            <button 
              onClick={onBack}
              className="hover:text-neutral-900 transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
            <button 
              onClick={() => onSelectCategory(article.categorySlug)}
              className="hover:text-neutral-900 transition-colors cursor-pointer uppercase font-semibold text-rose-600"
            >
              {article.category}
            </button>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
            <span className="text-neutral-400 truncate max-w-[200px] sm:max-w-xs" title={article.title}>
              {article.title}
            </span>
          </nav>

          {/* Clean Unboxed Metadata: Zero-Pill Discipline */}
          <div className="flex items-center flex-wrap gap-2 text-xs text-neutral-500 mb-4 tracking-wider uppercase font-mono">
            <span className="text-rose-600 font-bold">{article.category}</span>
            <span aria-hidden="true" className="text-neutral-300">·</span>
            <span>{article.date}</span>
            <span aria-hidden="true" className="text-neutral-300">·</span>
            <span className="lowercase">{article.readTime}</span>
          </div>

          {/* Large Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-neutral-900 tracking-tight leading-[1.1] mb-6">
            {article.title}
          </h1>

          {/* Subtitle / Deck */}
          <p className="text-lg sm:text-xl md:text-2xl text-neutral-600 font-light leading-relaxed mb-8">
            {article.subtitle}
          </p>

          {/* Author Bar & Action Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-neutral-200">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-12 h-12 rounded-full object-cover grayscale contrast-125 border border-neutral-300"
              />
              <div>
                <div className="text-sm font-semibold text-neutral-900">{article.author.name}</div>
                <div className="text-xs text-neutral-500">{article.author.role}</div>
              </div>
            </div>

            {/* Reading controls & Share */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              {/* Font Size Toggle */}
              <button
                onClick={() => setFontSizeMultiplier(fontSizeMultiplier === 'normal' ? 'large' : 'normal')}
                className="p-2 border border-neutral-200 hover:border-neutral-400 text-neutral-600 hover:text-neutral-900 bg-white transition-colors rounded-sm text-xs font-mono flex items-center gap-1"
                title="Toggle font size"
                aria-label="Toggle larger font size"
              >
                <Type className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase">{fontSizeMultiplier === 'normal' ? 'A+' : 'A-'}</span>
              </button>

              {/* Bookmark */}
              {onToggleBookmark && (
                <button
                  onClick={() => onToggleBookmark(article.slug)}
                  className={`p-2 border border-neutral-200 hover:border-neutral-400 bg-white transition-colors rounded-sm text-neutral-600 hover:text-neutral-900 ${
                    isBookmarked ? 'bg-neutral-100 text-neutral-900 border-neutral-400' : ''
                  }`}
                  title={isBookmarked ? 'Saved in reading list' : 'Save for later'}
                  aria-label="Bookmark article"
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-neutral-900 text-neutral-900' : ''}`} />
                </button>
              )}

              {/* Share button */}
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-2 border border-neutral-200 hover:border-neutral-400 bg-white text-xs font-medium text-neutral-800 transition-colors rounded-sm"
                aria-label="Share article"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Link Copied' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image with Caption */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-6">
        <figure className="m-0">
          <div className="aspect-[16/9] w-full overflow-hidden bg-neutral-100 border border-neutral-200">
            <img
              src={article.featuredImage}
              alt={article.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
          {article.imageCaption && (
            <figcaption className="mt-3 text-xs text-neutral-500 font-mono text-center">
              {article.imageCaption}
            </figcaption>
          )}
        </figure>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Sticky Table of Contents Sidebar on Desktop */}
          <aside className="hidden lg:block lg:col-span-4 order-2 lg:order-1">
            <div className="sticky top-24 p-5 bg-neutral-50 border border-neutral-200/90 rounded-sm">
              <h3 className="text-xs uppercase tracking-widest font-mono font-bold text-neutral-900 mb-4 pb-2 border-b border-neutral-200">
                Contents Index
              </h3>
              <ul className="space-y-2 text-xs">
                {article.sections.map((section, idx) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-neutral-600 hover:text-rose-600 transition-colors line-clamp-1 block py-0.5"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Distinction Box */}
              <div className="mt-6 pt-4 border-t border-neutral-200 text-[11px] text-neutral-500 leading-relaxed font-sans">
                <div className="flex items-center gap-1.5 font-bold text-neutral-800 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Editorial Standard</span>
                </div>
                We explicitly distinguish verified Meta engineering disclosures from empirical creator observations.
              </div>
            </div>
          </aside>

          {/* Primary Editorial Prose */}
          <main className="lg:col-span-8 order-1 lg:order-2">
            
            {/* Highlighted Key Takeaways Box */}
            <div className="p-6 sm:p-7 bg-[#FAF9F6] border-l-4 border-neutral-900 mb-10 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-neutral-900" />
                <h3 className="text-xs uppercase tracking-widest font-mono font-bold text-neutral-900">
                  Key Takeaways
                </h3>
              </div>
              <ul className="space-y-2.5 text-sm sm:text-base text-neutral-800">
                {article.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-neutral-400 font-mono text-xs mt-1">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Article Sections */}
            <div className={`space-y-12 ${fontSizeMultiplier === 'large' ? 'text-lg' : 'text-base'}`}>
              {article.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24">
                  {/* Subheading */}
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mb-4 pt-2 border-t border-neutral-100">
                    {section.title}
                  </h2>

                  {/* Body Paragraphs */}
                  <div className="text-neutral-700 leading-relaxed whitespace-pre-line font-normal space-y-4 font-sans">
                    {section.content}
                  </div>

                  {/* Optional Bullet Points */}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="mt-4 space-y-2 pl-4 border-l-2 border-neutral-200">
                      {section.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Optional Data Table */}
                  {section.table && (
                    <div className="my-6 overflow-x-auto border border-neutral-200">
                      <table className="min-w-full divide-y divide-neutral-200 text-left text-xs sm:text-sm">
                        <thead className="bg-neutral-100 font-mono text-neutral-700">
                          <tr>
                            {section.table.headers.map((h, i) => (
                              <th key={i} className="px-3.5 py-3 font-semibold uppercase tracking-wider">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200 bg-white font-normal text-neutral-800">
                          {section.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'}>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="px-3.5 py-3 align-top leading-relaxed">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Optional Callout Box */}
                  {section.callout && (
                    <div className={`mt-6 p-4 sm:p-5 border-l-4 ${
                      section.callout.type === 'official' 
                        ? 'border-emerald-600 bg-emerald-50/40 text-emerald-950'
                        : section.callout.type === 'tip'
                        ? 'border-neutral-900 bg-neutral-100 text-neutral-900'
                        : 'border-amber-500 bg-amber-50/40 text-amber-950'
                    }`}>
                      <div className="flex items-center gap-1.5 font-mono text-xs uppercase font-bold tracking-wider mb-1.5">
                        <Info className="w-3.5 h-3.5" />
                        <span>{section.callout.title}</span>
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed font-sans">
                        {section.callout.text}
                      </p>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Author Bio Box */}
            <div className="mt-16 pt-8 border-t border-neutral-200 bg-neutral-50 p-6 sm:p-7 rounded-sm">
              <div className="flex items-start gap-4">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-14 h-14 rounded-full object-cover grayscale contrast-125 border border-neutral-300"
                />
                <div>
                  <div className="text-xs uppercase font-mono tracking-wider text-neutral-400">Written by</div>
                  <h4 className="text-base font-bold text-neutral-900 mt-0.5">{article.author.name}</h4>
                  <p className="text-xs text-neutral-500 mb-2">{article.author.role}</p>
                  <p className="text-sm text-neutral-600 leading-relaxed">{article.author.bio}</p>
                </div>
              </div>
            </div>

            {/* Previous / Next Article Navigation */}
            <nav aria-label="Article pagination" className="mt-12 pt-6 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevArticle ? (
                <button
                  onClick={() => onSelectArticle(prevArticle.slug)}
                  className="p-4 border border-neutral-200 hover:border-neutral-900 text-left transition-all group flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1 text-xs text-neutral-400 font-mono uppercase mb-1">
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                    <span>Previous Article</span>
                  </div>
                  <div className="text-sm font-semibold text-neutral-900 group-hover:text-rose-600 line-clamp-2">
                    {prevArticle.title}
                  </div>
                </button>
              ) : <div />}

              {nextArticle ? (
                <button
                  onClick={() => onSelectArticle(nextArticle.slug)}
                  className="p-4 border border-neutral-200 hover:border-neutral-900 text-right transition-all group flex flex-col justify-between sm:items-end"
                >
                  <div className="flex items-center gap-1 text-xs text-neutral-400 font-mono uppercase mb-1">
                    <span>Next Article</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="text-sm font-semibold text-neutral-900 group-hover:text-rose-600 line-clamp-2">
                    {nextArticle.title}
                  </div>
                </button>
              ) : <div />}
            </nav>
          </main>
        </div>
      </div>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="bg-neutral-50 border-t border-neutral-200 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4 bg-neutral-900" />
                <h3 className="text-xs uppercase tracking-widest font-mono font-bold text-neutral-900">
                  Related Investigations
                </h3>
              </div>
              <span className="text-xs font-mono text-neutral-400">
                Continue Learning
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectArticle(rel.slug)}
                  className="bg-white border border-neutral-200 p-5 group cursor-pointer hover:border-neutral-400 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/10] overflow-hidden mb-4 bg-neutral-100">
                      <img
                        src={rel.featuredImage}
                        alt={rel.imageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="text-xs text-neutral-500 font-mono uppercase mb-1">
                      {rel.category} · {rel.readTime}
                    </div>
                    <h4 className="font-serif text-lg font-bold text-neutral-900 group-hover:text-rose-600 transition-colors line-clamp-2 mb-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-neutral-600 line-clamp-2">
                      {rel.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-neutral-900">
                    <span>Read article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
};

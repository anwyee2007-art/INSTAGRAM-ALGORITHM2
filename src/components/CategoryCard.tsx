import React from 'react';
import { ArrowRight, Film, LayoutGrid, Clock, Compass, Search, TrendingUp } from 'lucide-react';
import { CategorySlug } from '../types';

interface CategoryCardProps {
  id: CategorySlug;
  number: string;
  name: string;
  description: string;
  onSelect: (categorySlug: CategorySlug) => void;
}

const getCategoryIcon = (id: CategorySlug) => {
  switch (id) {
    case 'reels':
      return <Film className="w-5 h-5 text-neutral-800" />;
    case 'feed':
      return <LayoutGrid className="w-5 h-5 text-neutral-800" />;
    case 'stories':
      return <Clock className="w-5 h-5 text-neutral-800" />;
    case 'explore':
      return <Compass className="w-5 h-5 text-neutral-800" />;
    case 'seo':
      return <Search className="w-5 h-5 text-neutral-800" />;
    case 'growth':
      return <TrendingUp className="w-5 h-5 text-neutral-800" />;
    default:
      return <LayoutGrid className="w-5 h-5 text-neutral-800" />;
  }
};

export const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  number,
  name,
  description,
  onSelect
}) => {
  return (
    <div
      onClick={() => onSelect(id)}
      className="group bg-white p-7 sm:p-8 border border-neutral-200/80 hover:border-neutral-900 transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden"
    >
      {/* Subtle index number watermark / header */}
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-xs text-neutral-400 font-medium tracking-widest">
          {number}
        </span>
        <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-200">
          <div className="group-hover:filter group-hover:invert transition-all">
            {getCategoryIcon(id)}
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-serif text-2xl font-bold text-neutral-900 tracking-tight mb-3 group-hover:text-rose-600 transition-colors uppercase">
          {name}
        </h4>
        <p className="text-sm text-neutral-600 leading-relaxed font-normal">
          {description}
        </p>
      </div>

      <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider font-semibold text-neutral-900 group-hover:text-rose-600 transition-colors">
          Explore System
        </span>
        <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );
};

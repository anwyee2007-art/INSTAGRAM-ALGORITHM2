import React from 'react';
import { CategoryCard } from './CategoryCard';
import { CategorySlug } from '../types';

interface ExploreSystemSectionProps {
  onSelectCategory: (slug: CategorySlug) => void;
}

export const ExploreSystemSection: React.FC<ExploreSystemSectionProps> = ({
  onSelectCategory
}) => {
  const cards = [
    {
      id: 'reels' as CategorySlug,
      number: '01',
      name: 'REELS',
      description: 'Understand how watch time, retention, shares and interactions influence Reels distribution.'
    },
    {
      id: 'feed' as CategorySlug,
      number: '02',
      name: 'FEED',
      description: 'Learn how Instagram ranks posts in the Feed.'
    },
    {
      id: 'stories' as CategorySlug,
      number: '03',
      name: 'STORIES',
      description: 'Discover why some Stories get more views and engagement than others.'
    },
    {
      id: 'explore' as CategorySlug,
      number: '04',
      name: 'EXPLORE',
      description: 'Understand how Instagram recommends content to people who don\'t follow you.'
    },
    {
      id: 'seo' as CategorySlug,
      number: '05',
      name: 'INSTAGRAM SEO',
      description: 'Learn how keywords, captions and profile information affect discoverability.'
    },
    {
      id: 'growth' as CategorySlug,
      number: '06',
      name: 'GROWTH',
      description: 'Practical strategies for improving organic reach and engagement.'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FAFAFA] border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-4 bg-rose-600" />
            <h2 className="text-xs uppercase tracking-widest font-mono font-bold text-neutral-900">
              Architectural Breakdown
            </h2>
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
            EXPLORE THE SYSTEM
          </h3>
          <p className="mt-3 text-base text-neutral-600 font-normal leading-relaxed">
            Each Instagram surface operates on a discrete recommendation model with unique optimization goals, user intents, and ranking signals.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <CategoryCard
              key={card.id}
              id={card.id}
              number={card.number}
              name={card.name}
              description={card.description}
              onSelect={onSelectCategory}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export type CategorySlug = 'algorithm' | 'reels' | 'feed' | 'stories' | 'explore' | 'seo' | 'growth';

export interface Category {
  id: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  coreSignals: string[];
}

export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface ArticleSection {
  id: string;
  title: string;
  content: string;
  bullets?: string[];
  callout?: {
    type: 'official' | 'observation' | 'tip';
    title: string;
    text: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface MetaSource {
  title: string;
  url: string;
  description?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  categorySlug: CategorySlug;
  author: Author;
  date: string;
  isoDate: string;
  readTime: string;
  featuredImage: string;
  imageAlt: string;
  imageCaption: string;
  description: string;
  keyTakeaways: string[];
  isOfficialMetaConfirmed: boolean;
  sections: ArticleSection[];
  faqs: ArticleFAQ[];
  metaSources?: MetaSource[];
  relatedSlugs: string[];
  legacySlugs?: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
  recommendedSlug: string;
  recommendedTitle: string;
}

export type ViewState = 
  | { type: 'home' }
  | { type: 'articles' }
  | { type: 'quiz' }
  | { type: 'article'; slug: string }
  | { type: 'category'; categorySlug: CategorySlug }
  | { type: 'about' }
  | { type: 'contact' };

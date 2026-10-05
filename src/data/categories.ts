import { Category, CategorySlug } from '../types';

export const CATEGORIES: Record<CategorySlug, Category> = {
  algorithm: {
    id: 'algorithm',
    name: 'Instagram Algorithm',
    tagline: 'The mathematical architecture behind modern discovery',
    description: 'Instagram does not rely on a singular algorithm. Instead, it operates multiple proprietary ranking systems tailored to Feed, Stories, Explore, Reels, and Search. Explore how each pipeline ranks and prioritizes content.',
    coreSignals: [
      'Relationship & interaction history with author',
      'Information about the post (popularity, recency, format)',
      'User activity and categorical watch affinities',
      'Probability of explicit action (watch, share, save, comment)'
    ]
  },
  reels: {
    id: 'reels',
    name: 'Reels',
    tagline: 'Entertainment-first recommendation and viral distribution',
    description: 'Unlike Feed, Reels focuses overwhelmingly on entertainment and discovery from accounts you do not follow. Learn how watch time, completion rates, audio seeds, and DM shares trigger distribution waves.',
    coreSignals: [
      'Watch time & loop completion velocity',
      'Direct Message (DM) send rate per view',
      'Audio track velocity and retention curve',
      'Visual quality and absence of watermarks'
    ]
  },
  feed: {
    id: 'feed',
    name: 'Feed',
    tagline: 'Your curated mix of connections and interest-based recommendations',
    description: 'The Feed algorithm balances content from accounts you actively follow with personalized algorithmic suggestions, favoring posts you are statistically likely to spend time on, comment on, or save.',
    coreSignals: [
      'Probability of spending 5+ seconds on post',
      'Likelihood of comment, like, or save',
      'Affinity score between viewer and creator',
      'Format affinity (carousel vs photo vs video)'
    ]
  },
  stories: {
    id: 'stories',
    name: 'Stories',
    tagline: 'High-frequency ephemera connecting your closest audience circle',
    description: 'Stories ranking is almost purely relationship-driven. Instagram predicts whose daily updates you care about most through DM frequency, profile visits, sticker taps, and completion rates.',
    coreSignals: [
      'Viewing history and skip-rate probability',
      'Direct message engagement and reaction frequency',
      'Closeness proxy (Close Friends list, mutual follows)',
      'Interactive sticker engagement (polls, questions, sliders)'
    ]
  },
  explore: {
    id: 'explore',
    name: 'Explore & Discovery',
    tagline: 'Predictive topic clustering for unregistered audience reach',
    description: 'Explore is Instagram’s intent-free discovery engine. By analyzing embedding vectors across accounts you have liked or saved, Instagram surfaces lookalike media from creators you have never encountered.',
    coreSignals: [
      'Lookalike seed account engagement patterns',
      'Post popularity velocity (early engagement ratio)',
      'Topic vector matching via computer vision and captions',
      'Safety and recommendation guideline compliance'
    ]
  },
  seo: {
    id: 'seo',
    name: 'Instagram SEO',
    tagline: 'Semantic indexing, search queries, and algorithmic text parsing',
    description: 'Instagram is increasingly used as a visual search engine. Optimize your profile name, bio keywords, descriptive caption copy, alt text, and audio indexing for algorithmic discoverability.',
    coreSignals: [
      'Text query relevance in username, name field & bio',
      'Semantic keyword presence in caption opening lines',
      'Accessibility alt-text and OCR text recognition in images',
      'Category tags and location metadata congruence'
    ]
  },
  growth: {
    id: 'growth',
    name: 'Growth',
    tagline: 'Evidence-backed frameworks for sustainable organic distribution',
    description: 'Move beyond vanity metrics and algorithm hacking. Explore reproducible content systems, distribution testing frameworks, audience retention loops, and community conversion strategies.',
    coreSignals: [
      'High save-to-reach and share-to-reach ratios',
      'Consistent publishing cadence without fatigue drops',
      'Carousel retention and multi-slide dwell time',
      'Genuine community dialogue and response rate'
    ]
  }
};

import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Does Instagram use a single unified algorithm to rank all content across the platform?",
    options: [
      "Yes, one universal neural network scores Feed, Reels, and Stories identically",
      "No, Instagram uses distinct ranking systems tailored to each surface (Feed, Reels, Stories, Explore)",
      "Yes, but only business and creator accounts share a unified algorithm",
      "No, only Feed and Reels are ranked algorithmically while Stories are purely chronological"
    ],
    correctIndex: 1,
    explanation: "According to Meta's engineering documentation and Instagram leadership, Instagram does not have a single algorithm. Each part of the app—Feed, Stories, Explore, Reels, and Search—uses its own algorithm tailored to how people use that specific surface.",
    topic: "System Architecture",
    recommendedSlug: "algorithm-2026",
    recommendedTitle: "How Does the Instagram Algorithm Work in 2026?"
  },
  {
    id: 2,
    question: "Which engagement signal currently acts as the strongest distribution multiplier for Instagram Reels virality?",
    options: [
      "Public post comments containing fire emojis",
      "Direct Message (DM) shares to friends",
      "Double-tap likes within the first 5 minutes",
      "Profile bio clicks from non-followers"
    ],
    correctIndex: 1,
    explanation: "Direct Message (DM) sends are officially weighted as one of the highest ranking signals for Reels because sharing content privately with friends demonstrates authentic conversational value and user satisfaction.",
    topic: "Reels & Engagement",
    recommendedSlug: "signals-reach",
    recommendedTitle: "How Likes, Comments, Saves & Shares Affect Instagram Reach"
  },
  {
    id: 3,
    question: "How does watch time and retention influence the distribution of an Instagram Reel?",
    options: [
      "Only the total raw video duration matters, regardless of when users leave",
      "High Average Percentage Watched (APV) and loop completion trigger broader audience test cohorts",
      "Watch time is only calculated if the viewer follows the creator",
      "Reels over 90 seconds are automatically granted algorithmic priority"
    ],
    correctIndex: 1,
    explanation: "Instagram evaluates retention curves and Average Percentage Watched (APV). Videos with high completion and re-watch (loop) rates signal high satisfaction, prompting the system to expand testing into wider lookalike audience cohorts.",
    topic: "Watch Time & Retention",
    recommendedSlug: "watch-time",
    recommendedTitle: "How Watch Time Affects Instagram Reels"
  },
  {
    id: 4,
    question: "What primary factor determines the left-to-right order of Instagram Stories in your top tray?",
    options: [
      "The exact chronological second the Story was published",
      "The total follower count of the publishing account",
      "Relationship closeness, DM exchange history, and sticker interaction frequency",
      "The amount of advertising budget spent by the account that week"
    ],
    correctIndex: 2,
    explanation: "Stories ranking is relationship-driven. The algorithm predicts whose updates you care about most based on direct message conversations, profile visits, sticker engagements, and your history of not skipping their stories.",
    topic: "Stories Ranking",
    recommendedSlug: "stories-views",
    recommendedTitle: "Instagram Stories Algorithm: Why Some Stories Get More Views"
  },
  {
    id: 5,
    question: "Why do some Instagram Reels suddenly stall around 200–500 views?",
    options: [
      "Instagram imposes a mandatory 24-hour shadowban on all accounts",
      "The initial test batch of 100–300 viewers failed to meet retention and share benchmark thresholds",
      "The creator posted during the wrong minute of the hour",
      "The creator edited the caption 15 minutes after publishing"
    ],
    correctIndex: 1,
    explanation: "The '200-view plateau' occurs when an initial testing cohort exhibits early drop-off (e.g. viewers scroll away within the first 2-3 seconds) or zero outbound shares, causing the recommendation model to cease wider distribution.",
    topic: "Distribution Bottlenecks",
    recommendedSlug: "reels-200-views",
    recommendedTitle: "Why Your Instagram Reels Suddenly Stop Getting Views"
  },
  {
    id: 6,
    question: "In modern Instagram SEO, which factor has the highest weight for ranking in search queries?",
    options: [
      "Pasting 30 broad hashtags in the comments section",
      "Natural semantic keywords in your Profile Name field and first caption lines",
      "Typing your username in all capital letters",
      "Posting more than five times per calendar day"
    ],
    correctIndex: 1,
    explanation: "Instagram's search engine relies on semantic natural language processing. Relevant keywords in your editable Name field, bio, and initial caption lines carry far greater discoverability weight than large blocks of generic hashtags.",
    topic: "Instagram SEO",
    recommendedSlug: "instagram-seo",
    recommendedTitle: "Instagram SEO: How to Make Your Content Discoverable"
  },
  {
    id: 7,
    question: "Does switching from a Personal account to a Creator or Business account hurt your organic reach?",
    options: [
      "Yes, Instagram deliberately throttles organic reach to force you to purchase boosted ads",
      "No, Meta has repeatedly confirmed that account type does not negatively impact organic ranking calculations",
      "Yes, but only for video content uploaded via desktop",
      "No, but business accounts are barred from the Explore page"
    ],
    correctIndex: 1,
    explanation: "This is a widespread algorithm myth. Instagram leadership has officially clarified multiple times that switching to a Professional or Creator account does not penalize or throttle your organic reach in the ranking system.",
    topic: "Algorithm Myths",
    recommendedSlug: "algorithm-2026",
    recommendedTitle: "How Does the Instagram Algorithm Work in 2026?"
  },
  {
    id: 8,
    question: "How does Instagram's Explore page choose which recommendations to show you?",
    options: [
      "It displays the globally top-trending posts regardless of your individual preferences",
      "It uses collaborative filtering and visual embeddings based on accounts and topics you previously liked or saved",
      "It prioritizes posts with the highest number of paid sponsor tags",
      "It shows random posts from verified accounts created in the last 7 days"
    ],
    correctIndex: 1,
    explanation: "Explore relies on seed accounts and embedding vectors. By analyzing content you previously engaged with, it finds lookalike audience clusters and surfaces topical media from creators you do not yet follow.",
    topic: "Explore & Discovery",
    recommendedSlug: "explore-system",
    recommendedTitle: "Instagram Explore Page Algorithm Explained"
  },
  {
    id: 9,
    question: "What is the primary organic advantage of publishing multi-slide carousel posts in Feed?",
    options: [
      "Carousels automatically grant 1,000 bonus impressions",
      "If a follower scrolls past without interacting, Instagram frequently re-serves the carousel displaying the second slide",
      "Carousels bypass Meta recommendation guidelines completely",
      "Carousels do not require alt text or captions to be indexed"
    ],
    correctIndex: 1,
    explanation: "Carousels offer a structural Feed advantage: if a user skips past slide 1, Instagram often shows the post again in a later session featuring slide 2, doubling your initial impression opportunities.",
    topic: "Feed Ranking",
    recommendedSlug: "feed-ranking",
    recommendedTitle: "How Instagram Ranking Works for Feed Posts"
  },
  {
    id: 10,
    question: "What is the most effective approach for sustainable organic reach on Instagram without paid ads?",
    options: [
      "Engaging in reciprocal like-for-like pods and follow-unfollow loops",
      "Aligning content formats to audience intent: Reels for discovery, Carousels for retention, Stories for connection",
      "Posting 10 low-effort videos daily using trending sounds regardless of topic relevance",
      "Repurposing watermarked videos from competing platforms without original commentary"
    ],
    correctIndex: 1,
    explanation: "Sustainable organic growth relies on a strategic multi-format funnel. Reels drive new non-follower discovery, educational Carousels generate dwell time and saves, and interactive Stories nurture community loyalty.",
    topic: "Growth Strategy",
    recommendedSlug: "organic-reach",
    recommendedTitle: "How to Increase Organic Reach on Instagram Without Paid Ads"
  }
];

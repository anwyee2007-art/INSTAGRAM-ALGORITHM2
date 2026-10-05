import React, { useState } from 'react';
import { ArrowRight, Check, ShieldCheck, Mail } from 'lucide-react';
import { CategorySlug } from '../types';

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateCategory: (slug: CategorySlug) => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onNavigateCategory,
  onOpenAbout,
  onOpenContact
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3500);
  };

  return (
    <footer className="bg-[#121212] text-white border-t border-neutral-800">
      {/* Newsletter Dispatch Banner */}
      <div className="border-b border-neutral-800 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 block mb-2">
                Monthly Technical Dispatch
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                Stay Ahead of Meta Algorithm Shifts
              </h3>
              <p className="text-sm text-neutral-400 font-light max-w-lg leading-relaxed">
                Receive our monthly breakdowns of undocumented ranking adjustments, retention engineering case studies, and empirical tests.
              </p>
            </div>

            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="p-4 bg-neutral-900 border border-emerald-500/40 text-emerald-400 flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div className="text-xs">
                    <p className="font-bold">Subscription Confirmed</p>
                    <p className="text-neutral-400">You are on the dispatch list. No spam, ever.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email address..."
                    className="flex-1 bg-neutral-900 border border-neutral-700 text-white placeholder:text-neutral-500 px-4 py-3 text-sm focus:outline-none focus:border-white transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-white text-neutral-900 hover:bg-neutral-200 font-medium text-xs uppercase tracking-wider transition-colors shrink-0 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <button
              onClick={onNavigateHome}
              className="text-left cursor-pointer focus:outline-none"
            >
              <h2 className="font-serif text-3xl font-extrabold tracking-tight text-white">
                THE ALGORITHM
              </h2>
            </button>
            <p className="text-base text-neutral-300 font-light italic">
              "Understanding the system behind your reach."
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm font-light">
              An independent educational marketing publication dedicated to explaining Instagram ranking signals, content distribution mechanics, Reels engineering, and organic discovery.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-neutral-400" />
              <span>Independent Editorial · Unaffiliated with Meta</span>
            </div>
          </div>

          {/* Links Column 1: System Surfaces */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs uppercase font-mono tracking-widest text-neutral-400 font-bold mb-4">
              Systems & Surfaces
            </h3>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li>
                <button
                  onClick={() => onNavigateCategory('algorithm')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Instagram Algorithm
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateCategory('reels')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Reels
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateCategory('stories')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Stories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateCategory('explore')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Explore
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateCategory('seo')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Instagram SEO
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateCategory('growth')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Growth
                </button>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Publication */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs uppercase font-mono tracking-widest text-neutral-400 font-bold mb-4">
              Publication
            </h3>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li>
                <button
                  onClick={onOpenAbout}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateHome}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Pillar Architecture
                </button>
              </li>
              <li>
                <span className="text-neutral-500 cursor-not-allowed">
                  Methodology & Telemetry
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-mono gap-4">
          <p>© 2026 The Algorithm</p>
          <p className="text-center sm:text-right">
            Designed for digital marketers, founders, and social media strategists.
          </p>
        </div>
      </div>
    </footer>
  );
};

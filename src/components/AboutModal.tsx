import React from 'react';
import { X, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { AUTHORS } from '../data/articles';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-2xl bg-white border border-neutral-200 shadow-2xl overflow-hidden rounded-lg max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Editorial Charter</span>
            <h3 className="font-serif text-xl font-bold text-neutral-900">
              About THE ALGORITHM
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors"
            aria-label="Close about modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 text-sm text-neutral-700 leading-relaxed font-sans">
          <div>
            <h4 className="font-serif text-lg font-bold text-neutral-900 mb-2">
              Understanding the System Behind Your Reach
            </h4>
            <p>
              The social media marketing industry is saturated with misinformation: rumors of "shadowbans," fabricated 30-hashtag formulas, and superstition masquerading as strategy.
            </p>
            <p className="mt-2">
              <strong>THE ALGORITHM</strong> was founded in 2026 as an independent, rigorous digital marketing publication dedicated to demystifying Instagram's recommendation engines. We treat ranking architecture as engineering, not astrology.
            </p>
          </div>

          <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-sm">
            <div className="flex items-center gap-2 font-bold text-neutral-900 text-xs uppercase font-mono mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Our Editorial Standard</span>
            </div>
            <ul className="space-y-1.5 text-xs text-neutral-600">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span>We distinguish officially confirmed Meta engineering disclosures (e.g. Adam Mosseri announcements, Meta AI papers) from observational creator tests.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span>Zero vendor bias or affiliate kickbacks. No sponsored algorithm myths.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span>Actionable, reproducible frameworks built on genuine audience engagement value.</span>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-3 font-semibold">
              Editorial Board & Contributors
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Object.values(AUTHORS).map((author, i) => (
                <div key={i} className="text-center p-3 border border-neutral-100 bg-neutral-50/50 rounded-sm">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-12 h-12 rounded-full mx-auto mb-2 object-cover grayscale contrast-125"
                  />
                  <div className="font-semibold text-xs text-neutral-900">{author.name}</div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">{author.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-neutral-50 border-t border-neutral-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium tracking-wide transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

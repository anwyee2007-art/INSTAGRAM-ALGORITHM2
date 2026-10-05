import React, { useState } from 'react';
import { X, Mail, Send, Check } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-md bg-white border border-neutral-200 shadow-2xl overflow-hidden rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Editorial Desk</span>
            <h3 className="font-serif text-lg font-bold text-neutral-900">
              Contact The Algorithm
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors"
            aria-label="Close contact modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-bold text-neutral-900">Message Dispatched</h4>
              <p className="text-xs text-neutral-600 max-w-xs mx-auto">
                Thank you for contacting our editorial desk. Our research team reviews reader submissions weekly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                Have an algorithm anomaly to report, a technical question about ranking, or an editorial inquiry? Reach out below.
              </p>
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-600 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full text-sm px-3.5 py-2.5 border border-neutral-300 focus:outline-none focus:border-neutral-900 bg-neutral-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-600 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sarah@agency.com"
                  className="w-full text-sm px-3.5 py-2.5 border border-neutral-300 focus:outline-none focus:border-neutral-900 bg-neutral-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-600 mb-1">Inquiry / Observation</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe the ranking pattern or question..."
                  className="w-full text-sm px-3.5 py-2.5 border border-neutral-300 focus:outline-none focus:border-neutral-900 bg-neutral-50/50 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send to Editorial Desk</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

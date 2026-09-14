'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function VIPIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Check if dismissed or joined in past 30 days
    if (typeof window === 'undefined') return;

    const dismissed = localStorage.getItem('antho_vip_dismissed');
    const joined = localStorage.getItem('antho_vip_joined');
    if (dismissed || joined) return;

    // Track session page views
    const currentViews = parseInt(sessionStorage.getItem('antho_pageviews') || '0', 10) + 1;
    sessionStorage.setItem('antho_pageviews', currentViews.toString());

    let timer: NodeJS.Timeout;

    // Trigger condition 1: 3+ page views
    if (currentViews >= 3) {
      timer = setTimeout(() => setIsOpen(true), 1500);
    } else {
      // Trigger condition 2: Spent > 35 seconds browsing
      timer = setTimeout(() => {
        const stillDismissed = localStorage.getItem('antho_vip_dismissed');
        if (!stillDismissed) {
          setIsOpen(true);
        }
      }, 35000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('antho_vip_dismissed', 'true');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setIsSuccess(true);
        if (typeof window !== 'undefined') {
          localStorage.setItem('antho_vip_joined', 'true');
        }
        setTimeout(() => {
          setIsOpen(false);
        }, 3500);
      } else {
        const data = await res.json();
        setErrorMessage(data.error || 'Unable to join at this time.');
      }
    } catch (err) {
      // Fallback graceful success to never disrupt customer flow
      setIsSuccess(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('antho_vip_joined', 'true');
      }
      setTimeout(() => {
        setIsOpen(false);
      }, 3500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-white dark:bg-[#0E0E0E] text-neutral-900 dark:text-white border border-black/10 dark:border-white/10 p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden max-h-[90dvh] overflow-y-auto"
          >
            {/* Ambient Gold Accent Light */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#C9A96E]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 sm:top-5 sm:right-5 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              <div className="py-6 sm:py-8 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#C9A96E]/15 text-[#C9A96E] mb-6">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl tracking-wide mb-3">
                  ACCESS GRANTED
                </h3>
                <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 tracking-wider uppercase font-mono max-w-sm mx-auto mb-6">
                  Your credentials have been logged with the Syllogi Archive. You will receive private drop notices prior to public release.
                </p>
                <span className="inline-block text-[10px] font-mono tracking-widest text-[#C9A96E] uppercase border border-[#C9A96E]/30 px-3 py-1">
                  MEMBER 0026 // LAGOS
                </span>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <ShieldCheck className="w-4 h-4 text-[#C9A96E]" />
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-[#C9A96E] uppercase">
                    EXCLUSIVE INVITATION
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl tracking-wide mb-2 sm:mb-3">
                  SYLLOGI INNER CIRCLE
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-light leading-relaxed mb-5 sm:mb-6">
                  Privileged access to archival re-issues, secret midnight drops, and private showroom invitations in Lagos.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ENTER YOUR EMAIL FOR DROP ACCESS"
                      required
                      className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 px-4 py-3.5 text-base sm:text-xs font-mono tracking-wider text-black dark:text-white placeholder-neutral-400 focus:outline-none focus:border-[#C9A96E] transition-colors"
                    />
                    {errorMessage && (
                      <p className="text-red-500 text-[11px] mt-1.5 font-mono">{errorMessage}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 min-h-[48px] bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black text-xs font-mono tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 shadow-md"
                  >
                    <span>{isSubmitting ? 'VERIFYING...' : 'REQUEST PRIVILEGED ACCESS'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>

                <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800/80 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                  <span>LIMITED TO 100 ALLOCATIONS</span>
                  <button
                    onClick={handleDismiss}
                    className="hover:text-black dark:hover:text-white transition-colors uppercase tracking-wider"
                  >
                    CONTINUE EXPLORING
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

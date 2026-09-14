'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useUIStore } from '@/stores/uiStore';
import SocialLinks from '@/components/ui/SocialIcons';
import { ChevronDown } from 'lucide-react';

const CATEGORY_ITEMS = [
  { label: 'Classic ANTHO Polos', href: '/shop?category=Classic+ANTHO+Polos' },
  { label: 'ANTHO Sweatpants', href: '/shop?category=ANTHO+Sweatpants' },
  { label: 'ANTHO Graphic Tees', href: '/shop?category=ANTHO+Graphic+Tees' },
];

const DROP_LINKS = [
  { label: 'All Collections', href: '/collections' },
  { label: 'Collection 001 // Genesis', href: '/collections/genesis' },
  { label: 'Editorial Lookbook', href: '/lookbook', tag: 'SS26' },
  { label: 'Events & Pop-Ups', href: '/events' },
];

const INFO_LINKS = [
  { label: 'Shipping & Returns', href: '/shipping-returns' },
  { label: 'Client FAQs', href: '/faq' },
  { label: 'Contact & Concierge', href: '/contact' },
];

const overlayVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.25, ease: 'easeIn' } }
};

export default function MobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu, theme, toggleTheme } = useUIStore();
  const [isAllProductsOpen, setIsAllProductsOpen] = useState(true);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 overflow-y-auto bg-[#FAFAF9] dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-[#FAFAF9] flex flex-col justify-between px-6 sm:px-12 md:px-20 py-8 md:py-12 transition-colors duration-300"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-8 border-b border-black/10 dark:border-white/10">
            <Link 
              href="/" 
              onClick={() => closeMobileMenu()}
              className="relative h-10 w-28 md:w-36 block"
            >
              <Image 
                src="/images/logos/antho-wordmark-red.png" 
                alt="ANTHO" 
                fill 
                className="object-contain object-left block dark:hidden"
              />
              <Image 
                src="/images/logos/antho-wordmark-white.png" 
                alt="ANTHO" 
                fill 
                className="object-contain object-left hidden dark:block"
              />
            </Link>

            <div className="flex items-center gap-6">
              <button
                onClick={() => toggleTheme()}
                className="flex items-center gap-2 text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] px-3 py-1.5 border border-black/20 dark:border-white/20 rounded-full hover:border-black dark:hover:border-white transition-colors"
                title="Toggle Theme (Light / Dark / Auto)"
              >
                <span className="w-2 h-2 rounded-full bg-[#C9A96E]" />
                <span>{theme === 'dark' ? 'DARK MODE' : theme === 'light' ? 'LIGHT MODE' : 'AUTO SYSTEM'}</span>
              </button>

              <button 
                onClick={() => closeMobileMenu()} 
                className="uppercase tracking-[0.25em] text-xs md:text-sm font-semibold hover:opacity-60 transition-opacity"
              >
                [ CLOSE &times; ]
              </button>
            </div>
          </div>

          {/* Menu Sections Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16 py-12 md:py-16">
            
            {/* Section 1: SHOP with All Products dropdown */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#C9A96E]">01 // Shop</span>
                <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
              </div>
              
              <div className="space-y-4">
                {/* All Products header with toggle */}
                <div className="flex items-center justify-between group">
                  <Link
                    href="/shop"
                    onClick={() => closeMobileMenu()}
                    className="text-base sm:text-lg font-medium tracking-tight hover:text-[#C9A96E] transition-colors"
                  >
                    <span className="group-hover:translate-x-1.5 transition-transform duration-300 inline-block">
                      All Products
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsAllProductsOpen(!isAllProductsOpen)}
                    className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-neutral-400 hover:text-black dark:hover:text-white"
                    aria-label="Toggle categories"
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isAllProductsOpen ? 'rotate-180 text-[#C9A96E]' : ''}`} />
                  </button>
                </div>

                {/* Dropdown list of categories */}
                <AnimatePresence initial={false}>
                  {isAllProductsOpen && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="pl-4 space-y-3 border-l-2 border-[#C9A96E]/40 overflow-hidden"
                    >
                      {CATEGORY_ITEMS.map((cat) => (
                        <li key={cat.label}>
                          <Link
                            href={cat.href}
                            onClick={() => closeMobileMenu()}
                            className="group flex items-center justify-between text-sm sm:text-base font-normal text-neutral-600 dark:text-neutral-400 hover:text-[#C9A96E] dark:hover:text-[#C9A96E] transition-colors py-0.5"
                          >
                            <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                              {cat.label}
                            </span>
                            <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity text-[#C9A96E]">
                              &rarr;
                            </span>
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Section 2: DROPS & VISUALS */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#C9A96E]">02 // Drops & Visuals</span>
                <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
              </div>
              <ul className="space-y-3.5">
                {DROP_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => closeMobileMenu()}
                      className="group flex items-center justify-between text-base sm:text-lg font-medium tracking-tight hover:text-[#C9A96E] transition-colors"
                    >
                      <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                        {link.label}
                      </span>
                      {link.tag && (
                        <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded border border-black/20 dark:border-white/20 text-[#C9A96E]">
                          {link.tag}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 3: CLIENT CARE & INFO */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#C9A96E]">03 // Information</span>
                <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
              </div>
              <ul className="space-y-3.5">
                {INFO_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => closeMobileMenu()}
                      className="group flex items-center justify-between text-base sm:text-lg font-medium tracking-tight hover:text-[#C9A96E] transition-colors"
                    >
                      <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                        {link.label}
                      </span>
                      <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity text-[#C9A96E]">
                        &rarr;
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom Utility Bar */}
          <div className="pt-8 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6 text-xs tracking-widest uppercase text-neutral-500">
            <SocialLinks />

            <div className="text-center">
              <span className="text-xs sm:text-sm tracking-[0.25em] uppercase text-[#C9A96E] font-serif italic">
                God is the greatest
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span>Nigeria &bull; ₦ NGN</span>
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useUIStore } from '@/stores/uiStore';
import { SOCIAL_LINKS } from '@/lib/constants';

const LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/collections' },
  { label: 'Lookbook', href: '/lookbook' },
  { label: 'About', href: '/about' },
];

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
  exit: { opacity: 0, transition: { duration: 0.5, ease: 'easeInOut', delay: 0.2 } }
};

const navVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

export default function MobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();

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
          className="fixed inset-0 z-50 bg-black flex flex-col justify-center px-6 md:px-24"
        >
          <div className="absolute top-8 right-6 md:right-12 z-50">
            <button onClick={() => closeMobileMenu()} className="text-white uppercase tracking-widest text-xs font-medium hover:opacity-50 mix-blend-difference">
              CLOSE
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <motion.nav variants={navVariants} initial="hidden" animate="visible" className="flex flex-col space-y-4">
              {LINKS.map((link) => (
                <motion.div key={link.label} variants={itemVariants} className="overflow-hidden">
                  <Link
                    href={link.href}
                    onClick={() => closeMobileMenu()}
                    className="font-serif text-5xl md:text-8xl lg:text-[10rem] uppercase tracking-tighter text-white hover:italic transition-all duration-500 block leading-[0.85]"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </div>

          <div className="pb-12 pt-8 flex justify-between items-end border-t border-white/10 mt-12">
            <div className="flex space-x-6">
              {Object.entries(SOCIAL_LINKS).map(([name, href]) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="text-white hover:text-stone-400 uppercase tracking-widest text-xs transition-colors">
                  {name}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

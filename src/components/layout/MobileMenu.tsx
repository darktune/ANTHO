'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/stores/uiStore';
import { SOCIAL_LINKS } from '@/lib/constants';

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/collections' },
  { label: 'Lookbook', href: '/lookbook' },
  { label: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'FAQ', href: '/faq' }
];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

const navVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
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
          className="fixed inset-0 z-[100] bg-[#0A0A0A]/95 backdrop-blur-xl flex flex-col"
        >
          <div className="flex justify-end p-6">
            <button onClick={() => closeMobileMenu()} className="text-white hover:text-[#C9A96E] transition-colors">
              <X size={32} />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <motion.nav variants={navVariants} initial="hidden" animate="visible" className="flex flex-col items-center space-y-6">
              {LINKS.map((link) => (
                <motion.div key={link.label} variants={itemVariants}>
                  <Link
                    href={link.href}
                    onClick={() => closeMobileMenu()}
                    className="text-2xl md:text-4xl uppercase tracking-[0.2em] text-white hover:text-[#C9A96E] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </div>

          <div className="p-8 flex flex-col items-center space-y-6">
            <div className="flex space-x-8">
              {Object.entries(SOCIAL_LINKS).map(([name, href]) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#C9A96E] uppercase tracking-widest text-xs transition-colors">
                  {name}
                </a>
              ))}
            </div>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-[#A8A29E] hover:text-white text-sm uppercase tracking-widest transition-colors">
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

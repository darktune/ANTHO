'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useUIStore } from '@/stores/uiStore';
import SocialLinks from '@/components/ui/SocialIcons';
import { ArrowUpRight, Shield, Truck, HelpCircle, Mail } from 'lucide-react';

const VISUAL_CARDS = [
  {
    id: 'shop',
    number: '01',
    label: 'ATELIER SHOP',
    title: 'The 4-Piece Drop',
    subtitle: 'SS26 Hero Launch Catalog',
    href: '/shop',
    image: '/images/gridimg/global_tee.png',
    isCutout: true,
    tags: [
      { name: 'Polos', href: '/shop?category=Classic+ANTHO+Polos' },
      { name: 'Sweatpants', href: '/shop?category=ANTHO+Sweatpants' },
      { name: 'Graphic Tees', href: '/shop?category=ANTHO+Graphic+Tees' },
    ],
  },
  {
    id: 'collections',
    number: '02',
    label: 'CURATED CAPSULES',
    title: 'Youth Series',
    subtitle: 'Contemporary Streetwear Capsules',
    href: '/collections',
    image: '/images/slideshow/4.JPEG',
    isCutout: false,
    tags: [
      { name: 'The Premier Launch', href: '/collections/the-premier-launch' },
      { name: 'Global Prevails', href: '/collections/global-prevails' },
      { name: 'NPNG Fleece', href: '/collections/npng-fleece' },
    ],
  },
  {
    id: 'lookbook',
    number: '03',
    label: 'EDITORIAL JOURNAL',
    title: 'Lookbook',
    subtitle: '18 Curated Campaign Stills',
    href: '/lookbook',
    image: '/images/slideshow/2.jpg',
    isCutout: false,
    tags: [
      { name: 'Act I — Global', href: '/lookbook' },
      { name: 'Act II — Prevails', href: '/lookbook' },
      { name: 'Act III — Atelier', href: '/lookbook' },
    ],
  },
  {
    id: 'events',
    number: '04',
    label: 'VAULT ARCHIVES',
    title: 'Pop-Ups & Dossiers',
    subtitle: 'CU Tradefair & SS26 Media Vault',
    href: '/events',
    image: '/images/antho-shoot/IMG_3803.JPG',
    isCutout: false,
    tags: [
      { name: 'Case 001 // CU Tradefair', href: '/events' },
      { name: 'Case 002 // SS26 Vault', href: '/events' },
    ],
  },
];

const INFO_PILLS = [
  { label: 'Shipping & Returns (10–14 Days)', href: '/shipping-returns', icon: Truck },
  { label: 'Client FAQ', href: '/faq', icon: HelpCircle },
  { label: 'Concierge & Inquiries', href: '/contact', icon: Mail },
];

const overlayVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.25, ease: 'easeIn' } }
};

export default function MobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu, theme, toggleTheme } = useUIStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, closeMobileMenu]);

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 overflow-y-auto bg-[#FAFAF9] dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-[#FAFAF9] flex flex-col justify-between px-4 sm:px-8 md:px-14 py-6 md:py-8 transition-colors duration-300"
        >
          {/* Top Navigation Bar */}
          <div className="flex items-center justify-between pb-5 border-b border-black/10 dark:border-white/10 gap-4">
            <Link 
              href="/" 
              onClick={() => closeMobileMenu()}
              className="flex items-center gap-3 group"
            >
              <div className="relative w-7 h-7 sm:w-8 sm:h-8">
                <Image 
                  src="/images/logos/antho-emblem-transparent.png" 
                  alt="ANTHO Emblem" 
                  fill 
                  className="object-contain filter invert dark:invert-0 transition-transform group-hover:scale-110"
                />
              </div>
              <div className="relative h-6 sm:h-7 w-20 sm:w-24">
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
              </div>
            </Link>

            <div className="flex items-center gap-3 sm:gap-5">
              <button
                onClick={() => toggleTheme()}
                className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] px-3 py-1.5 border border-black/15 dark:border-white/15 rounded-full hover:border-black dark:hover:border-white transition-colors"
                title="Toggle Theme (Light / Dark / Auto)"
              >
                <span className="w-2 h-2 rounded-full bg-[#C9A96E]" />
                <span>{theme === 'dark' ? 'DARK' : theme === 'light' ? 'LIGHT' : 'AUTO'}</span>
              </button>

              <button 
                onClick={() => closeMobileMenu()} 
                className="uppercase tracking-[0.2em] text-xs sm:text-sm font-semibold hover:text-[#C9A96E] transition-colors px-2 py-1 min-h-[44px] flex items-center"
                aria-label="Close navigation menu"
              >
                [ &times; CLOSE ]
              </button>
            </div>
          </div>

          {/* Center: Visual Direction Cards Grid (HCI 4-Pillar Architecture) */}
          <div className="py-6 sm:py-8 my-auto">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C9A96E]">
                DISCOVER THE ARCHIVE // SELECT PATH
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest text-neutral-400">
                Lagos, NG &bull; SS26
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {VISUAL_CARDS.map((card) => (
                <div 
                  key={card.id}
                  className="group relative flex flex-col justify-between overflow-hidden bg-black/5 dark:bg-stone-950 border border-black/10 dark:border-white/10 rounded-sm hover:border-[#C9A96E]/60 transition-all duration-300"
                >
                  {/* Top Link Container */}
                  <Link
                    href={card.href}
                    onClick={() => closeMobileMenu()}
                    className="block relative aspect-[4/3] sm:aspect-[1/1] w-full overflow-hidden bg-neutral-200 dark:bg-stone-900"
                  >
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className={`transition-transform duration-700 ease-out group-hover:scale-105 ${
                        card.isCutout 
                          ? 'object-contain p-6 drop-shadow-2xl' 
                          : 'object-cover filter grayscale contrast-110 group-hover:grayscale-0'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[9px] font-mono tracking-widest uppercase text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                      <span className="text-[#C9A96E]">{card.number}</span>
                      <span>//</span>
                      <span>{card.label}</span>
                    </div>

                    <div className="absolute top-3 right-3 text-white/80 group-hover:text-[#C9A96E] transition-colors">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="font-serif text-lg sm:text-xl uppercase tracking-tight leading-tight">
                        {card.title}
                      </h3>
                      <p className="text-[10px] text-neutral-300 font-light tracking-wide line-clamp-1">
                        {card.subtitle}
                      </p>
                    </div>
                  </Link>

                  {/* Sub-Pills for Fast Direct Navigation */}
                  <div className="p-3 bg-white/40 dark:bg-black/40 border-t border-black/5 dark:border-white/5 flex flex-wrap gap-1.5">
                    {card.tags.map((tag) => (
                      <Link
                        key={tag.name}
                        href={tag.href}
                        onClick={() => closeMobileMenu()}
                        className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-black/5 dark:bg-white/5 hover:bg-[#C9A96E] hover:text-black dark:hover:bg-[#C9A96E] dark:hover:text-black transition-colors"
                      >
                        {tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Client Services & Information Dock */}
          <div className="pt-5 border-t border-black/10 dark:border-white/10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {INFO_PILLS.map((info) => {
                  const Icon = info.icon;
                  return (
                    <Link
                      key={info.label}
                      href={info.href}
                      onClick={() => closeMobileMenu()}
                      className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider px-3 py-1.5 border border-black/10 dark:border-white/10 rounded-full hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
                    >
                      <Icon className="w-3 h-3 text-[#C9A96E]" />
                      <span>{info.label}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 text-xs font-serif italic text-[#C9A96E]">
                <Shield className="w-3.5 h-3.5" />
                <span>God is the greatest</span>
              </div>
            </div>

            {/* Social Icons & Country */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] uppercase tracking-widest text-neutral-500">
              <SocialLinks />
              <div className="flex items-center gap-3">
                <span>Direct Concierge: antho.syllogi@gmail.com</span>
                <span>&bull;</span>
                <span>Nigeria (₦ NGN)</span>
              </div>
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

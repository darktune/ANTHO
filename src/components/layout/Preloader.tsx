'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check if user has already seen the intro in this session
    const hasSeenIntro = sessionStorage.getItem('antho_hasSeenIntro');
    
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeenIntro || prefersReducedMotion) {
      setIsVisible(false);
      setShouldRender(false);
    } else {
      // 2.2s cinematic opening presentation
      const timer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem('antho_hasSeenIntro', 'true');
        setTimeout(() => setShouldRender(false), 600); // smooth exit
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('antho_hasSeenIntro', 'true');
    setTimeout(() => setShouldRender(false), 400);
  };

  if (!shouldRender) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          onClick={dismiss}
          className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col items-center justify-center cursor-pointer select-none px-4"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,169,110,0.08)_0%,transparent_70%)] pointer-events-none" />

          {/* Newly Added Emblem Logo with Cinematic Zoom-In */}
          <motion.div
            initial={{ scale: 0.45, opacity: 0, filter: 'blur(16px)' }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              filter: 'blur(0px)',
              transition: { 
                duration: 1.1, 
                ease: [0.16, 1, 0.3, 1] 
              } 
            }}
            className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 mb-8"
          >
            <Image
              src="/images/logos/antho-emblem-transparent.png"
              alt="ANTHO Emblem"
              fill
              priority
              className="object-contain drop-shadow-[0_0_25px_rgba(201,169,110,0.25)]"
            />
          </motion.div>

          {/* God is the greatest Quote Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 16, letterSpacing: '0.2em' }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              letterSpacing: '0.35em',
              transition: { 
                delay: 0.75, 
                duration: 0.9, 
                ease: [0.16, 1, 0.3, 1] 
              } 
            }}
            className="flex items-center gap-4 select-none"
          >
            <span className="h-px w-6 sm:w-12 bg-[#C9A96E]/40" />
            <span className="text-[11px] sm:text-xs tracking-[0.35em] text-[#C9A96E] font-serif uppercase italic font-medium">
              God is the greatest
            </span>
            <span className="h-px w-6 sm:w-12 bg-[#C9A96E]/40" />
          </motion.div>

          {/* Skip hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4, transition: { delay: 1.4, duration: 0.6 } }}
            className="absolute bottom-8 text-[9px] uppercase tracking-[0.25em] text-neutral-500 font-light"
          >
            Tap anywhere to enter
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

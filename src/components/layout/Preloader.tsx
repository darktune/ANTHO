'use client';

import { useEffect, useState } from 'react';
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
      const timer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem('antho_hasSeenIntro', 'true');
        setTimeout(() => setShouldRender(false), 800); // Wait for exit animation
      }, 1500); // 1.5s total duration for the preloader content
      return () => clearTimeout(timer);
    }
  }, []);

  if (!shouldRender) {
      return null;
  }

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.8 } }
  };

  const textVariants = {
    hidden: { opacity: 0, filter: 'blur(4px)' },
    visible: { 
      opacity: 1, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  const mottoVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.5, duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={containerVariants as any}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[9999] bg-[#FAFAFA] dark:bg-[#0A0A0A] flex flex-col items-center justify-center pointer-events-none"
        >
          <motion.div 
            variants={textVariants as any}
            className="mb-4"
          >
            <Image 
              src="/images/logo.jpg" 
              alt="ANTHO Logo" 
              width={240} 
              height={80} 
              className="h-20 w-auto mix-blend-difference invert dark:invert-0 dark:brightness-200" 
              priority
            />
          </motion.div>
          <motion.div
            variants={mottoVariants as any}
            className="text-xs md:text-sm tracking-[0.1em] text-neutral-500 uppercase font-light"
          >
            God is the Greatest
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

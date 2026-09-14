'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

// Using an image from ANTHO SHOOT
// Admin should be able to upload their own hero artwork via the CMS.
const DEFAULT_HERO_IMAGE = '/images/hero/IMG_3806.JPG';

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-[100svh] h-[100svh] w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Creative Illustration */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          {/* We use an img tag here instead of Next Image to ensure the animation is smooth, 
              or in a real app we'd use Next Image with priority */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
            style={{ 
              backgroundImage: `url(${DEFAULT_HERO_IMAGE})`,
              filter: 'grayscale(100%) contrast(1.2)'
            }}
          />
        </motion.div>
        
        {/* Grain overlay for editorial feel */}
        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        
        {/* Gradient overlays to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-7xl mx-auto h-full pb-12 sm:pb-20 pt-24 sm:pt-32">
        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[11rem] tracking-tight text-white mb-2 md:mb-6">
              ANTHO
            </h1>
            <p className="text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] text-neutral-300 font-light uppercase">
              God is the Greatest
            </p>
          </motion.div>
        </div>

        {/* CTA Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: mounted ? 1 : 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="w-full flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-0 mt-auto"
        >
          <div className="hidden md:block w-1/3 text-left">
            <span className="text-xs tracking-widest text-neutral-400 uppercase">Collection 004</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full md:w-1/3 justify-center">
            <Link 
              href="/collections"
              className="inline-flex items-center justify-center border border-white text-white px-8 py-3.5 min-h-[48px] text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-500 w-full sm:w-auto"
            >
              Explore Collection
            </Link>
            <Link 
              href="/shop"
              className="inline-flex items-center justify-center border border-white/20 sm:border-transparent text-white px-8 py-3.5 min-h-[48px] text-xs tracking-widest uppercase hover:text-neutral-400 transition-colors duration-500 w-full sm:w-auto"
            >
              Shop
            </Link>
          </div>

          <div className="hidden md:flex w-1/3 justify-end items-center">
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4 text-neutral-400" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

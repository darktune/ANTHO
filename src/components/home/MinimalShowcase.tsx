'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Film, ArrowDown } from 'lucide-react';

interface Slide {
  id: number;
  type: 'image' | 'video';
  src: string;
  tag: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
}

const SLIDES: Slide[] = [
  { 
    id: 1, 
    type: 'video', 
    src: '/images/antho-shoot/video_2026-09-04_09-11-38.mp4', 
    tag: 'CAMPAIGN MOTION REEL', 
    subtitle: 'SS26 // CONTEMPORARY NIGERIAN STREETWEAR',
    ctaText: 'EXPLORE DROP 001',
    ctaLink: '/shop'
  },
  { 
    id: 2, 
    type: 'image', 
    src: '/images/slideshow/1.jpg', 
    tag: 'THE ARCHITECTURAL POLO', 
    subtitle: '280GSM COMBED PIQUE • BESPOKE EMBROIDERY',
    ctaText: 'VIEW POLOS',
    ctaLink: '/products/antho-99-polo'
  },
  { 
    id: 3, 
    type: 'image', 
    src: '/images/slideshow/5.JPEG', 
    tag: 'NPNG HEAVYWEIGHT FLEECE', 
    subtitle: '500GSM FRENCH TERRY • INTENTIONAL STACKED DRAPE',
    ctaText: 'VIEW SWEATS',
    ctaLink: '/products/antho-npng-sweats'
  },
  { 
    id: 4, 
    type: 'image', 
    src: '/images/slideshow/7.JPEG', 
    tag: 'GLOBAL SYLLOGI INSIGNIA', 
    subtitle: '300GSM HIGH-DENSITY GRAPHIC SILKSCREEN',
    ctaText: 'VIEW GRAPHIC TEES',
    ctaLink: '/products/antho-global-tee'
  },
  { 
    id: 5, 
    type: 'image', 
    src: '/images/slideshow/9.jpg', 
    tag: 'LAGOS ARCHIVAL SERIES', 
    subtitle: 'MILLED TEXTILES • YOUTH STREETWEAR PROTOTYPES',
    ctaText: 'VIEW EDITORIAL',
    ctaLink: '/lookbook'
  },
  { 
    id: 6, 
    type: 'image', 
    src: '/images/slideshow/13.JPEG', 
    tag: 'PREVAILS STREET CULTURE', 
    subtitle: 'ENDURING FORM • WOVEN IN LAGOS, NIGERIA',
    ctaText: 'VIEW PREVAILS TEE',
    ctaLink: '/products/antho-prevails-tee'
  },
];

export default function MinimalShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentSlide = SLIDES[currentIndex];

  useEffect(() => {
    if (!isPlaying) return;

    // Video slide plays for 8s, image slides for 5s
    const duration = currentSlide.type === 'video' ? 8000 : 5000;
    const interval = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, duration);

    return () => clearTimeout(interval);
  }, [currentIndex, isPlaying, currentSlide.type]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const scrollToDrop = () => {
    if (typeof window !== 'undefined') {
      const dropSection = document.getElementById('current-drop');
      if (dropSection) {
        dropSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[640px] flex items-center justify-center overflow-hidden select-none bg-black">
      
      {/* Slides media container */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {currentSlide.type === 'video' ? (
            <motion.div
              key={`video-${currentSlide.src}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="relative w-full h-full"
            >
              <video
                ref={videoRef}
                src={currentSlide.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center filter brightness-[0.88]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />
            </motion.div>
          ) : (
            <motion.div
              key={`image-${currentSlide.src}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full"
            >
              <Image
                src={currentSlide.src}
                alt={currentSlide.tag}
                fill
                priority
                className="object-cover object-center filter brightness-[0.88]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/35" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 bg-noise opacity-15 mix-blend-overlay pointer-events-none z-10" />

      {/* Top Details HUD */}
      <div className="absolute top-20 sm:top-24 md:top-28 left-4 sm:left-8 md:left-12 right-4 sm:right-8 md:right-12 z-20 flex justify-between items-center text-white text-[10px] md:text-xs tracking-[0.25em] uppercase font-medium">
        <div className="flex items-center gap-2.5 px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
          <span className="text-stone-200">DROP 001 // LAUNCH ARCHIVE</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full">
          {currentSlide.type === 'video' ? (
            <span className="flex items-center gap-1.5 text-[#C9A96E] font-semibold">
              <Film className="w-3.5 h-3.5" /> MOTION VAULT
            </span>
          ) : (
            <span className="text-stone-300 font-mono">EDITORIAL CAMPAIGN</span>
          )}
        </div>
      </div>

      {/* Center Cinematic Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto mt-auto mb-20 sm:mb-24 md:mb-28">
        
        {/* Ethos Micro Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-3"
        >
          <span className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-[#C9A96E] font-semibold font-mono">
            {currentSlide.subtitle}
          </span>
        </motion.div>

        {/* Monumental Tagline */}
        <motion.h1
          key={`tag-${currentSlide.tag}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white uppercase tracking-tight mb-6 sm:mb-8 drop-shadow-md"
        >
          {currentSlide.tag}
        </motion.h1>

        {/* Dual Primary & Editorial Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <Link
            href={currentSlide.ctaLink || '/shop'}
            className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-[#FAFAF9] text-[#0A0A0A] hover:bg-[#C9A96E] hover:text-[#0A0A0A] transition-all duration-300 text-[11px] sm:text-xs uppercase tracking-[0.25em] font-bold shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>{currentSlide.ctaText || 'SHOP COLLECTION'}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>

          <Link
            href="/lookbook"
            className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-black/40 backdrop-blur-md border border-white/40 text-white hover:bg-white hover:text-black transition-all duration-300 text-[11px] sm:text-xs uppercase tracking-[0.25em] font-semibold flex items-center justify-center cursor-pointer"
          >
            EDITORIAL LOOKBOOK
          </Link>
        </motion.div>
      </div>

      {/* Animated Scroll Down Indicator (Desktop) */}
      <button
        onClick={scrollToDrop}
        aria-label="Scroll to collection"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer group"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] font-mono group-hover:text-[#C9A96E] transition-colors">DISCOVER DROP</span>
        <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1 group-hover:border-[#C9A96E] transition-colors">
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full bg-white group-hover:bg-[#C9A96E]" 
          />
        </div>
      </button>

      {/* Bottom Controls HUD */}
      <div className="absolute bottom-5 sm:bottom-7 left-4 sm:left-8 md:left-12 right-4 sm:right-8 md:right-12 z-20 flex justify-between items-center text-white">
        
        {/* Slide Counter */}
        <div className="text-[10px] sm:text-xs tracking-[0.25em] font-mono px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full">
          <span className="text-white font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
          <span className="text-white/40 mx-1.5">/</span>
          <span className="text-white/40">{String(SLIDES.length).padStart(2, '0')}</span>
        </div>

        {/* Segmented Progress Bars */}
        <div className="hidden sm:flex items-center gap-2 max-w-xs w-full px-4">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="flex-1 h-1 bg-white/20 hover:bg-white/50 rounded-full overflow-hidden transition-colors cursor-pointer py-1"
            >
              <div 
                className={`h-full rounded-full transition-all duration-300 ${
                  idx === currentIndex 
                    ? 'bg-[#C9A96E] w-full' 
                    : idx < currentIndex 
                    ? 'bg-white/60 w-full' 
                    : 'w-0'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Play/Pause & Arrow Nav */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-2 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            className="p-1.5 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <span className="text-white/20 select-none">|</span>
          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            className="p-1.5 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next slide"
            className="p-1.5 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </section>
  );
}

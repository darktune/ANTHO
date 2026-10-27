'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, ArrowRight } from 'lucide-react';

interface Slide {
  id: number;
  type: 'image' | 'video';
  src: string;
  sequence: string;
  name: string;
  spec: string;
  ctaText?: string;
  ctaLink?: string;
}

const SLIDES: Slide[] = [
  { 
    id: 1, 
    type: 'video', 
    src: '/images/new-shoot/campaign-motion.mp4', 
    sequence: 'SEQUENCE 01 // CAMPAIGN MOTION',
    name: 'ANTHO SS26 CAMPAIGN REEL',
    spec: 'LAGOS ATELIER // CONTEMPORARY RUNWAY',
    ctaText: 'SHOP DROP',
    ctaLink: '/shop'
  },
  { 
    id: 2, 
    type: 'image', 
    src: '/images/new-shoot/architectural-form.jpg', 
    sequence: 'SEQUENCE 02 // ARCHITECTURAL FORM',
    name: 'THE ARCHITECTURAL POLO & GRAPHICS',
    spec: '280GSM COMBED PIQUE • 300GSM SILKSCREEN',
    ctaText: 'VIEW LOOKBOOK',
    ctaLink: '/lookbook'
  },
  { 
    id: 3, 
    type: 'image', 
    src: '/images/slideshow/5.JPEG', 
    sequence: 'SEQUENCE 03 // NPNG FLEECE',
    name: 'NPNG HEAVYWEIGHT SWEATPANTS',
    spec: '500GSM FRENCH TERRY • STACKED DRAPE',
    ctaText: 'VIEW PIECE',
    ctaLink: '/products/antho-npng-sweats'
  },
  { 
    id: 4, 
    type: 'image', 
    src: '/images/slideshow/7.JPEG', 
    sequence: 'SEQUENCE 04 // GLOBAL INSIGNIA',
    name: 'GLOBAL GRAPHIC TEE',
    spec: '300GSM HIGH-DENSITY COMBED COTTON',
    ctaText: 'VIEW PIECE',
    ctaLink: '/products/antho-global-tee'
  },
  { 
    id: 5, 
    type: 'image', 
    src: '/images/slideshow/9.jpg', 
    sequence: 'SEQUENCE 05 // LAGOS ARCHIVE',
    name: 'EDITORIAL ARCHIVE & LOOKBOOK',
    spec: 'MILLED TEXTILES • YOUTH STREET CULTURE',
    ctaText: 'VIEW LOOKBOOK',
    ctaLink: '/lookbook'
  },
  { 
    id: 6, 
    type: 'image', 
    src: '/images/new-shoot/syllogi-sequence-1.jpg', 
    sequence: 'SEQUENCE 06 // SYLLOGI CROSS',
    name: 'ANTHO CROSS GRAPHIC TEE',
    spec: 'CUSTOM RAGLAN STITCH • HIGH-DENSITY PRINT',
    ctaText: 'VIEW PIECE',
    ctaLink: '/products/antho-prevails-tee'
  },
  { 
    id: 7, 
    type: 'image', 
    src: '/images/new-shoot/syllogi-sequence-2.jpg', 
    sequence: 'SEQUENCE 07 // SYLLOGI SEQUENCE',
    name: 'MY HATERS WATCHIN STATEMENT TEE',
    spec: 'VINTAGE SCREENPRINT • 300GSM COTTON',
    ctaText: 'VIEW LOOKBOOK',
    ctaLink: '/lookbook'
  },
];

export default function MinimalShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentSlide = SLIDES[currentIndex];

  useEffect(() => {
    if (!isPlaying) return;

    // Video slide plays for 8s, image slides for 4.5s
    const duration = currentSlide.type === 'video' ? 8000 : 4500;
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

  return (
    <section className="relative w-full h-screen min-h-[620px] flex flex-col justify-end items-center overflow-hidden select-none bg-black">
      
      {/* 1. Full-bleed Media Container (100% Unobscured) */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {currentSlide.type === 'video' ? (
            <motion.div
              key={`video-${currentSlide.src}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="relative w-full h-full"
            >
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover object-center"
              >
                <source src={currentSlide.src} type="video/mp4" />
                <source src={currentSlide.src} type="video/quicktime" />
                <source src={currentSlide.src} />
              </video>
              {/* Subtle cinematic gradient in the lower portion to enhance text legibility without blocking models */}
              <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
            </motion.div>
          ) : (
            <motion.div
              key={`image-${currentSlide.src}`}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full"
            >
              <Image
                src={currentSlide.src}
                alt={currentSlide.name}
                fill
                priority
                className="object-cover object-center"
              />
              {/* Subtle cinematic gradient in the lower portion */}
              <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. Centered Editorial Typography Lockup (Unique, Refined, Non-Overshadowing) */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-2xl mx-auto mb-20 sm:mb-24 pb-2 sm:pb-4 pointer-events-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentSlide.id}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Sequence Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full mb-2.5 sm:mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.3em] text-[#C9A96E] font-medium">
                {currentSlide.sequence}
              </span>
            </div>

            {/* Cloth Name / Headline */}
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white tracking-wide uppercase drop-shadow-md font-light mb-1.5 sm:mb-2 leading-tight">
              {currentSlide.name}
            </h2>

            {/* Fabric / Textile Spec */}
            {currentSlide.spec && (
              <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-white/70 mb-5 sm:mb-6 max-w-lg">
                {currentSlide.spec}
              </p>
            )}

            {/* Centered Curated Action Buttons */}
            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                href={currentSlide.ctaLink || '/shop'}
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-black hover:bg-[#C9A96E] hover:text-black text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] transition-all duration-300 shadow-lg flex items-center gap-2 group cursor-pointer"
              >
                <span>{currentSlide.ctaText || 'VIEW PIECE'}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/lookbook"
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-black/50 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-black text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] transition-all duration-300 cursor-pointer"
              >
                LOOKBOOK
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. Bottom HUD / Progress & Controls Bar */}
      <div className="absolute bottom-5 sm:bottom-7 left-4 sm:left-8 md:left-12 right-4 sm:right-8 md:right-12 z-20 flex justify-between items-center text-white">
        
        {/* Left: Slide Counter */}
        <div className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-white/75 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
          <span className="text-white font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
          <span className="mx-1.5 text-white/40">/</span>
          <span className="text-white/50">{String(SLIDES.length).padStart(2, '0')}</span>
        </div>

        {/* Center: Sleek Segmented Progress Indicators (Desktop) */}
        <div className="hidden md:flex items-center gap-1.5 max-w-[220px] w-full">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Slide ${idx + 1}`}
              className="flex-1 h-0.5 bg-white/20 hover:bg-white/50 rounded-full overflow-hidden transition-colors cursor-pointer py-1"
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

        {/* Right: Playback Controls */}
        <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded-full text-white/80">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            className="p-1 hover:text-white transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>

          <span className="text-white/20 select-none text-xs">|</span>

          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            className="p-1 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next slide"
            className="p-1 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </section>
  );
}

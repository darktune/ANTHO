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
  tag: string;
  ctaText?: string;
  ctaLink?: string;
}

const SLIDES: Slide[] = [
  { 
    id: 1, 
    type: 'video', 
    src: '/images/new-shoot/campaign-motion.mp4', 
    tag: 'CAMPAIGN MOTION REEL', 
    ctaText: 'SHOP DROP',
    ctaLink: '/shop'
  },
  { 
    id: 2, 
    type: 'image', 
    src: '/images/new-shoot/architectural-form.jpg', 
    tag: 'ARCHITECTURAL FORM', 
    ctaText: 'VIEW LOOKBOOK',
    ctaLink: '/lookbook'
  },
  { 
    id: 3, 
    type: 'image', 
    src: '/images/slideshow/5.JPEG', 
    tag: 'NPNG FLEECE SWEATS', 
    ctaText: 'VIEW PIECE',
    ctaLink: '/products/antho-npng-sweats'
  },
  { 
    id: 4, 
    type: 'image', 
    src: '/images/slideshow/7.JPEG', 
    tag: 'GLOBAL GRAPHIC TEE', 
    ctaText: 'VIEW PIECE',
    ctaLink: '/products/antho-global-tee'
  },
  { 
    id: 5, 
    type: 'image', 
    src: '/images/slideshow/9.jpg', 
    tag: 'EDITORIAL ARCHIVE', 
    ctaText: 'VIEW LOOKBOOK',
    ctaLink: '/lookbook'
  },
  { 
    id: 6, 
    type: 'image', 
    src: '/images/slideshow/13.JPEG', 
    tag: 'PREVAILS GRAPHIC TEE', 
    ctaText: 'VIEW PIECE',
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
    <section className="relative w-full h-screen min-h-[580px] flex items-end justify-between overflow-hidden select-none bg-black">
      
      {/* 1. Full-bleed Media Container (100% unobscured) */}
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
              {/* Very subtle bottom-only vignette to ensure legibility of bottom controls */}
              <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />
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
                alt={currentSlide.tag}
                fill
                priority
                className="object-cover object-center"
              />
              {/* Very subtle bottom-only vignette to ensure legibility of bottom controls */}
              <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. Delicate, Well-Proportioned Bottom Info & Actions (Zero center obstruction) */}
      <div className="relative z-20 w-full px-5 sm:px-8 md:px-12 pb-6 sm:pb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        
        {/* Left: Minimal Piece Label & Discrete Action Link */}
        <div className="flex flex-col items-start space-y-2 max-w-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={`label-${currentSlide.tag}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-white/90 font-medium drop-shadow-sm">
                {currentSlide.tag}
              </span>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-3 pt-0.5">
            <Link
              href={currentSlide.ctaLink || '/shop'}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/90 hover:bg-white text-black text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] transition-all backdrop-blur-sm shadow-sm hover:scale-[1.02]"
            >
              <span>{currentSlide.ctaText || 'VIEW'}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>

            <Link
              href="/lookbook"
              className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors underline underline-offset-4 px-2 py-1"
            >
              LOOKBOOK
            </Link>
          </div>
        </div>

        {/* Center: Sleek Segmented Progress Indicators (Desktop) */}
        <div className="hidden md:flex items-center gap-1.5 max-w-[200px] w-full mb-1">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Slide ${idx + 1}`}
              className="flex-1 h-0.5 bg-white/25 hover:bg-white/50 rounded-full overflow-hidden transition-colors cursor-pointer py-1"
            >
              <div 
                className={`h-full rounded-full transition-all duration-300 ${
                  idx === currentIndex 
                    ? 'bg-white w-full' 
                    : idx < currentIndex 
                    ? 'bg-white/50 w-full' 
                    : 'w-0'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Right: Unobtrusive Slide Counter & Playback Controls */}
        <div className="flex items-center gap-3 text-white/80 self-end sm:self-auto mb-1">
          <div className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-white/60">
            <span>{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="mx-1 text-white/30">/</span>
            <span>{String(SLIDES.length).padStart(2, '0')}</span>
          </div>

          <span className="text-white/20 select-none">|</span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              className="p-1 hover:text-white transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>

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

      </div>

    </section>
  );
}

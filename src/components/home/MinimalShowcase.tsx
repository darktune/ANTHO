'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Film } from 'lucide-react';

interface Slide {
  id: number;
  type: 'image' | 'video';
  src: string;
  tag: string;
  slug?: string;
}

const SLIDES: Slide[] = [
  { id: 1, type: 'video', src: '/images/antho-shoot/video_2026-09-04_09-11-38.mp4', tag: 'CAMPAIGN MOTION' },
  { id: 2, type: 'image', src: '/images/antho-shoot/IMG_3806.JPG', tag: 'SILK SHIRT // 001' },
  { id: 3, type: 'image', src: '/images/antho-shoot/IMG_3807.JPG', tag: 'HEAVY HOODIE // 002' },
  { id: 4, type: 'image', src: '/images/antho-shoot/IMG_3801.JPG', tag: 'TAILORED FORM // 003' },
  { id: 5, type: 'image', src: '/images/antho-shoot/IMG_3803.JPG', tag: 'OVERSIZED TEE // 004' },
  { id: 6, type: 'image', src: '/images/antho-shoot/IMG_3804.JPG', tag: 'ADIRE PRINT // 005' },
  { id: 7, type: 'image', src: '/images/antho-shoot/IMG_3805.JPG', tag: 'TECHNICAL CARGO // 006' },
  { id: 8, type: 'image', src: '/images/antho-shoot/IMG_3808.JPG', tag: 'RAW DENIM // 007' },
];

export default function MinimalShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentSlide = SLIDES[currentIndex];

  useEffect(() => {
    if (!isPlaying) return;

    // If current slide is video, let it play for 8 seconds, otherwise 4.5s for images
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
    <section className="relative w-full h-[88vh] md:h-[92vh] min-h-[580px] flex items-center justify-center overflow-hidden select-none bg-black">
      
      {/* Slides media container */}
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
                src={currentSlide.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>
          ) : (
            <motion.div
              key={`image-${currentSlide.src}`}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full"
            >
              <Image
                src={currentSlide.src}
                alt={currentSlide.tag}
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] opacity-10 mix-blend-overlay pointer-events-none z-10" />

      {/* Top Details */}
      <div className="absolute top-24 md:top-28 left-6 md:left-12 right-6 md:right-12 z-20 flex justify-between items-center text-white text-[10px] md:text-xs tracking-[0.25em] uppercase font-medium">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
          <span>DROP 001 // ACTIVE</span>
        </div>
        <div className="flex items-center gap-2">
          {currentSlide.type === 'video' ? (
            <span className="flex items-center gap-1.5 text-[#C9A96E]">
              <Film className="w-3.5 h-3.5" /> MOTION REEL
            </span>
          ) : (
            <span>EDITORIAL STILLS</span>
          )}
        </div>
      </div>

      {/* Center Action (Minimalist BolaPSD Streetwear CTA) */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 mt-auto mb-16 md:mb-20">
        <motion.div
          key={`tag-${currentSlide.tag}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-white/90 font-medium">
            {currentSlide.tag}
          </span>
        </motion.div>

        <div className="flex items-center gap-4">
          <Link
            href="/shop"
            className="px-8 py-3 bg-white text-black hover:bg-[#C9A96E] hover:text-white transition-colors duration-300 text-xs uppercase tracking-[0.25em] font-semibold"
          >
            SHOP COLLECTION
          </Link>
          <Link
            href="/lookbook"
            className="px-8 py-3 border border-white/60 text-white hover:border-white hover:bg-white/10 transition-colors duration-300 text-xs uppercase tracking-[0.25em] font-semibold"
          >
            LOOKBOOK
          </Link>
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className="absolute bottom-6 left-6 md:left-12 right-6 md:right-12 z-20 flex justify-between items-center text-white">
        
        {/* Slide Counter */}
        <div className="text-[11px] md:text-xs tracking-[0.25em] font-mono">
          <span>{String(currentIndex + 1).padStart(2, '0')}</span>
          <span className="text-white/40 mx-1.5">/</span>
          <span className="text-white/40">{String(SLIDES.length).padStart(2, '0')}</span>
        </div>

        {/* Thumbnail Dots */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full ${
                idx === currentIndex
                  ? 'w-6 md:w-8 h-1 bg-white'
                  : 'w-1.5 h-1 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Play/Pause & Arrow Nav */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            className="p-1.5 text-white/70 hover:text-white transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            className="p-1.5 text-white/70 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next slide"
            className="p-1.5 text-white/70 hover:text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </section>
  );
}

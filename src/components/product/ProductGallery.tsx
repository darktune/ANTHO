'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react';

interface GalleryImage {
  id?: string;
  url: string;
  alt?: string;
}

export default function ProductGallery({ images = [] }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const fallbackImages: GalleryImage[] = [
    { url: '/images/antho-shoot/IMG_3806.JPG', alt: 'ANTHO Product Image 1' },
    { url: '/images/antho-shoot/Snapchat-1522984318.jpg', alt: 'ANTHO Product Image 2' },
  ];

  const galleryImages = images && images.length > 0 ? images : fallbackImages;
  const currentImage = galleryImages[activeIndex] || galleryImages[0];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 lg:gap-6">
      {/* Thumbnails */}
      {galleryImages.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:w-20 shrink-0 hide-scrollbar">
          {galleryImages.map((img, i) => (
            <button 
              key={img.id || i}
              onClick={() => setActiveIndex(i)}
              className={`relative w-16 md:w-20 aspect-[3/4] shrink-0 bg-stone-900 overflow-hidden border transition-all duration-300 ${
                activeIndex === i ? 'border-[#C9A96E] opacity-100' : 'border-neutral-200 dark:border-white/10 opacity-60 hover:opacity-100'
              }`}
            >
              <Image 
                src={img.url} 
                alt={img.alt || `Thumbnail ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}
      
      {/* Main Image View */}
      <div className="flex-1 relative aspect-[3/4] bg-stone-900 overflow-hidden border border-neutral-200 dark:border-white/10 group">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={currentImage.url}
              alt={currentImage.alt || 'ANTHO Product Image'}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Download High-Res Editorial Asset */}
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={currentImage.url}
            download={`ANTHO-${(currentImage.alt || 'Asset').replace(/[^a-zA-Z0-9]/g, '_')}.jpg`}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-black/70 hover:bg-[#C9A96E] text-white hover:text-black text-[9px] sm:text-[10px] font-mono tracking-widest uppercase rounded backdrop-blur-md transition-all duration-300 shadow-lg"
            title="Download High-Res Media Asset"
            aria-label="Download High-Res Media Asset"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="inline">HIGH-RES</span>
          </a>
        </div>
      </div>
    </div>
  );
}

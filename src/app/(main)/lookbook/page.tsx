import type { Metadata } from 'next';
import Image from 'next/image';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'SS26 Editorial Lookbook — The Lagos Edit | ANTHO',
  description: 'SS26 — The Lagos Edit. High-editorial documentation of contemporary Nigerian streetwear, silhouettes, and cultural craftsmanship.',
  alternates: {
    canonical: '/lookbook',
  },
  openGraph: {
    title: 'SS26 Editorial Lookbook | ANTHO — The Lagos Edit',
    description: '12 high-resolution editorial stills exploring contemporary Nigerian streetwear.',
    url: 'https://www.anthosyllogi.xyz/lookbook',
    images: ['/images/antho-shoot/IMG_3806.JPG'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SS26 Editorial Lookbook | ANTHO',
    description: 'High-editorial documentation of contemporary Nigerian streetwear.',
    images: ['/images/antho-shoot/IMG_3806.JPG'],
  },
};

const lookbookImages = [
  { id: 1, src: '/images/antho-shoot/IMG_3806.JPG', title: 'Look 01 — Silk Fluidity', aspect: 'aspect-[3/4]' },
  { id: 2, src: '/images/antho-shoot/IMG_3807.JPG', title: 'Look 02 — Heavyweight Form', aspect: 'aspect-[4/5]' },
  { id: 3, src: '/images/antho-shoot/IMG_3801.JPG', title: 'Look 03 — Modern Tailoring', aspect: 'aspect-[3/4]' },
  { id: 4, src: '/images/antho-shoot/IMG_3803.JPG', title: 'Look 04 — Boxy Silhouette', aspect: 'aspect-[4/5]' },
  { id: 5, src: '/images/antho-shoot/IMG_3804.JPG', title: 'Look 05 — Indigo Adire', aspect: 'aspect-[3/4]' },
  { id: 6, src: '/images/antho-shoot/IMG_3805.JPG', title: 'Look 06 — Technical Utility', aspect: 'aspect-[4/5]' },
  { id: 7, src: '/images/antho-shoot/IMG_3808.JPG', title: 'Look 07 — Raw Denim Structure', aspect: 'aspect-[3/4]' },
  { id: 8, src: '/images/antho-shoot/Snapchat-1522984318.jpg', title: 'Look 08 — Street Narrative', aspect: 'aspect-[4/5]' },
  { id: 9, src: '/images/antho-shoot/Snapchat-1782284509.jpg', title: 'Look 09 — Movement & Grace', aspect: 'aspect-[3/4]' },
  { id: 10, src: '/images/antho-shoot/Snapchat-396574672.jpg', title: 'Look 10 — Contrast Shadows', aspect: 'aspect-[4/5]' },
  { id: 11, src: '/images/antho-shoot/Snapchat-617620438.jpg', title: 'Look 11 — Everyday Armor', aspect: 'aspect-[3/4]' },
  { id: 12, src: '/images/antho-shoot/photo_1_2026-09-04_09-11-37.jpg', title: 'Look 12 — Lagos Essence', aspect: 'aspect-[3/4]' },
];

export default function LookbookPage() {
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Lookbook', url: '/lookbook' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 sm:pb-32 pt-20 sm:pt-28 md:pt-36">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <Breadcrumbs 
        items={[
          { label: 'Drops & Visuals', href: '/collections' },
          { label: 'Lookbook' }
        ]}
        className="mb-6 sm:mb-8"
      />

      {/* Header */}
      <section className="text-center px-4 max-w-4xl mx-auto mb-10 sm:mb-16">
        <span className="text-xs uppercase tracking-[0.3em] text-[#C9A96E] mb-2 sm:mb-3 block">EDITORIAL JOURNAL</span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-neutral-900 dark:text-white tracking-tight mb-3 sm:mb-4">LOOKBOOK</h1>
        <p className="text-xs sm:text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-light tracking-[0.2em] uppercase mb-4">SS26 — The Lagos Edit</p>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[9px] sm:text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
          <span>12 EDITORIAL STILLS &bull; HIGH-RES DOWNLOADS ENABLED</span>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="container mx-auto px-2 sm:px-4 md:px-8">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
          {lookbookImages.map((item) => (
            <div 
              key={item.id} 
              className={`relative break-inside-avoid overflow-hidden group bg-stone-900 border border-black/10 dark:border-white/10 ${item.aspect}`}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105 filter grayscale sm:grayscale sm:contrast-110 group-hover:grayscale-0 transition-all duration-700"
              />
              
              {/* Overlay: Always subtly visible on mobile touch devices, fully animated on desktop */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 sm:p-6">
                <div className="flex justify-between items-end gap-3">
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-mono text-[#C9A96E] uppercase tracking-widest mb-0.5 sm:mb-1 block">LOOK 0{item.id}</span>
                    <span className="text-white font-serif text-base sm:text-lg tracking-wider italic block">{item.title}</span>
                  </div>
                  <a
                    href={item.src}
                    download={`ANTHO-${item.title.replace(/[^a-zA-Z0-9]/g, '_')}.jpg`}
                    className="p-2.5 bg-black/60 sm:bg-white/15 hover:bg-[#C9A96E] text-white hover:text-black rounded-full backdrop-blur-md transition-all duration-300 shrink-0 group/dl shadow-lg"
                    title="Download High-Res Editorial Still"
                    aria-label={`Download ${item.title}`}
                  >
                    <Download className="w-4 h-4 transition-transform group-hover/dl:translate-y-0.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

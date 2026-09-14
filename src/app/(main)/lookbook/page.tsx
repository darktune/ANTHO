import type { Metadata } from 'next';
import Image from 'next/image';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'SS26 Editorial Lookbook — The Lagos Edit | ANTHO',
  description: 'SS26 — The Lagos Edit. High-editorial documentation of contemporary Nigerian youth streetwear, architectural silhouettes, and cultural craftsmanship across 3 curated chapters.',
  alternates: {
    canonical: '/lookbook',
  },
  openGraph: {
    title: 'SS26 Editorial Lookbook | ANTHO — The Lagos Edit',
    description: 'Curated editorial stills exploring contemporary Nigerian youth streetwear across 3 chapters.',
    url: 'https://www.anthosyllogi.xyz/lookbook',
    images: ['/images/slideshow/1.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SS26 Editorial Lookbook | ANTHO',
    description: 'High-editorial documentation of contemporary Nigerian streetwear.',
    images: ['/images/slideshow/1.jpg'],
  },
};

interface LookbookItem {
  id: string;
  src: string;
  title: string;
  aspect: string;
  act: string;
}

const lookbookActs = [
  {
    actNumber: '01',
    actTitle: 'Act I — Global Presence & Campaign Stills',
    actSubtitle: 'High-energy editorial captures documenting the SS26 launch drop.',
    items: [
      { id: '1', src: '/images/slideshow/1.jpg', title: 'Look 01 — Architectural Form', aspect: 'aspect-[3/4]', act: 'Act I' },
      { id: '2', src: '/images/slideshow/2.JPEG', title: 'Look 02 — Urban Silhouette', aspect: 'aspect-[4/5]', act: 'Act I' },
      { id: '3', src: '/images/slideshow/3.JPEG', title: 'Look 03 — Shadow Play', aspect: 'aspect-[3/4]', act: 'Act I' },
      { id: '4', src: '/images/slideshow/4.JPEG', title: 'Look 04 — Relaxed Heavyweight Cut', aspect: 'aspect-[4/5]', act: 'Act I' },
      { id: '5', src: '/images/slideshow/5.JPEG', title: 'Look 05 — Monochrome Narrative', aspect: 'aspect-[3/4]', act: 'Act I' },
      { id: '6', src: '/images/slideshow/6.JPEG', title: 'Look 06 — Intentional Drape', aspect: 'aspect-[4/5]', act: 'Act I' },
    ]
  },
  {
    actNumber: '02',
    actTitle: 'Act II — Lagos Archival Movement',
    actSubtitle: 'Everyday street armor and culture rooted in youthful energy.',
    items: [
      { id: '7', src: '/images/slideshow/7.JPEG', title: 'Look 07 — The Prevails Attitude', aspect: 'aspect-[3/4]', act: 'Act II' },
      { id: '8', src: '/images/slideshow/8.JPEG', title: 'Look 08 — Concrete & Culture', aspect: 'aspect-[4/5]', act: 'Act II' },
      { id: '9', src: '/images/slideshow/9.JPEG', title: 'Look 09 — Architectural Balance', aspect: 'aspect-[3/4]', act: 'Act II' },
      { id: '10', src: '/images/slideshow/10.jpg', title: 'Look 10 — The Tradefair Edit', aspect: 'aspect-[4/5]', act: 'Act II' },
      { id: '11', src: '/images/slideshow/11.JPEG', title: 'Look 11 — Raw Textile Structure', aspect: 'aspect-[3/4]', act: 'Act II' },
      { id: '12', src: '/images/slideshow/12.JPEG', title: 'Look 12 — Night Horizon', aspect: 'aspect-[3/4]', act: 'Act II' },
      { id: '13', src: '/images/slideshow/13.JPEG', title: 'Look 13 — Syllogi In Motion', aspect: 'aspect-[4/5]', act: 'Act II' },
    ]
  },
  {
    actNumber: '03',
    actTitle: 'Act III — Studio Atelier & Streetwear Detail',
    actSubtitle: 'High-density silk-screen prints, mother-of-pearl buttons, and 500gsm fleece details.',
    items: [
      { id: '14', src: '/images/global_black/IMG_4346.jpg', title: 'Look 14 — Global Black Stance', aspect: 'aspect-[3/4]', act: 'Act III' },
      { id: '15', src: '/images/global_white/IMG_4344.jpg', title: 'Look 15 — Global White Silhouette', aspect: 'aspect-[4/5]', act: 'Act III' },
      { id: '16', src: '/images/black_prevails/IMG_4911.jpg', title: 'Look 16 — Prevails Noir Expression', aspect: 'aspect-[3/4]', act: 'Act III' },
      { id: '17', src: '/images/white_prevails/IMG_6714.JPEG', title: 'Look 17 — Prevails Pure Form', aspect: 'aspect-[4/5]', act: 'Act III' },
      { id: '18', src: '/images/antho-shoot/IMG_3806.JPG', title: 'Look 18 — Editorial Drape', aspect: 'aspect-[3/4]', act: 'Act III' },
      { id: '19', src: '/images/antho-shoot/IMG_3801.JPG', title: 'Look 19 — NPNG Stacked Hem', aspect: 'aspect-[4/5]', act: 'Act III' },
    ]
  }
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
      <section className="text-center px-4 max-w-4xl mx-auto mb-16 sm:mb-24">
        <span className="text-xs uppercase tracking-[0.3em] text-[#C9A96E] mb-2 sm:mb-3 block">EDITORIAL JOURNAL</span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-neutral-900 dark:text-white tracking-tight mb-3 sm:mb-4">LOOKBOOK</h1>
        <p className="text-xs sm:text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-light tracking-[0.2em] uppercase mb-4">SS26 — The Lagos Edit &bull; Three Chapters</p>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[9px] sm:text-[10px] font-mono tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">
          <span>19 CURATED STILLS &bull; HIGH-RES DOWNLOADS ENABLED</span>
        </div>
      </section>

      {/* Curated Sections (Acts) */}
      <div className="space-y-24 sm:space-y-36">
        {lookbookActs.map((act) => (
          <section key={act.actNumber} className="border-t border-black/10 dark:border-white/10 pt-12 sm:pt-16">
            <div className="mb-10 sm:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#C9A96E] block mb-1">
                  CHAPTER {act.actNumber}
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif text-neutral-900 dark:text-white tracking-tight">
                  {act.actTitle}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2 max-w-xl">
                  {act.actSubtitle}
                </p>
              </div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                {act.items.length} Editorial Stills
              </div>
            </div>

            {/* Masonry Column Layout */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
              {act.items.map((item) => (
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
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 sm:p-6">
                    <div className="flex justify-between items-end gap-3">
                      <div>
                        <span className="text-[9px] sm:text-[10px] font-mono text-[#C9A96E] uppercase tracking-widest mb-0.5 sm:mb-1 block">{item.act} &bull; STILL {item.id}</span>
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
        ))}
      </div>
    </div>
  );
}

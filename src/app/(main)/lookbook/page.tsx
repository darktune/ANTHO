import type { Metadata } from 'next';
import Image from 'next/image';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'SS26 Editorial Lookbook — The Lagos Edit | ANTHO',
  description: 'SS26 — The Lagos Edit. High-editorial documentation of contemporary Nigerian youth streetwear, architectural silhouettes, and cultural craftsmanship across 5 curated chapters.',
  alternates: {
    canonical: '/lookbook',
  },
  openGraph: {
    title: 'SS26 Editorial Lookbook | ANTHO — The Lagos Edit',
    description: 'Curated editorial stills exploring contemporary Nigerian youth streetwear across 5 chapters.',
    url: 'https://www.anthosyllogi.xyz/lookbook',
    images: ['/images/new-shoot/premier-launch-2.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SS26 Editorial Lookbook | ANTHO',
    description: 'High-editorial documentation of contemporary Nigerian streetwear.',
    images: ['/images/new-shoot/premier-launch-2.webp'],
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
    actTitle: 'Act I — Global Presence & Street Movement',
    actSubtitle: 'High-energy editorial captures documenting contemporary Lagos youth expression and the iconic Antho Global Tee.',
    items: [
      { id: '1', src: '/images/global_white/IMG_6580.JPEG', title: 'Look 01 — Global White Silhouette', aspect: 'aspect-[4/5]', act: 'Act I' },
      { id: '2', src: '/images/global_white/IMG_6727.JPEG', title: 'Look 02 — Contemporary Cut Detail', aspect: 'aspect-[3/4]', act: 'Act I' },
      { id: '3', src: '/images/global_black/IMG_6550.jpg', title: 'Look 03 — Onyx Black Street Attitude', aspect: 'aspect-[4/5]', act: 'Act I' },
      { id: '4', src: '/images/global_black/IMG_6693.JPEG', title: 'Look 04 — Chest Typography Insignia', aspect: 'aspect-[4/5]', act: 'Act I' },
      { id: '5', src: '/images/global_black/IMG_4346.jpg', title: 'Look 05 — 300gsm Combed Cotton Drape', aspect: 'aspect-[3/4]', act: 'Act I' },
      { id: '6', src: '/images/global_white/IMG_4344.jpg', title: 'Look 06 — Clean Architectural Form', aspect: 'aspect-[3/4]', act: 'Act I' },
    ]
  },
  {
    actNumber: '02',
    actTitle: 'Act II — Prevails Movement & Silhouette',
    actSubtitle: 'Everyday street armor and culture rooted in youthful resilience — featuring Antho Prevails tees.',
    items: [
      { id: '7', src: '/images/new-shoot/premier-launch-2.webp', title: 'Look 07 — The Terracotta Syndicate', aspect: 'aspect-[3/4]', act: 'Act II' },
      { id: '8', src: '/images/new-shoot/premier-launch-3.webp', title: 'Look 08 — Overhead Perspective Form', aspect: 'aspect-[3/4]', act: 'Act II' },
      { id: '9', src: '/images/new-shoot/syllogi-sequence-1.webp', title: 'Look 09 — Dual Cross Silhouettes', aspect: 'aspect-[3/4]', act: 'Act II' },
      { id: '10', src: '/images/new-shoot/syllogi-sequence-2.webp', title: 'Look 10 — Street Statement Form', aspect: 'aspect-[3/4]', act: 'Act II' },
      { id: '11', src: '/images/white_prevails/IMG_6714.JPEG', title: 'Look 11 — The Prevails Attitude', aspect: 'aspect-[3/4]', act: 'Act II' },
      { id: '12', src: '/images/black_prevails/IMG_6704.JPEG', title: 'Look 12 — Dropped Shoulder Tailoring', aspect: 'aspect-[3/4]', act: 'Act II' },
    ]
  },
  {
    actNumber: '03',
    actTitle: 'Act III — Studio Atelier & Streetwear Detail',
    actSubtitle: 'Curated studio captures, female baby tees, ANTHO signature pieces, and textured fleece silhouettes.',
    items: [
      { id: '13', src: '/images/new-shoot/architectural-form.webp', title: 'Look 13 — Architectural Form Golden Hour', aspect: 'aspect-[3/4]', act: 'Act III' },
      { id: '14', src: '/images/new-shoot/premier-launch-1.webp', title: 'Look 14 — NPNG Crest & Sweat Drape', aspect: 'aspect-[3/4]', act: 'Act III' },
      { id: '15', src: '/images/slideshow/10.jpg', title: 'Look 15 — Architectural Silhouette Cut', aspect: 'aspect-[3/4]', act: 'Act III' },
      { id: '16', src: '/images/slideshow/11.JPEG', title: 'Look 16 — Raw Milled Textile Structure', aspect: 'aspect-[4/5]', act: 'Act III' },
      { id: '17', src: '/images/slideshow/12.jpg', title: 'Look 17 — Lagos Night Horizon', aspect: 'aspect-[3/4]', act: 'Act III' },
      { id: '18', src: '/images/antho-shoot/IMG_3806.JPG', title: 'Look 18 — Editorial Drape On Form', aspect: 'aspect-[4/5]', act: 'Act III' },
    ]
  },
  {
    actNumber: '04',
    actTitle: 'Act IV — The Christos Polos // Architectural Pique',
    actSubtitle: 'Boxy pique polos in rich crimson red, optic white, onyx black, and black long-sleeve knitwear.',
    items: [
      { id: '19', src: '/images/products/polos/photo_1_2026-09-04_09-11-37.jpg', title: 'Look 19 — Crimson Red Christos Pique', aspect: 'aspect-[3/4]', act: 'Act IV' },
      { id: '20', src: '/images/slideshow/1.jpg', title: 'Look 20 — Optic White Architectural Pique', aspect: 'aspect-[3/4]', act: 'Act IV' },
      { id: '21', src: '/images/antho-shoot/IMG_3809.JPG', title: 'Look 21 — Onyx Black Christos Knit', aspect: 'aspect-[4/5]', act: 'Act IV' },
      { id: '22', src: '/images/products/polos/Snapchat-1079248294.jpg', title: 'Look 22 — Black Long-Sleeve Ribbed Cuff Detail', aspect: 'aspect-[3/4]', act: 'Act IV' },
      { id: '23', src: '/images/products/polos/Snapchat-848713023.jpg', title: 'Look 23 — Mother-of-Pearl Button Hardware', aspect: 'aspect-[4/5]', act: 'Act IV' },
    ]
  },
  {
    actNumber: '05',
    actTitle: 'Act V — Independence Commemorative Series',
    actSubtitle: 'Limited-edition Independence streetwear tees celebrating Nigerian heritage, resilience, and sovereignty.',
    items: [
      { id: '24', src: '/images/global_black/global_black_BACK.png', title: 'Look 24 — Independence Noir Insignia', aspect: 'aspect-[3/4]', act: 'Act V' },
      { id: '25', src: '/images/global_black/front_glbl.png', title: 'Look 25 — Commemorative Chest Placement', aspect: 'aspect-[3/4]', act: 'Act V' },
      { id: '26', src: '/images/slideshow/7.JPEG', title: 'Look 26 — Cultural Sovereignty Silkscreen', aspect: 'aspect-[4/5]', act: 'Act V' },
      { id: '27', src: '/images/slideshow/13.JPEG', title: 'Look 27 — Woven in Lagos Heritage', aspect: 'aspect-[3/4]', act: 'Act V' },
    ]
  }
];

export default function LookbookPage() {
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Lookbook', url: '/lookbook' },
  ];

  const totalStills = lookbookActs.reduce((acc, act) => acc + act.items.length, 0);

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
        <span className="text-xs uppercase tracking-[0.3em] text-[#C9A96E] mb-2 sm:mb-3 block font-mono">EDITORIAL JOURNAL</span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-neutral-900 dark:text-white tracking-tight mb-3 sm:mb-4">LOOKBOOK</h1>
        <p className="text-xs sm:text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-light tracking-[0.2em] uppercase mb-4">SS26 — The Lagos Edit &bull; Five Curated Acts</p>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[9px] sm:text-[10px] font-mono tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">
          <span>{totalStills} CURATED STILLS &bull; HIGH-RES DOWNLOADS ENABLED</span>
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

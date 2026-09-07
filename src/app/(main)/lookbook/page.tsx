import Image from 'next/image';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata = {
  title: 'Lookbook | ANTHO — SS26 The Lagos Edit',
  description: 'SS26 — The Lagos Edit. High-editorial documentation of contemporary Nigerian streetwear and culture.',
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
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 pt-28 md:pt-36">
      <Breadcrumbs 
        items={[
          { label: 'Lookbook' }
        ]}
        className="mb-8"
      />

      {/* Header */}
      <section className="text-center px-4 max-w-4xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.3em] text-[#C9A96E] mb-3 block">EDITORIAL JOURNAL</span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-neutral-900 dark:text-white tracking-tight mb-4">LOOKBOOK</h1>
        <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-light tracking-[0.2em] uppercase">SS26 — The Lagos Edit</p>
      </section>

      {/* Masonry Grid */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {lookbookImages.map((item) => (
            <div 
              key={item.id} 
              className={`relative break-inside-avoid overflow-hidden group bg-stone-900 border border-white/5 ${item.aspect}`}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105 filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="text-xs font-mono text-[#C9A96E] uppercase tracking-widest mb-1">0{item.id}</span>
                <span className="text-white font-serif text-lg tracking-wider italic">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

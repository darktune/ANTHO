'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const collections = [
  {
    id: 1,
    name: 'The Premier Launch',
    slug: 'the-premier-launch',
    subtitle: 'CAPSULE 01 // SS26 HERO',
    tag: '4 PIECES',
    description: 'The definitive 4-piece launch capsule engineered for youth and young adult streetwear connoisseurs.',
    image: '/images/slideshow/6.JPEG',
  },
  {
    id: 2,
    name: 'Global Prevails',
    slug: 'global-prevails',
    subtitle: 'CAPSULE 02 // 300GSM COTTON',
    tag: 'GRAPHIC SILKSCREEN',
    description: 'Iconic high-density graphic tees honoring cultural resilience and contemporary youth expression.',
    image: '/images/global_black/global_black_BACK.png',
  },
  {
    id: 3,
    name: 'NPNG & Architectural Fleece',
    slug: 'npng-fleece',
    subtitle: 'CAPSULE 03 // 500GSM FLEECE',
    tag: 'FRENCH TERRY',
    description: 'Milled French terry sweatpants and boxy pique polo shirts designed with intentional stacked drape.',
    image: '/images/antho-shoot/IMG_3807.JPG',
  },
  {
    id: 4,
    name: 'Lagos Archival Syndicate',
    slug: 'lagos-archival',
    subtitle: 'CAPSULE 04 // TRADEFAIR ARCHIVE',
    tag: 'POP-UP DOSSIER',
    description: 'Documented streetwear drops and campaign silhouettes from our Covenant University tradefair series.',
    image: '/images/antho-shoot/IMG_3808.JPG',
  },
];

export default function FeaturedCollection() {
  return (
    <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto bg-transparent">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end md:justify-between border-b border-black/10 dark:border-white/10 pb-6 gap-4"
      >
        <div>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-mono text-[#C9A96E] font-semibold mb-2 block">
            CURATED CAPSULES // ARCHIVAL SERIES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-neutral-900 dark:text-[#FAFAF9] tracking-tight uppercase">
            Featured Series
          </h2>
        </div>

        <Link 
          href="/collections"
          className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
        >
          <span>View All Collections &rarr;</span>
        </Link>
      </motion.div>

      {/* 2x2 Curated Capsules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
        {collections.map((collection, i) => (
          <motion.div
            key={collection.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            className="group relative aspect-[4/5] overflow-hidden bg-zinc-950 border border-black/10 dark:border-white/10"
          >
            <Image
              src={collection.image}
              alt={collection.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-[0.85] group-hover:brightness-100"
            />
            
            {/* Cinematic Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10 transition-opacity duration-500" />
            
            {/* Top Badge */}
            <div className="absolute top-6 left-6 z-20">
              <span className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-1 bg-black/60 backdrop-blur-md text-stone-200 border border-white/10 rounded-sm">
                {collection.tag}
              </span>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 z-20 flex flex-col items-start">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-mono text-[#C9A96E] font-semibold mb-2">
                {collection.subtitle}
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#FAFAF9] mb-2 uppercase tracking-tight">
                {collection.name}
              </h3>

              <p className="text-xs text-neutral-300 mb-5 max-w-sm line-clamp-2 leading-relaxed">
                {collection.description}
              </p>

              <Link 
                href={`/collections/${collection.slug}`}
                className="group/link inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#FAFAF9] border-b border-[#FAFAF9] pb-1 hover:text-[#C9A96E] hover:border-[#C9A96E] transition-colors"
              >
                <span>EXPLORE CAPSULE</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

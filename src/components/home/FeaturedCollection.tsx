'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const collections = [
  {
    id: 1,
    name: 'The Premier Launch',
    subtitle: 'SS26 Four-Piece Hero Capsule',
    description: 'The definitive 4-piece launch capsule engineered for youth streetwear connoisseurs.',
    href: '/collections/the-premier-launch',
    image: '/images/slideshow/3.JPEG',
  },
  {
    id: 2,
    name: 'Global Prevails',
    subtitle: '300gsm Heavyweight Cut',
    description: 'High-density silkscreen graphic tees honoring contemporary cultural resilience.',
    href: '/collections/global-prevails',
    image: '/images/slideshow/8.jpg',
  },
];

export default function FeaturedCollection() {
  return (
    <section className="py-20 md:py-28 px-4 md:px-8 max-w-[1400px] mx-auto bg-transparent">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between border-b border-black/10 dark:border-white/10 pb-6"
      >
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A96E] mb-2 block">CURATED CAPSULES</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-neutral-900 dark:text-[#FAFAF9] tracking-tight">Featured Series</h2>
        </div>
        <Link 
          href="/collections"
          className="mt-4 md:mt-0 text-xs uppercase tracking-[0.2em] font-semibold text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
        >
          [ View All Collections &rarr; ]
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {collections.map((collection, i) => (
          <motion.div
            key={collection.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            className="group relative aspect-[4/5] overflow-hidden bg-zinc-900 border border-black/10 dark:border-white/10"
          >
            <Image
              src={collection.image}
              alt={collection.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10 transition-opacity duration-500" />
            
            <div className="absolute bottom-8 left-8 right-8 z-20 flex flex-col items-start">
              <span className="text-xs uppercase tracking-[0.2em] text-[#C9A96E] mb-2">{collection.subtitle}</span>
              <h3 className="font-serif text-3xl md:text-4xl text-[#FAFAF9] mb-2">{collection.name}</h3>
              <p className="text-xs text-neutral-300 mb-4 max-w-sm">
                {collection.description}
              </p>
              <Link 
                href={collection.href}
                className="text-xs uppercase tracking-[0.2em] text-[#FAFAF9] border-b border-[#FAFAF9] pb-1 hover:text-[#C9A96E] hover:border-[#C9A96E] transition-colors"
              >
                Explore Capsule &rarr;
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const collections = [
  {
    id: 1,
    name: 'New Arrivals',
    subtitle: 'SS26 Capsule',
    href: '/shop',
    image: '/images/antho-shoot/IMG_3804.JPG',
  },
  {
    id: 2,
    name: 'Essentials',
    subtitle: 'Foundational Wardrobe',
    href: '/collections/essentials',
    image: '/images/antho-shoot/IMG_3807.JPG',
  },
];

export default function FeaturedCollection() {
  return (
    <section className="py-24 px-4 md:px-8 max-w-[1400px] mx-auto bg-[#0A0A0A]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between"
      >
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A96E] mb-3 block">FEATURED CAMPAIGNS</span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#FAFAF9] tracking-tight">Curated Series</h2>
        </div>
        <Link 
          href="/collections"
          className="mt-4 md:mt-0 text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors"
        >
          View All Collections &rarr;
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
            className="group relative aspect-[4/5] overflow-hidden bg-zinc-900 border border-white/5"
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
              <h3 className="font-serif text-3xl md:text-4xl text-[#FAFAF9] mb-4">{collection.name}</h3>
              <Link 
                href={collection.href}
                className="text-xs uppercase tracking-[0.2em] text-[#FAFAF9] border-b border-[#FAFAF9] pb-1 hover:text-[#C9A96E] hover:border-[#C9A96E] transition-colors"
              >
                Explore Capsule
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

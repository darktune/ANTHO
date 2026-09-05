'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const collections = [
  { id: 1, name: 'New Arrivals', href: '/shop/new' },
  { id: 2, name: 'Essentials', href: '/shop/essentials' }
];

export default function FeaturedCollection() {
  return (
    <section className="py-24 px-4 md:px-8 max-w-[1400px] mx-auto bg-[#0A0A0A]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-12 text-center md:text-left"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-[#C9A96E] mb-4 block">COLLECTION</span>
        <h2 className="font-serif text-4xl md:text-5xl text-[#FAFAF9]">New Arrivals</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {collections.map((collection, i) => (
          <motion.div
            key={collection.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            className="group relative aspect-[4/5] overflow-hidden bg-zinc-900"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-70" />
            <div className="absolute inset-0 bg-zinc-800 transform transition-transform duration-700 group-hover:scale-105" />
            
            <div className="absolute bottom-8 left-8 z-20 flex flex-col items-start">
              <h3 className="font-serif text-3xl text-[#FAFAF9] mb-4">{collection.name}</h3>
              <Link 
                href={collection.href}
                className="text-sm uppercase tracking-widest text-[#FAFAF9] border-b border-[#FAFAF9] pb-1 hover:text-[#C9A96E] hover:border-[#C9A96E] transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

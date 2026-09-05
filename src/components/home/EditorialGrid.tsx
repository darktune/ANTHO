'use client';
import { motion } from 'framer-motion';

import Image from 'next/image';

const gridItems = [
  { 
    id: 1, 
    title: 'Midnight Muse', 
    image: '/images/antho-shoot/IMG_3801.JPG',
    className: 'md:col-span-2 md:row-span-2 aspect-square md:aspect-auto' 
  },
  { 
    id: 2, 
    title: 'Texture & Form', 
    image: '/images/antho-shoot/Snapchat-1522984318.jpg',
    className: 'md:col-span-1 md:row-span-1 aspect-[4/5]' 
  },
  { 
    id: 3, 
    title: 'Lagos Silhouettes', 
    image: '/images/antho-shoot/Snapchat-1782284509.jpg',
    className: 'md:col-span-1 md:row-span-1 aspect-[4/5]' 
  },
  { 
    id: 4, 
    title: 'Street Elegance', 
    image: '/images/antho-shoot/IMG_3805.JPG',
    className: 'md:col-span-1 md:row-span-2 aspect-[3/4] md:aspect-auto' 
  },
  { 
    id: 5, 
    title: 'Culture & Heritage', 
    image: '/images/antho-shoot/photo_1_2026-09-04_09-11-37.jpg',
    className: 'md:col-span-1 md:row-span-1 aspect-square' 
  },
  { 
    id: 6, 
    title: 'The Golden Hour', 
    image: '/images/antho-shoot/IMG_3806.JPG',
    className: 'md:col-span-2 md:row-span-1 aspect-video md:aspect-auto' 
  },
];

export default function EditorialGrid() {
  return (
    <section className="py-24 px-4 md:px-8 max-w-[1400px] mx-auto bg-[#0A0A0A]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-12 text-center"
      >
        <span className="text-xs uppercase tracking-[0.25em] text-[#C9A96E] mb-3 block">VISUAL DIARY</span>
        <h2 className="font-serif text-3xl md:text-5xl text-[#FAFAF9]">Editorial Journal</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[320px] gap-4 md:gap-6">
        {gridItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: i * 0.08 }}
            className={`group relative overflow-hidden bg-zinc-900 border border-white/5 cursor-pointer ${item.className}`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105 filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            
            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <span className="text-xs uppercase tracking-widest text-[#C9A96E] mb-1 font-mono">0{item.id}</span>
              <span className="text-[#FAFAF9] font-serif text-2xl md:text-3xl italic">{item.title}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

'use client';
import { motion } from 'framer-motion';

const gridItems = [
  { id: 1, title: 'Midnight Muse', className: 'md:col-span-2 md:row-span-2 aspect-square md:aspect-auto' },
  { id: 2, title: 'Ochre Tones', className: 'md:col-span-1 md:row-span-1 aspect-[4/5]' },
  { id: 3, title: 'Texture & Form', className: 'md:col-span-1 md:row-span-1 aspect-[4/5]' },
  { id: 4, title: 'Street Elegance', className: 'md:col-span-1 md:row-span-2 aspect-[3/4] md:aspect-auto' },
  { id: 5, title: 'Minimalist Core', className: 'md:col-span-1 md:row-span-1 aspect-square' },
  { id: 6, title: 'Dusk till Dawn', className: 'md:col-span-2 md:row-span-1 aspect-video md:aspect-auto' },
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
        <span className="text-xs uppercase tracking-[0.2em] text-[#C9A96E] mb-4 block">JOURNAL</span>
        <h2 className="font-serif text-3xl md:text-4xl text-[#FAFAF9]">Editorial</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[300px] gap-4 md:gap-6">
        {gridItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className={`group relative overflow-hidden bg-zinc-900 cursor-pointer ${item.className}`}
          >
            <div className="absolute inset-0 bg-zinc-800 group-hover:scale-105 transition-transform duration-1000 ease-out" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 translate-y-4 group-hover:translate-y-0">
              <span className="text-[#FAFAF9] font-serif text-2xl italic">{item.title}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

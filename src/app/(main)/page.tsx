import MinimalShowcase from '@/components/home/MinimalShowcase';
import CurrentDrop from '@/components/home/CurrentDrop';
import FeaturedCollection from '@/components/home/FeaturedCollection';
import Link from 'next/link';
import Image from 'next/image';
import { FolderArchive, BookOpen, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'ANTHO | Official Store — Contemporary Nigerian Streetwear',
  description: 'God is the Greatest. Premium Nigerian Streetwear tailored for youth and young adults in Lagos, Nigeria.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* 1. Kinetic Hero Slideshow */}
      <MinimalShowcase />

      {/* 2. Core 4-Piece Drop */}
      <CurrentDrop />

      {/* 3. Featured Curated Collections */}
      <FeaturedCollection />

      {/* 4. Lookbook & Event Vault Dual Teaser */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-black/[0.02] dark:bg-white/[0.02] border-t border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Lookbook Journal Card */}
          <Link 
            href="/lookbook" 
            className="group relative aspect-[16/10] overflow-hidden bg-stone-900 border border-black/10 dark:border-white/10 flex flex-col justify-end p-6 sm:p-8"
          >
            <Image
              src="/images/slideshow/10.jpg"
              alt="Editorial Lookbook"
              fill
              className="object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105 filter grayscale contrast-110 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-[#C9A96E] text-xs font-mono uppercase tracking-[0.25em] mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>THREE-ACT EDITORIAL</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-white uppercase tracking-tight mb-2">
                SS26 Lookbook Journal
              </h3>
              <p className="text-xs text-neutral-300 line-clamp-2 mb-4 max-w-sm">
                19 curated stills across 3 chapters with high-resolution download triggers.
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white group-hover:text-[#C9A96E] transition-colors">
                <span>Explore Stills</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>

          {/* Event Archive Dossier Card */}
          <Link 
            href="/events" 
            className="group relative aspect-[16/10] overflow-hidden bg-stone-900 border border-black/10 dark:border-white/10 flex flex-col justify-end p-6 sm:p-8"
          >
            <Image
              src="/images/antho-shoot/IMG_3806.JPG"
              alt="Event Archives"
              fill
              className="object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105 filter grayscale contrast-110 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-[#C9A96E] text-xs font-mono uppercase tracking-[0.25em] mb-2">
                <FolderArchive className="w-3.5 h-3.5" />
                <span>CASE 001 & 002 // VAULT</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-white uppercase tracking-tight mb-2">
                Pop-Up & Media Archives
              </h3>
              <p className="text-xs text-neutral-300 line-clamp-2 mb-4 max-w-sm">
                Inspect the Covenant University tradefair activation and SS26 campaign media dossiers.
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white group-hover:text-[#C9A96E] transition-colors">
                <span>Open Archive Folders</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>

        </div>
      </section>
    </main>
  );
}

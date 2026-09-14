import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

const collections = [
  { 
    id: '1', 
    name: 'The Premier Launch', 
    slug: 'the-premier-launch', 
    count: 4,
    subtitle: 'SS26 Hero Capsule',
    description: 'The definitive 4-piece launch capsule engineered for youth and young adult streetwear connoisseurs.',
    image: '/images/slideshow/1.jpg'
  },
  { 
    id: '2', 
    name: 'Global Prevails', 
    slug: 'global-prevails', 
    count: 2,
    subtitle: '300gsm Heavyweight Cut',
    description: 'Iconic high-density graphic tees honoring cultural resilience and contemporary youth expression.',
    image: '/images/global_black/global_black_BACK.png'
  },
  { 
    id: '3', 
    name: 'NPNG & Architectural Fleece', 
    slug: 'npng-fleece', 
    count: 2,
    subtitle: '500gsm Streetwear Silhouettes',
    description: 'Milled French terry sweatpants and boxy pique polo shirts designed with intentional stacked drape.',
    image: '/images/slideshow/4.jpg'
  },
  { 
    id: '4', 
    name: 'Lagos Archival Syndicate', 
    slug: 'lagos-archival', 
    count: 4,
    subtitle: 'Pop-Up & Tradefair Archive',
    description: 'Documented streetwear drops and campaign silhouettes from our Covenant University tradefair pop-up series.',
    image: '/images/slideshow/10.jpg'
  },
];

export const metadata: Metadata = {
  title: 'Curated Collections & Seasonal Capsules | ANTHO',
  description: 'Explore the curated seasonal collections, limited streetwear drops, and archival releases from ANTHO in Lagos, Nigeria.',
  alternates: {
    canonical: '/collections',
  },
  openGraph: {
    title: 'Curated Collections | ANTHO — Luxury Nigerian Streetwear',
    description: 'Explore seasonal collections, tailoring, and contemporary youth streetwear capsules.',
    url: 'https://www.anthosyllogi.xyz/collections',
    images: ['/images/slideshow/1.jpg'],
  },
};

export default function CollectionsPage() {
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Collections', url: '/collections' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pt-20 sm:pt-28 md:pt-36">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <Breadcrumbs 
        items={[
          { label: 'Collections' },
        ]} 
        className="mb-6 sm:mb-8"
      />
      
      <div className="mb-14">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C9A96E] mb-3 block">CURATED ARCHIVE</span>
        <h1 className="text-4xl md:text-6xl font-serif text-neutral-900 dark:text-[#FAFAF9] tracking-tight">Collections</h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-3 max-w-xl">
          Seasonal capsules and archival drops rooted in contemporary youth culture and bespoke Nigerian streetwear design.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {collections.map((col) => (
          <Link 
            href={`/collections/${col.slug}`} 
            key={col.id}
            className="group relative aspect-[4/5] overflow-hidden bg-zinc-900 border border-white/5"
          >
            <Image
              src={col.image}
              alt={col.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 transition-opacity duration-500" />
            
            <div className="absolute bottom-8 left-8 right-8 z-20 flex flex-col items-start">
              <span className="text-xs uppercase tracking-[0.2em] text-[#C9A96E] mb-2">{col.subtitle}</span>
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">{col.name}</h2>
              <p className="text-neutral-300 text-xs line-clamp-2 mb-3 max-w-md">
                {col.description}
              </p>
              <span className="text-xs uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors">
                {col.count} {col.count === 1 ? 'Piece' : 'Pieces'} &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

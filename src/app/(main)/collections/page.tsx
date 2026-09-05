import Link from 'next/link';
import Image from 'next/image';

const collections = [
  { 
    id: '1', 
    name: 'Lagos Nights', 
    slug: 'lagos-nights', 
    count: 6,
    subtitle: 'Evening & Tailoring',
    image: '/images/antho-shoot/IMG_3806.JPG'
  },
  { 
    id: '2', 
    name: 'Essentials', 
    slug: 'essentials', 
    count: 8,
    subtitle: 'Foundational Streetwear',
    image: '/images/antho-shoot/IMG_3807.JPG'
  },
  { 
    id: '3', 
    name: 'Heritage', 
    slug: 'heritage', 
    count: 5,
    subtitle: 'Artisanal Adire & Textures',
    image: '/images/antho-shoot/IMG_3804.JPG'
  },
  { 
    id: '4', 
    name: 'New Arrivals', 
    slug: 'new-arrivals', 
    count: 10,
    subtitle: 'SS26 Capsule',
    image: '/images/antho-shoot/IMG_3801.JPG'
  },
];

export const metadata = {
  title: 'Collections | ANTHO — Premium Contemporary Nigerian Fashion',
  description: 'Explore the curated seasonal collections and capsule releases from ANTHO.',
};

export default function CollectionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28 md:pt-36">
      <div className="mb-14">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C9A96E] mb-3 block">CURATED ARCHIVE</span>
        <h1 className="text-4xl md:text-6xl font-serif text-[#FAFAF9] tracking-tight">Collections</h1>
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
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10 transition-opacity duration-500" />
            
            <div className="absolute bottom-8 left-8 right-8 z-20 flex flex-col items-start">
              <span className="text-xs uppercase tracking-[0.2em] text-[#C9A96E] mb-2">{col.subtitle}</span>
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">{col.name}</h2>
              <span className="text-xs uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors">
                {col.count} Products &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

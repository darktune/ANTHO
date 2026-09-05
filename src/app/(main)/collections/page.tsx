import Link from 'next/link';

const collections = [
  { id: '1', name: 'Lagos Heritage', slug: 'lagos-heritage', count: 12 },
  { id: '2', name: 'Essentials', slug: 'essentials', count: 8 },
  { id: '3', name: 'FW26 Drops', slug: 'fw26-drops', count: 24 },
  { id: '4', name: 'Accessories', slug: 'accessories', count: 5 },
];

export const metadata = {
  title: 'Collections | ANTHO',
};

export default function CollectionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-serif text-[#FAFAF9] mb-8">Collections</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map((col) => (
          <Link 
            href={`/collections/${col.slug}`} 
            key={col.id}
            className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-[#1A1A1A]"
          >
             <div className="absolute inset-0 flex items-center justify-center opacity-20 font-serif text-4xl text-[#A8A29E]">ANTHO</div>
             
             <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
             
             <div className="absolute bottom-8 left-8">
               <h2 className="text-3xl font-serif text-white mb-2">{col.name}</h2>
               <p className="text-[#A8A29E]">{col.count} Products</p>
             </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

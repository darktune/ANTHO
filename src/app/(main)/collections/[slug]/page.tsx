import ProductGrid from '@/components/product/ProductGrid';
import { sampleProducts } from '@/lib/sample-data';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  return {
    title: `${resolvedParams.slug.replace('-', ' ').toUpperCase()} | ANTHO Collections`,
  };
}

export default async function CollectionPage({ params }: Props) {
  const resolvedParams = await params;
  const collectionName = resolvedParams.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div>
      {/* Hero */}
      <div className="relative h-[40vh] min-h-[300px] flex flex-col items-center justify-center bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A]">
        <nav className="absolute top-8 left-8 flex items-center text-sm text-[#A8A29E]">
          <Link href="/" className="hover:text-[#FAFAF9]">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/collections" className="hover:text-[#FAFAF9]">Collections</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-[#FAFAF9]">{collectionName}</span>
        </nav>
        <h1 className="text-5xl md:text-6xl font-serif text-[#FAFAF9] mb-4 text-center">{collectionName}</h1>
        <p className="text-[#A8A29E] max-w-xl text-center px-4">
          Explore the curated {collectionName.toLowerCase()} collection featuring premium streetwear aesthetics tailored for modern life.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductGrid products={sampleProducts} />
      </div>
    </div>
  );
}

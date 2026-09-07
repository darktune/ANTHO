import ProductGrid from '@/components/product/ProductGrid';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { sampleProducts } from '@/lib/sample-data';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28 md:pt-36">
      <Breadcrumbs 
        items={[
          { label: 'Collections', href: '/collections' },
          { label: collectionName }
        ]}
        className="mb-8"
      />

      {/* Hero Banner */}
      <div className="mb-14 pb-8 border-b border-black/10 dark:border-white/10">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C9A96E] mb-3 block">COLLECTION ARCHIVE</span>
        <h1 className="text-4xl md:text-6xl font-serif text-neutral-900 dark:text-[#FAFAF9] tracking-tight mb-4">
          {collectionName}
        </h1>
        <p className="text-neutral-600 dark:text-[#A8A29E] max-w-2xl text-sm leading-relaxed">
          Explore the curated {collectionName.toLowerCase()} collection featuring premium contemporary streetwear tailored for modern life.
        </p>
      </div>

      <ProductGrid products={sampleProducts} />
    </div>
  );
}

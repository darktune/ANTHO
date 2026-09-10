import ProductGrid from '@/components/product/ProductGrid';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { sampleProducts } from '@/lib/sample-data';
import { prisma } from '@/lib/prisma';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const name = resolvedParams.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    title: `${name} | ANTHO Collections`,
    description: `Explore the ${name} collection from ANTHO. Premium Nigerian streetwear and contemporary luxury pieces.`,
  };
}

export default async function CollectionPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const collectionName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  let dbProducts: any[] = [];
  try {
    const collection = await prisma.collection.findUnique({
      where: { slug },
      include: {
        products: {
          include: {
            product: {
              include: {
                images: { orderBy: { position: 'asc' } },
                variants: true,
              },
            },
          },
        },
      },
    });

    if (collection && collection.products.length > 0) {
      dbProducts = collection.products.map(cp => cp.product).filter(Boolean);
    }
  } catch (err) {
    // Graceful fallback
  }

  // Smart fallback filtering
  let products = dbProducts;
  if (!products || products.length === 0) {
    if (slug === 'lagos-nights') {
      products = sampleProducts.filter(p => 
        p.category.toLowerCase().includes('polo') || p.category.toLowerCase().includes('tee')
      ) as any;
    } else if (slug === 'essentials') {
      products = sampleProducts.filter(p => 
        p.category.toLowerCase().includes('sweatpant') || p.category.toLowerCase().includes('tee')
      ) as any;
    } else if (slug === 'heritage') {
      products = sampleProducts.filter(p => 
        p.category.toLowerCase().includes('polo')
      ) as any;
    } else if (slug === 'new-arrivals') {
      products = sampleProducts.slice(0, 6) as any;
    } else {
      products = sampleProducts as any;
    }
  }

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
          Explore the curated {collectionName.toLowerCase()} capsule featuring premium contemporary streetwear tailored for modern life.
        </p>
      </div>

      <ProductGrid products={products} />
    </div>
  );
}

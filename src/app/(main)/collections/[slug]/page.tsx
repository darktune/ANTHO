import type { Metadata } from 'next';
import ProductGrid from '@/components/product/ProductGrid';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { sampleProducts } from '@/lib/sample-data';
import { prisma } from '@/lib/prisma';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const title = `${name} Collection | ANTHO`;
  const description = `Explore the ${name} capsule from ANTHO. Contemporary luxury Nigerian streetwear crafted and tailored in Lagos.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/collections/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.anthosyllogi.xyz/collections/${slug}`,
      images: ['/images/antho-shoot/IMG_3806.JPG'],
    },
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

  // Smart fallback filtering based on curated capsules
  let products = dbProducts;
  if (!products || products.length === 0) {
    if (slug === 'global-prevails') {
      products = sampleProducts.filter(p => 
        p.category.toLowerCase().includes('graphic') || p.name.toLowerCase().includes('global') || p.name.toLowerCase().includes('prevails')
      ) as any;
    } else if (slug === 'npng-fleece') {
      products = sampleProducts.filter(p => 
        p.category.toLowerCase().includes('sweatpant') || p.category.toLowerCase().includes('polo')
      ) as any;
    } else if (slug === 'the-premier-launch' || slug === 'lagos-archival' || slug === 'new-arrivals') {
      products = sampleProducts as any;
    } else {
      products = sampleProducts as any;
    }
  }

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Collections', url: '/collections' },
    { name: collectionName, url: `/collections/${slug}` },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pt-20 sm:pt-28 md:pt-36">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <Breadcrumbs 
        items={[
          { label: 'Collections', href: '/collections' },
          { label: collectionName }
        ]}
        className="mb-6 sm:mb-8"
      />

      {/* Hero Banner */}
      <div className="mb-10 sm:mb-14 pb-6 sm:pb-8 border-b border-black/10 dark:border-white/10">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C9A96E] mb-2 sm:mb-3 block">COLLECTION ARCHIVE</span>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif text-neutral-900 dark:text-[#FAFAF9] tracking-tight mb-3 sm:mb-4">
          {collectionName}
        </h1>
        <p className="text-neutral-600 dark:text-[#A8A29E] max-w-2xl text-xs sm:text-sm leading-relaxed">
          Explore the curated {collectionName.toLowerCase()} capsule featuring premium contemporary streetwear tailored for modern life.
        </p>
      </div>

      <ProductGrid products={products} />
    </div>
  );
}

import { Suspense } from 'react';
import ProductGrid from '@/components/product/ProductGrid';
import ShopFilters from '@/components/product/ShopFilters';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { prisma } from '@/lib/prisma';
import { sampleProducts } from '@/lib/sample-data';

export const metadata = {
  title: 'Shop All | ANTHO',
  description: 'Shop the latest premium streetwear from ANTHO.',
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;
  
  let products: any[] = [];
  try {
    products = await prisma.product.findMany({
      where: {
        isPublished: true,
        ...(category ? { category } : {}),
      },
      include: {
        images: {
          orderBy: { position: 'asc' }
        },
        variants: true,
      },
      orderBy: { createdAt: 'desc' }
    });
  } catch (err) {
    // Graceful fallback to sample data
  }

  if (!products || products.length === 0) {
    products = category 
      ? (sampleProducts.filter(p => p.category.toLowerCase() === category.toLowerCase()) as any)
      : (sampleProducts as any);
  }

  const breadcrumbs = category
    ? [{ label: 'Shop', href: '/shop' }, { label: category }]
    : [{ label: 'Shop' }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 md:pt-32">
      <Breadcrumbs items={breadcrumbs} className="mb-8" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-serif text-neutral-900 dark:text-white tracking-[0.05em] mb-2 uppercase">
            {category || 'Shop All'}
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-xs tracking-widest uppercase">
            {products.length} {products.length === 1 ? 'Piece' : 'Pieces'}
          </p>
        </div>
        <Suspense fallback={<div className="text-stone-500 uppercase tracking-widest text-xs">Loading...</div>}>
          <ShopFilters />
        </Suspense>
      </div>
      
      <ProductGrid products={products} />
    </div>
  );
}

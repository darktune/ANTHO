import { Suspense } from 'react';
import ProductGrid from '@/components/product/ProductGrid';
import ShopFilters from '@/components/product/ShopFilters';
import { prisma } from '@/lib/prisma';

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
  
  const products = await prisma.product.findMany({
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 md:pt-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
        <div>
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-[0.05em] mb-4 uppercase">Shop</h1>
          <p className="text-stone-400 text-sm tracking-widest uppercase">{products.length} Products</p>
        </div>
        <Suspense fallback={<div className="text-stone-500 uppercase tracking-widest text-xs">Loading...</div>}>
          <ShopFilters />
        </Suspense>
      </div>
      
      <ProductGrid products={products} />
    </div>
  );
}

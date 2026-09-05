import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import RelatedProducts from '@/components/product/RelatedProducts';
import { sampleProducts } from '@/lib/sample-data';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const product = sampleProducts.find(p => p.slug === resolvedParams.slug);
  return {
    title: product ? `${product.name} | ANTHO` : `${resolvedParams.slug} | ANTHO`,
    description: product?.description || 'Premium streetwear piece designed in Lagos.',
  };
}

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params;
  
  let dbProduct = null;
  try {
    dbProduct = await prisma.product.findUnique({
      where: { slug: resolvedParams.slug },
      include: {
        images: { orderBy: { position: 'asc' } },
        variants: true,
      },
    });
  } catch (err) {
    // Graceful fallback to sample data
  }

  const product = dbProduct || sampleProducts.find(p => p.slug === resolvedParams.slug) || sampleProducts[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28 md:pt-36">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-xs tracking-widest uppercase text-neutral-400 mb-8">
        <Link href="/" className="hover:text-[#FAFAF9] transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 mx-2 text-neutral-600" />
        <Link href="/shop" className="hover:text-[#FAFAF9] transition-colors">Shop</Link>
        <ChevronRight className="w-3.5 h-3.5 mx-2 text-neutral-600" />
        <span className="text-[#C9A96E] truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </div>

      <div className="mt-24 border-t border-white/10 pt-16">
        <RelatedProducts products={sampleProducts.slice(0, 4)} currentProductId={product.id} />
      </div>
    </div>
  );
}

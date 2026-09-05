import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import RelatedProducts from '@/components/product/RelatedProducts';
import { sampleProducts } from '@/lib/sample-data';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  return {
    title: `${resolvedParams.slug} | ANTHO`,
  };
}

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params;
  const product = sampleProducts.find(p => p.slug === resolvedParams.slug) || {
    ...sampleProducts[0],
    name: 'Sample Product',
    slug: resolvedParams.slug,
    description: 'Premium streetwear piece designed in Lagos.',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-[#A8A29E] mb-8">
        <Link href="/" className="hover:text-[#FAFAF9]">Home</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href="/shop" className="hover:text-[#FAFAF9]">Shop</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-[#FAFAF9]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </div>

      <div className="mt-20 border-t border-[#A8A29E]/30 pt-12">
        <RelatedProducts products={sampleProducts.slice(0,4)} currentProductId={product.id} />
      </div>
    </div>
  );
}

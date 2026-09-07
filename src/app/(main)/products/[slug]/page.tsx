import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import RelatedProducts from '@/components/product/RelatedProducts';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { sampleProducts } from '@/lib/sample-data';
import { prisma } from '@/lib/prisma';

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

  const breadcrumbs = [
    { label: 'Shop', href: '/shop' },
    ...(product.category ? [{ label: product.category, href: `/shop?category=${encodeURIComponent(product.category)}` }] : []),
    { label: product.name },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28 md:pt-36">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} className="mb-8" />

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

import type { Metadata } from 'next';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import RelatedProducts from '@/components/product/RelatedProducts';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { sampleProducts } from '@/lib/sample-data';
import { prisma } from '@/lib/prisma';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.anthosyllogi.xyz';

  let product = sampleProducts.find(p => p.slug === resolvedParams.slug);
  try {
    const dbProduct = await prisma.product.findUnique({
      where: { slug: resolvedParams.slug },
      include: { images: { orderBy: { position: 'asc' } } },
    });
    if (dbProduct) product = dbProduct as any;
  } catch (err) {}

  if (!product) {
    return {
      title: 'Piece Not Found | ANTHO',
      description: 'The requested archival garment could not be found in the current drop.',
    };
  }

  const title = `${product.name} | ANTHO`;
  const description = product.description || `Explore ${product.name}. Contemporary luxury Nigerian streetwear tailored in Lagos.`;
  const imageUrl = product.images?.[0]?.url 
    ? (product.images[0].url.startsWith('http') ? product.images[0].url : `${siteUrl}${product.images[0].url}`)
    : `${siteUrl}/images/antho-shoot/IMG_3806.JPG`;

  return {
    title,
    description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: `${siteUrl}/products/${product.slug}`,
      siteName: 'ANTHO',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 1600,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@antho_ng',
    },
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

  const breadcrumbSchemaItems = [
    { name: 'Home', url: '/' },
    { name: 'Shop', url: '/shop' },
    ...(product.category ? [{ name: product.category, url: `/shop?category=${encodeURIComponent(product.category)}` }] : []),
    { name: product.name, url: `/products/${product.slug}` },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pt-20 sm:pt-28 md:pt-36">
      {/* Schema.org Structured Data */}
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd items={breadcrumbSchemaItems} />

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} className="mb-6 sm:mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </div>

      <div className="mt-16 sm:mt-24 border-t border-black/10 dark:border-white/10 pt-12 sm:pt-16">
        <RelatedProducts products={sampleProducts.slice(0, 4)} currentProductId={product.id} />
      </div>
    </div>
  );
}

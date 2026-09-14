import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.anthosyllogi.xyz';

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/shop',
          '/products/',
          '/collections/',
          '/lookbook',
          '/events',
          '/about',
          '/contact',
          '/shipping-returns',
          '/faq',
        ],
        disallow: [
          '/admin/',
          '/admin',
          '/api/',
          '/checkout',
          '/orders/',
          '/login',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/admin',
          '/api/',
          '/checkout',
          '/orders/',
          '/login',
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

import React from 'react';

interface JsonLdProps {
  id?: string;
  data: Record<string, any>;
}

export default function JsonLd({ id, data }: JsonLdProps) {
  const scriptId = id || (data?.['@type'] ? `jsonld-${String(data['@type']).toLowerCase()}` : 'jsonld-schema');
  return (
    <script
      id={scriptId}
      key={scriptId}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      suppressHydrationWarning
    />
  );
}

export function OrganizationJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.anthosyllogi.xyz';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FashionBrand',
    name: 'ANTHO',
    alternateName: ['ANTHO Syllogi', 'ANTHO Nigeria'],
    url: siteUrl,
    logo: `${siteUrl}/images/logos/antho-emblem-dark.png`,
    description: 'Contemporary Nigerian luxury streetwear brand blending architectural silhouettes with cultural roots.',
    foundingLocation: {
      '@type': 'Place',
      name: 'Lagos, Nigeria'
    },
    sameAs: [
      'https://www.instagram.com/antho.syllogi',
      'https://x.com/syllogiantho?s=21',
      'https://www.tiktok.com/@antho.syllogi',
      'https://snapchat.com/t/yXLe7p2I'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+2348000000000',
      contactType: 'customer concierge',
      areaServed: ['NG', 'Worldwide'],
      availableLanguage: ['en']
    }
  };

  return <JsonLd id="jsonld-organization" data={schema} />;
}

export function WebSiteJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.anthosyllogi.xyz';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ANTHO — Syllogi',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/shop?category={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  return <JsonLd id="jsonld-website" data={schema} />;
}

export function ProductJsonLd({ product }: { product: any }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.anthosyllogi.xyz';
  const priceInNaira = (product.price / 100).toFixed(2);
  const imageUrl = product.images?.[0]?.url 
    ? (product.images[0].url.startsWith('http') ? product.images[0].url : `${siteUrl}${product.images[0].url}`)
    : `${siteUrl}/images/antho-shoot/IMG_3806.JPG`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images?.map((img: any) => 
      img.url.startsWith('http') ? img.url : `${siteUrl}${img.url}`
    ) || [imageUrl],
    description: product.description || `${product.name} by ANTHO. Contemporary Nigerian Streetwear.`,
    sku: product.id || product.slug,
    brand: {
      '@type': 'Brand',
      name: 'ANTHO'
    },
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/products/${product.slug}`,
      priceCurrency: 'NGN',
      price: priceInNaira,
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'ANTHO'
      }
    }
  };

  return <JsonLd id={`jsonld-product-${product.slug || product.id || 'current'}`} data={schema} />;
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url?: string }[] }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.anthosyllogi.xyz';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? (item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`) : undefined
    }))
  };

  return <JsonLd id="jsonld-breadcrumbs" data={schema} />;
}

export function EventJsonLd({ event }: { event: any }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.anthosyllogi.xyz';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: '2026-06-12T10:00:00+01:00',
    endDate: '2026-06-14T20:00:00+01:00',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: event.venue || 'Student Activity Center',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Covenant University Campus',
        addressLocality: 'Ota',
        addressRegion: 'Ogun State',
        addressCountry: 'NG'
      }
    },
    image: `${siteUrl}/images/antho-shoot/IMG_3806.JPG`,
    description: event.summary,
    organizer: {
      '@type': 'Organization',
      name: 'ANTHO',
      url: siteUrl
    }
  };

  return <JsonLd id={`jsonld-event-${event.id || 'current'}`} data={schema} />;
}

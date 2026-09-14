import type { Product } from '@/types';

export const sampleProducts: Product[] = [
  // 1. Classic ANTHO Polo (1 item)
  {
    id: 'prod-polo-1',
    name: 'Classic ANTHO Pique Polo (Onyx Black)',
    slug: 'classic-antho-pique-polo-black',
    description: 'Heavyweight pique cotton polo featuring custom embroidery, relaxed boxy drape, and authentic mother-of-pearl buttons. Hand-finished in Lagos with signature architectural lines.',
    price: 3800000,
    compareAtPrice: 4500000,
    category: 'Classic ANTHO Polos',
    materials: '100% Combed Pique Cotton (280gsm)',
    careInstructions: 'Machine wash cold. Hang dry in shade.',
    isPublished: true,
    isFeatured: true,
    isBestSeller: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    images: [
      { id: 'img-p1-1', url: '/images/products/polos/photo_1_2026-09-04_09-11-37.jpg', alt: 'Classic ANTHO Pique Polo Front View', position: 0 },
      { id: 'img-p1-2', url: '/images/products/polos/Snapchat-1079248294.jpg', alt: 'Classic ANTHO Pique Polo Collar Detail', position: 1 },
      { id: 'img-p1-3', url: '/images/products/polos/Snapchat-848713023.jpg', alt: 'Classic ANTHO Pique Polo Lifestyle', position: 2 },
    ],
    variants: [
      { id: 'v-p1-s', size: 'S', color: 'Onyx Black', colorHex: '#0A0A0A', stock: 12 },
      { id: 'v-p1-m', size: 'M', color: 'Onyx Black', colorHex: '#0A0A0A', stock: 20 },
      { id: 'v-p1-l', size: 'L', color: 'Onyx Black', colorHex: '#0A0A0A', stock: 15 },
      { id: 'v-p1-xl', size: 'XL', color: 'Onyx Black', colorHex: '#0A0A0A', stock: 8 },
    ],
  },

  // 2. ANTHO Sweatpants (1 item)
  {
    id: 'prod-sweat-1',
    name: 'ANTHO Heavyweight Fleece Sweatpants (Charcoal)',
    slug: 'antho-heavyweight-fleece-sweatpants-charcoal',
    description: '500gsm custom milled fleece sweatpants featuring deep welt pockets, hidden waist drawcords, and an intentional stacked fall over footwear. Built for durability and refined comfort.',
    price: 4800000,
    compareAtPrice: 5800000,
    category: 'ANTHO Sweatpants',
    materials: '100% French Terry Cotton (500gsm)',
    careInstructions: 'Machine wash cold inside out. Do not tumble dry.',
    isPublished: true,
    isFeatured: true,
    isBestSeller: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    images: [
      { id: 'img-s1-1', url: '/images/products/sweatpants/Snapchat-396574672.jpg', alt: 'ANTHO Heavyweight Sweatpants Front View', position: 0 },
      { id: 'img-s1-2', url: '/images/antho-shoot/IMG_3801.JPG', alt: 'ANTHO Sweatpants Tailored Fit', position: 1 },
      { id: 'img-s1-3', url: '/images/antho-shoot/IMG_3805.JPG', alt: 'ANTHO Sweatpants Lifestyle', position: 2 },
    ],
    variants: [
      { id: 'v-s1-s', size: 'S', color: 'Charcoal', colorHex: '#2A2A2A', stock: 8 },
      { id: 'v-s1-m', size: 'M', color: 'Charcoal', colorHex: '#2A2A2A', stock: 18 },
      { id: 'v-s1-l', size: 'L', color: 'Charcoal', colorHex: '#2A2A2A', stock: 14 },
      { id: 'v-s1-xl', size: 'XL', color: 'Charcoal', colorHex: '#2A2A2A', stock: 6 },
    ],
  },

  // 3. ANTHO Graphic Tee 1 (Tee 1 of 2)
  {
    id: 'prod-tee-1',
    name: 'ANTHO "God Is The Greatest" Heavyweight Tee',
    slug: 'antho-god-is-the-greatest-graphic-tee',
    description: 'Signature 300gsm heavyweight boxy tee with archival high-density silk-screen insignia. Pre-shrunk cotton featuring dropped shoulders and custom ribbed neckline.',
    price: 3200000,
    compareAtPrice: 3800000,
    category: 'ANTHO Graphic Tees',
    materials: '100% Heavyweight Combed Cotton (300gsm)',
    careInstructions: 'Wash cold inside out. Do not iron print.',
    isPublished: true,
    isFeatured: true,
    isBestSeller: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    images: [
      { id: 'img-t1-1', url: '/images/products/tees/Snapchat-1522984318.jpg', alt: 'God Is The Greatest Tee Front View', position: 0 },
      { id: 'img-t1-2', url: '/images/products/tees/Snapchat-1782284509.jpg', alt: 'God Is The Greatest Tee Graphic Detail', position: 1 },
      { id: 'img-t1-3', url: '/images/products/tees/Snapchat-903653531.jpg', alt: 'God Is The Greatest Tee Model Fit', position: 2 },
    ],
    variants: [
      { id: 'v-t1-s', size: 'S', color: 'Vintage Black', colorHex: '#141414', stock: 15 },
      { id: 'v-t1-m', size: 'M', color: 'Vintage Black', colorHex: '#141414', stock: 25 },
      { id: 'v-t1-l', size: 'L', color: 'Vintage Black', colorHex: '#141414', stock: 20 },
      { id: 'v-t1-xl', size: 'XL', color: 'Vintage Black', colorHex: '#141414', stock: 10 },
    ],
  },

  // 4. ANTHO Graphic Tee 2 (Tee 2 of 2)
  {
    id: 'prod-tee-2',
    name: 'ANTHO Lagos Archival Graphic Tee (Vintage Black)',
    slug: 'antho-lagos-archival-graphic-tee',
    description: 'Custom pigment-dyed boxy graphic tee honoring contemporary Lagos street culture. Reinforced double-stitched hem and tonal neck nape cross embroidery.',
    price: 3200000,
    compareAtPrice: 3600000,
    category: 'ANTHO Graphic Tees',
    materials: '100% Ring-Spun Cotton (300gsm)',
    careInstructions: 'Machine wash cold inside out.',
    isPublished: true,
    isFeatured: true,
    isBestSeller: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    images: [
      { id: 'img-t2-1', url: '/images/products/tees/Snapchat-617620438.jpg', alt: 'ANTHO Lagos Archival Tee Front View', position: 0 },
      { id: 'img-t2-2', url: '/images/products/tees/Snapchat-903653531.jpg', alt: 'ANTHO Lagos Archival Tee Back Graphic', position: 1 },
      { id: 'img-t2-3', url: '/images/antho-shoot/IMG_3803.JPG', alt: 'ANTHO Lagos Archival Tee Editorial Fit', position: 2 },
    ],
    variants: [
      { id: 'v-t2-s', size: 'S', color: 'Charcoal Wash', colorHex: '#262626', stock: 12 },
      { id: 'v-t2-m', size: 'M', color: 'Charcoal Wash', colorHex: '#262626', stock: 18 },
      { id: 'v-t2-l', size: 'L', color: 'Charcoal Wash', colorHex: '#262626', stock: 16 },
      { id: 'v-t2-xl', size: 'XL', color: 'Charcoal Wash', colorHex: '#262626', stock: 8 },
    ],
  },
];

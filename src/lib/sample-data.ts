import type { Product } from '@/types';

// ==========================================
// 1. ACTIVE LAUNCH DROP (5 PURCHASABLE PIECES)
// ==========================================
export const launchProducts: Product[] = [
  // 1. Red Christos Polo (₦35,000)
  {
    id: 'red-christos-polo',
    name: 'ANTHO RED CHRISTOS POLO',
    slug: 'red-christos-polo',
    description: 'Signature architectural boxy pique polo in rich crimson red featuring a contrast black collar, mother-of-pearl buttons, and bespoke Christos script embroidery. Engineered for contemporary youth streetwear drape.',
    price: 3500000,
    category: 'Christos Polos',
    materials: '100% Combed Pique Cotton (280gsm)',
    careInstructions: 'Machine wash cold inside out. Hang dry in shade.',
    isPublished: true,
    isFeatured: true,
    isBestSeller: true,
    isSoldOut: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    images: [
      { id: 'img-rcp-0', url: '/images/products/cutouts/red-christos-cutout.webp', alt: 'ANTHO Red Christos Polo Studio Flatlay Cutout', position: 0 },
      { id: 'img-rcp-1', url: '/images/products/polos/red-christos-model.webp', alt: 'ANTHO Red Christos Polo Editorial Drape Model', position: 1 },
      { id: 'img-rcp-2', url: '/images/products/polos/red-christos-front.webp', alt: 'ANTHO Red Christos Polo Architectural Front Cut', position: 2 },
      { id: 'img-rcp-3', url: '/images/products/polos/red-christos-detail.webp', alt: 'ANTHO Red Christos Polo Collar & Hardware Detail', position: 3 },
      { id: 'img-rcp-4', url: '/images/products/polos/red-christos-back.webp', alt: 'ANTHO Red Christos Polo Silhouette Form', position: 4 },
    ],
    variants: [
      { id: 'v-rcp-s', size: 'S', color: 'Crimson Red', colorHex: '#DC2626', stock: 15 },
      { id: 'v-rcp-m', size: 'M', color: 'Crimson Red', colorHex: '#DC2626', stock: 25 },
      { id: 'v-rcp-l', size: 'L', color: 'Crimson Red', colorHex: '#DC2626', stock: 20 },
      { id: 'v-rcp-xl', size: 'XL', color: 'Crimson Red', colorHex: '#DC2626', stock: 10 },
    ],
  },

  // 2. White Christos Polo (₦35,000)
  {
    id: 'white-christos-polo',
    name: 'ANTHO WHITE CHRISTOS POLO',
    slug: 'white-christos-polo',
    description: 'Crisp optic white pique polo crafted from 280gsm combed cotton. Features bespoke Christos atelier script embroidery, structured contrast black ribbed collar, and genuine mother-of-pearl button placket.',
    price: 3500000,
    category: 'Christos Polos',
    materials: '100% Combed Pique Cotton (280gsm)',
    careInstructions: 'Machine wash cold. Do not bleach. Hang dry.',
    isPublished: true,
    isFeatured: true,
    isBestSeller: true,
    isSoldOut: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    images: [
      { id: 'img-wcp-0', url: '/images/products/cutouts/white-christos-cutout.webp', alt: 'ANTHO White Christos Polo Studio Flatlay Cutout', position: 0 },
      { id: 'img-wcp-1', url: '/images/products/polos/white-christos-duo.webp', alt: 'ANTHO White Christos Polo Duo Editorial Model', position: 1 },
      { id: 'img-wcp-2', url: '/images/products/polos/white-christos-front.webp', alt: 'ANTHO White Christos Polo Architectural Front', position: 2 },
      { id: 'img-wcp-3', url: '/images/products/polos/Snapchat-1079248294.jpg', alt: 'ANTHO White Christos Polo Crest & Details', position: 3 },
      { id: 'img-wcp-4', url: '/images/products/polos/Snapchat-848713023.jpg', alt: 'ANTHO White Christos Polo 99 Back View', position: 4 },
    ],
    variants: [
      { id: 'v-wcp-s', size: 'S', color: 'Optic White', colorHex: '#FAFAF9', stock: 15 },
      { id: 'v-wcp-m', size: 'M', color: 'Optic White', colorHex: '#FAFAF9', stock: 25 },
      { id: 'v-wcp-l', size: 'L', color: 'Optic White', colorHex: '#FAFAF9', stock: 20 },
      { id: 'v-wcp-xl', size: 'XL', color: 'Optic White', colorHex: '#FAFAF9', stock: 10 },
    ],
  },

  // 3. Black Christos Polo (₦35,000)
  {
    id: 'black-christos-polo',
    name: 'ANTHO BLACK CHRISTOS POLO',
    slug: 'black-christos-polo',
    description: 'Deep onyx black boxy polo tailored in 280gsm combed pique cotton. Features high-definition Christos atelier script embroidery, reinforced collar ribs, and tonal mother-of-pearl buttons.',
    price: 3500000,
    category: 'Christos Polos',
    materials: '100% Combed Pique Cotton (280gsm)',
    careInstructions: 'Machine wash cold inside out. Hang dry in shade.',
    isPublished: true,
    isFeatured: true,
    isBestSeller: true,
    isSoldOut: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    images: [
      { id: 'img-bcp-0', url: '/images/products/cutouts/black-christos-cutout.webp', alt: 'ANTHO Black Christos Polo Studio Flatlay Cutout', position: 0 },
      { id: 'img-bcp-1', url: '/images/products/polos/black-christos-full.webp', alt: 'ANTHO Black Christos Polo Street Attitude Model', position: 1 },
      { id: 'img-bcp-2', url: '/images/products/polos/black-christos-front.webp', alt: 'ANTHO Black Christos Polo Studio Still', position: 2 },
      { id: 'img-bcp-3', url: '/images/products/polos/black-christos-pose.webp', alt: 'ANTHO Black Christos Polo Editorial Drape', position: 3 },
      { id: 'img-bcp-4', url: '/images/products/polos/black-christos-detail.webp', alt: 'ANTHO Black Christos Polo Hardware Detail', position: 4 },
    ],
    variants: [
      { id: 'v-bcp-s', size: 'S', color: 'Onyx Black', colorHex: '#0A0A0A', stock: 15 },
      { id: 'v-bcp-m', size: 'M', color: 'Onyx Black', colorHex: '#0A0A0A', stock: 25 },
      { id: 'v-bcp-l', size: 'L', color: 'Onyx Black', colorHex: '#0A0A0A', stock: 20 },
      { id: 'v-bcp-xl', size: 'XL', color: 'Onyx Black', colorHex: '#0A0A0A', stock: 10 },
    ],
  },

  // 4. Black Long-Sleeve Christos Polo (₦35,000)
  {
    id: 'black-longsleeve-christos-polo',
    name: 'ANTHO BLACK LONG-SLEEVE CHRISTOS POLO',
    slug: 'black-longsleeve-christos-polo',
    description: 'Architectural long-sleeve polo in heavyweight combed pique cotton with extended ribbed cuffs, subtle wrist taper, bespoke Christos embroidery, and clean silhouette lines.',
    price: 3500000,
    category: 'Christos Polos',
    materials: '100% Combed Pique Cotton (280gsm)',
    careInstructions: 'Machine wash cold inside out. Reshape while damp.',
    isPublished: true,
    isFeatured: true,
    isBestSeller: true,
    isSoldOut: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    images: [
      { id: 'img-blscp-0', url: '/images/products/cutouts/black-longsleeve-cutout.webp', alt: 'ANTHO Black Long-Sleeve Christos Polo Studio Flatlay Cutout', position: 0 },
      { id: 'img-blscp-1', url: '/images/products/polos/black-longsleeve-front.webp', alt: 'ANTHO Black Long-Sleeve Christos Polo Model Front', position: 1 },
      { id: 'img-blscp-2', url: '/images/products/polos/black-longsleeve-editorial.webp', alt: 'ANTHO Black Long-Sleeve Christos Polo Studio Cut', position: 2 },
      { id: 'img-blscp-3', url: '/images/products/polos/black-longsleeve-detail.webp', alt: 'ANTHO Black Long-Sleeve Christos Polo Silhouette Detail', position: 3 },
    ],
    variants: [
      { id: 'v-blscp-s', size: 'S', color: 'Onyx Black', colorHex: '#0A0A0A', stock: 12 },
      { id: 'v-blscp-m', size: 'M', color: 'Onyx Black', colorHex: '#0A0A0A', stock: 20 },
      { id: 'v-blscp-l', size: 'L', color: 'Onyx Black', colorHex: '#0A0A0A', stock: 15 },
      { id: 'v-blscp-xl', size: 'XL', color: 'Onyx Black', colorHex: '#0A0A0A', stock: 8 },
    ],
  },

  // 5. Independence Graphic Tee (Black) (₦17,999)
  {
    id: 'independence-tee-black',
    name: 'ANTHO INDEPENDENCE GRAPHIC TEE',
    slug: 'independence-tee-black',
    description: 'Commemorative Nigerian Independence streetwear graphic tee in onyx black. Crafted from 300gsm heavyweight combed cotton with high-density silkscreen graphics, custom dropped shoulders, and reinforced ribbed collar.',
    price: 1799900,
    category: 'Independence Series',
    materials: '100% Heavyweight Cotton (300gsm)',
    careInstructions: 'Machine wash cold inside out. Do not iron print directly.',
    isPublished: true,
    isFeatured: true,
    isBestSeller: true,
    isSoldOut: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    images: [
      { id: 'img-itb-0', url: '/images/products/cutouts/independence-tee-cutout.webp', alt: 'ANTHO Independence Graphic Tee Studio Flatlay Cutout', position: 0 },
      { id: 'img-itb-1', url: '/images/global_black/IMG_6693.JPEG', alt: 'ANTHO Independence Graphic Tee Model Silkscreen Detail', position: 1 },
      { id: 'img-itb-2', url: '/images/global_black/global_black_BACK.png', alt: 'ANTHO Independence Graphic Tee Back Insignia', position: 2 },
      { id: 'img-itb-3', url: '/images/global_black/front_glbl.png', alt: 'ANTHO Independence Graphic Tee Front Chest Detail', position: 3 },
    ],
    variants: [
      { id: 'v-itb-s', size: 'S', color: 'Onyx Black', colorHex: '#0A0A0A', stock: 20 },
      { id: 'v-itb-m', size: 'M', color: 'Onyx Black', colorHex: '#0A0A0A', stock: 35 },
      { id: 'v-itb-l', size: 'L', color: 'Onyx Black', colorHex: '#0A0A0A', stock: 30 },
      { id: 'v-itb-xl', size: 'XL', color: 'Onyx Black', colorHex: '#0A0A0A', stock: 15 },
    ],
  },
];

// ==========================================
// 2. ARCHIVED CAPSULE PIECES (VAULTED & SOLD OUT)
// No price tags displayed. Cannot be purchased.
// ==========================================
export const archivedProducts: Product[] = [
  // 6. ANTHO Prevails Tee (Archived / Sold Out)
  {
    id: 'antho-prevails-tee',
    name: 'ANTHO PREVAILS TEE',
    slug: 'antho-prevails-tee',
    description: 'Signature 300gsm heavyweight cotton tee featuring the iconic ANTHO PREVAILS artwork. High-density silkscreen print designed to endure heavy wear while retaining rich texture. Vaulted archival piece from Capsule 01.',
    price: 0,
    category: 'The Premier Launch',
    materials: '100% Heavyweight Cotton (300gsm)',
    careInstructions: 'Archival vault piece. Conservation care.',
    isPublished: true,
    isFeatured: false,
    isBestSeller: false,
    isSoldOut: true,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date(),
    images: [
      { id: 'img-apt-1', url: '/images/gridimg/white_prevails.png', alt: 'ANTHO Prevails Tee White Archival Flatlay', position: 0 },
      { id: 'img-apt-2', url: '/images/white_prevails/IMG_6714.JPEG', alt: 'ANTHO Prevails Tee White Model Editorial', position: 1 },
      { id: 'img-apt-3', url: '/images/gridimg/black_prevails.png', alt: 'ANTHO Prevails Tee Black Archival Flatlay', position: 2 },
      { id: 'img-apt-4', url: '/images/black_prevails/IMG_4911.jpg', alt: 'ANTHO Prevails Tee Black Street Style Model', position: 3 },
    ],
    variants: [
      { id: 'v-apt-s', size: 'Archival', color: 'Optic White', colorHex: '#FAFAF9', stock: 0 },
      { id: 'v-apt-m', size: 'Archival', color: 'Onyx Black', colorHex: '#0A0A0A', stock: 0 },
    ],
  },

  // 7. ANTHO Global Tee (Archived / Sold Out)
  {
    id: 'antho-global-tee',
    name: 'ANTHO GLOBAL TEE',
    slug: 'antho-global-tee',
    description: '300gsm heavyweight boxy tee with iconic ANTHO Syllogi global insignia print. Custom dropped shoulders, reinforced ribbed neckline, and relaxed drape tailored for contemporary streetwear styling. Vaulted archival piece.',
    price: 0,
    category: 'Global Prevails',
    materials: '100% Heavyweight Combed Cotton (300gsm)',
    careInstructions: 'Archival vault piece. Conservation care.',
    isPublished: true,
    isFeatured: false,
    isBestSeller: false,
    isSoldOut: true,
    createdAt: new Date('2025-02-01'),
    updatedAt: new Date(),
    images: [
      { id: 'img-agt-1', url: '/images/gridimg/global_tee.png', alt: 'ANTHO Global Tee Insignia View', position: 0 },
      { id: 'img-agt-2', url: '/images/global_white/IMG_6580.JPEG', alt: 'ANTHO Global Tee White Model Editorial', position: 1 },
      { id: 'img-agt-3', url: '/images/global_white/IMG_6727.JPEG', alt: 'ANTHO Global Tee Model Form', position: 2 },
      { id: 'img-agt-4', url: '/images/global_black/IMG_6550.jpg', alt: 'ANTHO Global Tee Black Editorial', position: 3 },
    ],
    variants: [
      { id: 'v-agt-s', size: 'Archival', color: 'White / Black', colorHex: '#FAFAF9', stock: 0 },
    ],
  },

  // 8. ANTHO NPNG Sweatpants (Archived / Sold Out)
  {
    id: 'antho-npng-sweats',
    name: 'ANTHO NPNG SWEATPANTS',
    slug: 'antho-npng-sweats',
    description: '500gsm custom milled heavyweight fleece sweatpants featuring deep welt pockets, hidden waist drawcords, and an intentional stacked fall over sneakers. Streetwear fit engineered for youth and young adults. Vaulted archival piece.',
    price: 0,
    category: 'NPNG & Architectural Fleece',
    materials: '100% French Terry Cotton (500gsm)',
    careInstructions: 'Archival vault piece. Conservation care.',
    isPublished: true,
    isFeatured: false,
    isBestSeller: false,
    isSoldOut: true,
    createdAt: new Date('2025-03-01'),
    updatedAt: new Date(),
    images: [
      { id: 'img-ans-1', url: '/images/new-shoot/premier-launch-1.webp', alt: 'ANTHO NPNG Sweatpants Architectural Editorial Model', position: 0 },
      { id: 'img-ans-2', url: '/images/antho-shoot/IMG_3806.JPG', alt: 'ANTHO NPNG Sweatpants Cuff & Pocket Silhouette', position: 1 },
      { id: 'img-ans-3', url: '/images/new-shoot/premier-launch-3.webp', alt: 'ANTHO NPNG Sweatpants Studio Cut', position: 2 },
    ],
    variants: [
      { id: 'v-ans-s', size: 'Archival', color: 'Milled Heather', colorHex: '#78716C', stock: 0 },
    ],
  },

  // 9. ANTHO 99 Archival Polo (Archived / Sold Out)
  {
    id: 'antho-99-polo',
    name: 'ANTHO 99 ARCHIVAL POLO',
    slug: 'antho-99-polo',
    description: 'Architectural boxy pique polo featuring signature custom embroidery, relaxed drape, and authentic mother-of-pearl buttons. Crafted for the contemporary Lagos youth streetwear aesthetic. Vaulted archival piece.',
    price: 0,
    category: 'Lagos Archival Syndicate',
    materials: '100% Combed Pique Cotton (280gsm)',
    careInstructions: 'Archival vault piece. Conservation care.',
    isPublished: true,
    isFeatured: false,
    isBestSeller: false,
    isSoldOut: true,
    createdAt: new Date('2025-04-01'),
    updatedAt: new Date(),
    images: [
      { id: 'img-a99-1', url: '/images/slideshow/1.jpg', alt: 'ANTHO 99 Archival Polo Tradefair View', position: 0 },
      { id: 'img-a99-2', url: '/images/products/polos/photo_1_2026-09-04_09-11-37.jpg', alt: 'ANTHO 99 Archival Polo Model Silhouette', position: 1 },
      { id: 'img-a99-3', url: '/images/products/polos/Snapchat-1079248294.jpg', alt: 'ANTHO 99 Archival Polo Crest Detail', position: 2 },
      { id: 'img-a99-4', url: '/images/products/polos/Snapchat-848713023.jpg', alt: 'ANTHO 99 Archival Polo Back Number Form', position: 3 },
    ],
    variants: [
      { id: 'v-a99-s', size: 'Archival', color: 'White', colorHex: '#FAFAF9', stock: 0 },
    ],
  },
];

// Master Catalog: Active launch pieces first, then vaulted archival pieces
export const sampleProducts: Product[] = [
  ...launchProducts,
  ...archivedProducts,
];

# ANTHO System Architecture, Data Structures & HCI Design Specifications

---

## 1. System Overview & Architecture

ANTHO is a luxury youth and young adult streetwear commerce application built on Next.js 15 (App Router), React 19, Tailwind CSS, Prisma ORM, and Paystack Payment Gateway.

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Edge Middleware                  │
│  - Guard /admin/* with Web Crypto HMAC-SHA256 tokens       │
│  - Inject HSTS, CSP, X-Frame-Options, Permissions Policy    │
└──────────────────────────────┬──────────────────────────────┘
                               │
       ┌───────────────────────┴───────────────────────┐
       ▼                                               ▼
┌──────────────────────────────┐        ┌──────────────────────────────┐
│     Storefront Routes        │        │      Concierge Admin OS      │
│  - / (Homepage & Slideshow)  │        │  - /admin (Analytics Hub)    │
│  - /shop (4-Piece Catalog)   │        │  - /admin/orders             │
│  - /collections (4 Capsules) │        │  - /admin/products           │
│  - /lookbook (3 Acts)        │        │  - /admin/settings           │
│  - /events (2 Vault Folders) │        └──────────────────────────────┘
│  - /cart & /checkout         │
└──────────────┬───────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────┐
│                   Secure Server API Layer                   │
│  - /api/orders/create (Authoritative Price Recalculation)    │
│  - /api/paystack/callback (Strict Status Verification)      │
│  - /api/paystack/webhook (HMAC-SHA512 Signature Check)       │
│  - /api/auth/login (Cryptographic Token Generation)         │
│  - /api/contact & /api/newsletter (Zod Schema Validation)   │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. HCI & Visual Navigation Principles (20+ Years Practice)

The storefront navigation was overhauled from traditional text-heavy drop-downs into a visual-first navigation portal grounded in human-computer interaction (HCI) best practices:

1. **Recognition Over Recall (Nielsen Heuristic #6)**:
   - Fashion and streetwear shoppers make emotional and aesthetic decisions through imagery, silhouettes, and textile drape rather than reading abstract category labels.
   - Each primary section is represented by an authentic campaign thumbnail:
     - **Card 01 — Atelier Shop**: `/images/gridimg/global_tee.png`
     - **Card 02 — Curated Capsules**: `/images/slideshow/4.JPEG`
     - **Card 03 — Editorial Lookbook**: `/images/slideshow/2.jpg`
     - **Card 04 — Vault Archives**: `/images/antho-shoot/IMG_3803.JPG`
2. **Miller's Law (Chunking to 4 Core Hubs)**:
   - Rather than displaying a disjointed list of 15 links, the information architecture is chunked into exactly 4 distinct pillars (Shop, Collections, Lookbook, Events), preventing cognitive overload.
3. **Deterministic Luxury Pricing**:
   - Discount badges and strikethrough compare-at prices degrade luxury brand prestige. Every product displays exactly one deterministic, unambiguous price.

---

## 3. Data Structures & Schema Architecture

### A. Product Catalog Model
All prices are stored and calculated strictly in **Kobo** (1 NGN = 100 Kobo) to prevent floating-point rounding errors:

```typescript
interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number; // In Kobo: 4500000 = ₦45,000
  category: 'Classic ANTHO Polos' | 'ANTHO Sweatpants' | 'ANTHO Graphic Tees';
  materials: string;
  careInstructions: string;
  isPublished: boolean;
  isFeatured: boolean;
  images: Array<{ id: string; url: string; alt: string; position: number }>;
  variants: Array<{ id: string; size: string; color: string; stock: number }>;
}
```

### B. Shipping Rate Matrix
Configured in `src/lib/constants.ts`:

```typescript
interface ShippingZone {
  state: string;
  cost: number; // In Kobo
  estimatedDays: string;
}

// 1. Covenant University (Campus drop / Tradefair pickup): ₦3,000 (300,000 kobo)
// 2. Lagos State & Ogun State (Courier dispatch): ₦6,500 (650,000 kobo)
// 3. Nationwide (All other 35 states): ₦9,000 (900,000 kobo)
```

---

## 4. Route Media Partitioning Strategy (Zero Clumping)

To guarantee that visitors continually discover new imagery on every screen, all 73 campaign photography assets are strictly partitioned across routes with zero clumping:

| Route / Module | Component File | Assigned Media Assets |
| :--- | :--- | :--- |
| **Homepage Hero** | [`MinimalShowcase.tsx`](file:///c:/Users/USER/OneDrive/Documents/antho/src/components/home/MinimalShowcase.tsx) | `slideshow/1.jpg`, `5.JPEG`, `7.JPEG`, `9.jpg`, `13.JPEG`, plus video reel |
| **Featured Capsule** | [`FeaturedCollection.tsx`](file:///c:/Users/USER/OneDrive/Documents/antho/src/components/home/FeaturedCollection.tsx) | `slideshow/3.JPEG` (*The Premier Launch*), `slideshow/8.jpg` (*Global Prevails*) |
| **Curated Capsules** | [`collections/page.tsx`](file:///c:/Users/USER/OneDrive/Documents/antho/src/app/(main)/collections/page.tsx) | `slideshow/6.JPEG`, `global_black/global_black_BACK.png`, `antho-shoot/IMG_3807.JPG`, `antho-shoot/IMG_3808.JPG` |
| **Editorial Lookbook** | [`lookbook/page.tsx`](file:///c:/Users/USER/OneDrive/Documents/antho/src/app/(main)/lookbook/page.tsx) | 18 distinct stills: `slideshow/10.jpg`, `11.JPEG`, `12.jpg`, `global_white/` (IMG_6580, 6727, 4344), `global_black/` (IMG_6550, 4346, 6693), `white_prevails/` (IMG_6714, 6590, 6630, 6598), `black_prevails/` (IMG_4911, 6704, 6715, 6594), `antho-shoot/IMG_3806.JPG` |
| **Archival Vaults** | [`EventArchiveFolder.tsx`](file:///c:/Users/USER/OneDrive/Documents/antho/src/components/events/EventArchiveFolder.tsx) | `global_black/IMG_6729.JPEG`, `global_white/IMG_6733.JPEG`, `black_prevails/IMG_6738.JPEG` |
| **Navigation Portal** | [`MobileMenu.tsx`](file:///c:/Users/USER/OneDrive/Documents/antho/src/components/layout/MobileMenu.tsx) | `gridimg/global_tee.png`, `slideshow/4.JPEG`, `slideshow/2.jpg`, `antho-shoot/IMG_3803.JPG` |

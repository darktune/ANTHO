# ANTHO — Future Tasks & Production Roadmap

This roadmap compiles all future editorial edits, client reviews, catalog adjustments, performance optimizations, and feature enhancements for the ANTHO streetwear web platform.

---

## 1. Content & Editorial Copy
- [ ] **Collections Content**
  - **Files:** `src/lib/constants.ts`, `src/app/(main)/collections/page.tsx`, `src/app/(main)/collections/[slug]/page.tsx`
  - Update collection names, subtitle tags, product counts, and cover images (`Lagos Nights`, `Essentials`, `Heritage`, `New Arrivals`).
- [ ] **Lookbook Captions & Story Titles**
  - **File:** `src/app/(main)/lookbook/page.tsx`
  - Replace temporary titles (`Look 01 — Silk Fluidity`, etc.) with final creative director captions, 35mm film shoot notes, and photographer credits.
- [ ] **Events & Pop-Ups Content**
  - **Files:** `src/components/events/EventArchiveFolder.tsx`, `src/app/(main)/events/page.tsx`
  - Keep Covenant University Tradefair '26 updated with real social links, photo assets, and any upcoming pop-up dates (London Residency SS26).

---

## 2. Brand Contact, Concierge & Social Channels
- [ ] **Official Concierge Channels**
  - **Files:** `src/app/(main)/contact/page.tsx`, `src/app/(main)/shipping-returns/page.tsx`, `src/components/layout/Footer.tsx`
  - Update work email: Replace temporary emails with official domain inbox (e.g., `concierge@anthosyllogi.xyz` or `orders@anthosyllogi.xyz`).
  - Update WhatsApp concierge number in `.env` / `NEXT_PUBLIC_WHATSAPP_NUMBER`.
  - Update atelier physical address (e.g., private showroom in Victoria Island / Lekki, Lagos).
- [ ] **Social Media Links**
  - **Files:** `src/lib/constants.ts` (`SOCIAL_LINKS`), `src/components/ui/SocialIcons.tsx`
  - Verify official links for Instagram (`@antho.ng`), X / Twitter, and TikTok.

---

## 3. Client Approvals & Review Chores
- [ ] **Client FAQ Review**
  - **File:** `src/app/(main)/faq/page.tsx`
  - Client review on delivery timeframes, sizing guidelines, and payment clarity.
- [ ] **Personalized Drops & Inner Circle Newsletter Copy**
  - **File:** `src/components/layout/NewsletterForm.tsx`, `src/app/api/newsletter/route.ts`
  - Review welcome response copy and plan automated welcome emails for new subscribers.
- [ ] **Shipping & Returns Policy Review**
  - **Files:** `src/app/(main)/shipping-returns/page.tsx`, `src/components/product/ProductInfo.tsx`
  - Confirm all-sales-final policy, domestic delivery SLA (5–7 days), and transit damage claim procedures.
- [ ] **Universal Concierge Email Update**
  - Review all places referencing `info@antho.com` and replace with approved business email.

---

## 4. Product Catalog & Inventory Calibration
- [ ] **Item Counts & Selected Pieces**
  - **Files:** `src/lib/sample-data.ts`, `prisma/seed.ts`
  - **Graphic Tees (Exactly 2 items):** Choose official drop names, graphic concepts, and descriptions.
  - **Classic Polo (Exactly 1 item):** Choose official silhouette name, collar style, and fabric notes.
  - **Sweatpants (Exactly 1 item):** Set up single exclusive sweatpant silhouette with sizing and measurements.
- [ ] **Product Photography & Image Assignment**
  - Curate high-res primary and hover images for each of the 4 items from `public/images/antho-shoot/`.
- [ ] **Pricing Calibration**
  - Review and calibrate prices in Nigerian Naira (₦ in kobo) for tees, polo, and sweatpants.

---

## 5. Visual Identity, Iconography & Typography
- [ ] **Iconography & Animated Icons**
  - Custom SVG line icons with subtle hover/draw micro-animations for cart, filters, bag, and audio controls.
- [ ] **Brutalist / Rugged Typography Accents**
  - Integrate distressed or gaunted industrial display fonts for drop numbers, declassified stamps, and watermark accents.
- [ ] **Adaptive Theme Engine (Dark / Light / System Time-of-Day)**
  - **Files:** `src/stores/uiStore.ts`, `src/components/layout/Header.tsx`
  - Add third `System` mode that detects device preference or shifts based on local sunset/sunrise times.
  - Custom celestial / minimal glyph icons for Light, Dark, and Auto.

---

## 6. Optimization, Caching & Performance (0.1s – 2.0s SLA)
- [ ] **Edge Caching & Core Web Vitals**
  - Implement Next.js ISR (Incremental Static Regeneration) and stale-while-revalidate headers for shop and lookbook pages.
  - Route prefetching on viewport entry for instant sub-second page transitions.
- [ ] **Media Optimization & Storage Management**
  - Set up Cloudinary or Supabase Storage CDN for serving WebP/AVIF image formats and compressed H.264/WebM video streams.
  - Retain lossless archive masters while serving responsive compressed srcset thumbnails to mobile users.
- [ ] **Offline PWA / Low-Connectivity Fallback**
  - Service worker caching strategy (CacheFirst / StaleWhileRevalidate) for lookbook images, brand fonts, and core stylesheet assets.
  - Offline banner enabling users to browse cached editorial journals even during power or internet drops.
- [ ] **Asset Download Utility**
  - Add high-resolution "Save / Download Wallpaper" button for campaign imagery and editorial stills on the Lookbook and Product pages.

---

## 7. Strategic Customer Engagement & Auth Modals
- [ ] **High-Intent Sign-In / Join Modal**
  - **Tech:** Supabase Auth / Google One-Tap or native email sign-in.
  - **Trigger Conditions:**
    - User views 3+ pieces in a single session.
    - User lingers on lookbook for >45 seconds.
    - User adds their second item to the bag.
  - **Value Proposition:** Early drop access, VIP member discount codes, and saved shipping addresses.

---

## 8. Full Security Reviews, Testing & Documentation
- [ ] **Playwright End-to-End Test Suite**
  - Complete automated browser test covering: Landing $\rightarrow$ Shop $\rightarrow$ Product Variant Selection $\rightarrow$ Bag $\rightarrow$ Checkout Form $\rightarrow$ Paystack Redirect $\rightarrow$ Callback Confirmation.
- [ ] **Security & Payment Audits**
  - Validate Paystack webhook HMAC-SHA512 verification under high concurrency.
  - Rate limiting on `/api/orders/create` and `/api/contact` using Upstash Redis or memory token bucket.
  - Content Security Policy (CSP) and strict security headers in `next.config.ts`.
- [ ] **Comprehensive Documentation**
  - Admin operational manual, database migration runbook, and team handover guide.

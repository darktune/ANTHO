// ===== Product Types =====
export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  position: number;
  blurDataUrl?: string | null;
}

export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  colorHex: string;
  stock: number;
  sku?: string | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number; // kobo
  compareAtPrice?: number | null;
  category: string;
  materials?: string | null;
  careInstructions?: string | null;
  isPublished: boolean;
  isFeatured: boolean;
  isBestSeller: boolean;
  createdAt: Date;
  updatedAt: Date;
  variants: ProductVariant[];
  images: ProductImage[];
  collections?: CollectionBasic[];
}

export interface ProductBasic {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number | null;
  category: string;
  isFeatured: boolean;
  isBestSeller: boolean;
  images: ProductImage[];
  variants: ProductVariant[];
}

// ===== Collection Types =====
export interface Collection {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  isPublished: boolean;
  position: number;
}

export interface CollectionBasic {
  id: string;
  name: string;
  slug: string;
}

export interface CollectionWithProducts extends Collection {
  products: { product: ProductBasic }[];
}

// ===== Cart Types =====
export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  imageUrl: string;
  size: string;
  color: string;
  colorHex: string;
  quantity: number;
  maxStock: number;
  variantId: string;
}

// ===== Order Types =====
export interface OrderItem {
  id: string;
  productName: string;
  productSlug: string;
  variant: string;
  quantity: number;
  price: number;
  imageUrl?: string | null;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: string;
  subtotal: number;
  shippingCost: number;
  total: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  paymentRef?: string | null;
  paymentStatus: string;
  paymentMethod?: string | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
  items: OrderItem[];
}

// ===== Site Content Types =====
export interface SiteContent {
  key: string;
  value: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  mobileImageUrl?: string;
}

export interface BrandStoryContent {
  heading: string;
  body: string;
  imageUrl: string;
}

// ===== Filter Types =====
export interface ProductFilters {
  category?: string;
  size?: string;
  color?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sort?: "newest" | "price-asc" | "price-desc" | "best-sellers";
  search?: string;
  page?: number;
}

// ===== Checkout Types =====
export interface CheckoutFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  notes?: string;
}

export interface ShippingZone {
  state: string;
  cost: number; // kobo
  estimatedDays: string;
}

// ===== Admin Types =====
export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  lowStockProducts: number;
  recentOrders: Order[];
}

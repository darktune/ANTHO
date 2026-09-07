import type { ShippingZone } from "@/types";

export const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
  "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
] as const;

export const SHIPPING_ZONES: ShippingZone[] = [
  { state: "Lagos", cost: 250000, estimatedDays: "1-2 business days" },
  { state: "FCT - Abuja", cost: 350000, estimatedDays: "2-3 business days" },
  { state: "Ogun", cost: 300000, estimatedDays: "2-3 business days" },
  { state: "Rivers", cost: 400000, estimatedDays: "3-5 business days" },
  { state: "Oyo", cost: 300000, estimatedDays: "2-4 business days" },
  { state: "Delta", cost: 400000, estimatedDays: "3-5 business days" },
  { state: "Enugu", cost: 400000, estimatedDays: "3-5 business days" },
  { state: "Kano", cost: 500000, estimatedDays: "4-6 business days" },
  { state: "Kaduna", cost: 500000, estimatedDays: "4-6 business days" },
];

// Default shipping for states not explicitly listed
export const DEFAULT_SHIPPING: ShippingZone = {
  state: "Other",
  cost: 450000,
  estimatedDays: "3-7 business days",
};

export const FREE_SHIPPING_THRESHOLD = 5000000; // ₦50,000 in kobo

export function getShippingCost(state: string): ShippingZone {
  return SHIPPING_ZONES.find((z) => z.state === state) || { ...DEFAULT_SHIPPING, state };
}

export const SIZE_CHART = {
  tops: [
    { size: "XS", chest: "32-34", length: "26", shoulders: "15" },
    { size: "S", chest: "34-36", length: "27", shoulders: "16" },
    { size: "M", chest: "38-40", length: "28", shoulders: "17" },
    { size: "L", chest: "42-44", length: "29", shoulders: "18" },
    { size: "XL", chest: "46-48", length: "30", shoulders: "19" },
    { size: "XXL", chest: "50-52", length: "31", shoulders: "20" },
  ],
  bottoms: [
    { size: "XS", waist: "26-28", hips: "34-36", inseam: "30" },
    { size: "S", waist: "28-30", hips: "36-38", inseam: "30" },
    { size: "M", waist: "30-32", hips: "38-40", inseam: "31" },
    { size: "L", waist: "32-34", hips: "40-42", inseam: "31" },
    { size: "XL", waist: "34-36", hips: "42-44", inseam: "32" },
    { size: "XXL", waist: "36-38", hips: "44-46", inseam: "32" },
  ],
} as const;

export const CATEGORIES = [
  "Classic ANTHO Polos",
  "ANTHO Sweatpants",
  "ANTHO Graphic Tees",
] as const;

export const PRODUCT_COLORS = [
  { name: "Black", hex: "#0A0A0A" },
  { name: "White", hex: "#FAFAF9" },
  { name: "Stone", hex: "#A8A29E" },
  { name: "Navy", hex: "#1E293B" },
  { name: "Olive", hex: "#4A5A3C" },
  { name: "Burgundy", hex: "#722F37" },
  { name: "Sand", hex: "#C2B280" },
  { name: "Brown", hex: "#5C4033" },
  { name: "Charcoal", hex: "#36454F" },
  { name: "Cream", hex: "#FFFDD0" },
] as const;

export const ORDER_STATUSES = [
  { value: "pending", label: "Pending", color: "text-yellow-500" },
  { value: "confirmed", label: "Confirmed", color: "text-blue-500" },
  { value: "processing", label: "Processing", color: "text-purple-500" },
  { value: "shipped", label: "Shipped", color: "text-indigo-500" },
  { value: "delivered", label: "Delivered", color: "text-green-500" },
  { value: "cancelled", label: "Cancelled", color: "text-red-500" },
] as const;

export const PAYMENT_STATUSES = [
  { value: "pending", label: "Pending", color: "text-yellow-500" },
  { value: "paid", label: "Paid", color: "text-green-500" },
  { value: "failed", label: "Failed", color: "text-red-500" },
] as const;

export const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = {
  shop: [
    { label: "All Products", href: "/shop" },
    { label: "Classic ANTHO Polos", href: "/shop?category=Classic+ANTHO+Polos" },
    { label: "ANTHO Sweatpants", href: "/shop?category=ANTHO+Sweatpants" },
    { label: "ANTHO Graphic Tees", href: "/shop?category=ANTHO+Graphic+Tees" },
  ],
  help: [
    { label: "Client FAQs", href: "/faq" },
    { label: "Shipping & Returns", href: "/shipping-returns" },
    { label: "Size Guide", href: "/faq" },
    { label: "Contact Concierge", href: "/contact" },
  ],
  company: [
    { label: "Collections", href: "/collections" },
    { label: "Editorial Lookbook", href: "/lookbook" },
    { label: "Events & Pop-Ups", href: "/events" },
  ],
} as const;

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/antho.ng",
  twitter: "https://x.com/antho_ng",
  tiktok: "https://tiktok.com/@antho.ng",
} as const;

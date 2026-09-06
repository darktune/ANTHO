import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(priceInKobo: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(priceInKobo / 100);
}

export const formatCurrency = formatPrice;

export function getUniqueSizes(variants: any[]): string[] {
  if (!variants) return [];
  const sizes = new Set(variants.map(v => v.size).filter(Boolean));
  return Array.from(sizes) as string[];
}

export function getUniqueColors(variants: any[]): any[] {
  if (!variants) return [];
  const colorsMap = new Map();
  variants.forEach(v => {
    if (v.color && v.colorHex && !colorsMap.has(v.color)) {
      colorsMap.set(v.color, { color: v.color, colorHex: v.colorHex });
    }
  });
  return Array.from(colorsMap.values());
}

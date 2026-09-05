'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SizeSelector from './SizeSelector';
import ColorSelector from './ColorSelector';
import { Minus, Plus, Share2, Check } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/stores/cartStore';
import { useUIStore } from '@/stores/uiStore';

export default function ProductInfo({ product }: { product: any }) {
  const router = useRouter();
  const { addItem } = useCartStore();
  const { openCartDrawer } = useUIStore();

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('M');
  const [color, setColor] = useState('Black');
  const [added, setAdded] = useState(false);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    { color: 'Black', colorHex: '#000000' },
    { color: 'White', colorHex: '#FFFFFF' },
    { color: 'Stone', colorHex: '#A8A29E' },
  ];

  const handleAddToCart = () => {
    const imageUrl = product.images?.[0]?.url || '/images/antho-shoot/IMG_3806.JPG';
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      imageUrl,
      size,
      color,
      colorHex: colors.find((c) => c.color === color)?.colorHex || '#000000',
      quantity,
      maxStock: 50,
      variantId: `${product.id}-${size}-${color}`,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    openCartDrawer();
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-serif text-[#FAFAF9] mb-2">{product.name}</h1>
        <div className="text-2xl text-[#FAFAF9]">
          {formatPrice ? formatPrice(product.price) : `₦${product.price / 100}`}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-[#A8A29E]">Color: {color}</span>
          </div>
          <ColorSelector colors={colors} selectedColor={color} onSelect={setColor} />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-[#A8A29E]">Size: {size}</span>
            <button className="text-xs text-[#A8A29E] underline">Size Guide</button>
          </div>
          <SizeSelector sizes={sizes} selectedSize={size} onSelect={setSize} variants={[]} />
        </div>

        <div>
          <span className="text-sm text-[#A8A29E] block mb-2">Quantity</span>
          <div className="flex items-center border border-[#A8A29E] rounded-md w-32">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 text-[#A8A29E] hover:text-white">
              <Minus className="w-4 h-4" />
            </button>
            <span className="flex-1 text-center text-[#FAFAF9]">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 text-[#A8A29E] hover:text-white">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-4">
        <button onClick={handleAddToCart} className="w-full bg-[#FAFAF9] text-[#0A0A0A] font-medium py-4 rounded-md hover:bg-white transition-colors">
          {added ? 'ADDED TO BAG' : 'ADD TO BAG'}
        </button>
        <button onClick={handleBuyNow} className="w-full bg-transparent border border-[#A8A29E] text-[#FAFAF9] font-medium py-4 rounded-md hover:border-white transition-colors">
          BUY NOW
        </button>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[#A8A29E]/30">
        <span className="text-sm text-green-500">In Stock</span>
        <button className="flex items-center gap-2 text-sm text-[#A8A29E] hover:text-white">
          <Share2 className="w-4 h-4" /> Share
        </button>
      </div>

      {/* Accordions */}
      <div className="mt-6 divide-y divide-[#A8A29E]/30 border-y border-[#A8A29E]/30">
        <details className="group py-4">
          <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-[#FAFAF9]">
            <span>Description</span>
            <span className="transition group-open:rotate-180">
              <Plus className="w-4 h-4" />
            </span>
          </summary>
          <div className="text-[#A8A29E] text-sm mt-3">
            {product.description || 'Premium product designed in Lagos.'}
          </div>
        </details>
        <details className="group py-4">
          <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-[#FAFAF9]">
            <span>Materials & Care</span>
            <span className="transition group-open:rotate-180">
              <Plus className="w-4 h-4" />
            </span>
          </summary>
          <div className="text-[#A8A29E] text-sm mt-3">
            100% Cotton. Machine wash cold.
          </div>
        </details>
        <details className="group py-4">
          <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-[#FAFAF9]">
            <span>Shipping & Returns</span>
            <span className="transition group-open:rotate-180">
              <Plus className="w-4 h-4" />
            </span>
          </summary>
          <div className="text-[#A8A29E] text-sm mt-3">
            Free shipping on orders over ₦100,000. Easy returns within 14 days.
          </div>
        </details>
      </div>
    </div>
  );
}

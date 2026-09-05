'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { CATEGORIES } from '@/lib/constants';

export default function ShopFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get('category');

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  };

  const removeQueryString = (name: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(name);
    return params.toString();
  };

  const handleCategoryClick = (category: string) => {
    if (currentCategory === category) {
      router.push(pathname + '?' + removeQueryString('category'), { scroll: false });
    } else {
      router.push(pathname + '?' + createQueryString('category', category), { scroll: false });
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-6 text-xs md:text-sm tracking-widest uppercase font-medium">
      <button 
        onClick={() => router.push(pathname, { scroll: false })}
        className={`transition-colors duration-300 ${!currentCategory ? 'text-white border-b border-white pb-1' : 'text-stone-500 hover:text-stone-300'}`}
      >
        All
      </button>
      {CATEGORIES.map((cat) => (
        <button 
          key={cat}
          onClick={() => handleCategoryClick(cat)}
          className={`transition-colors duration-300 ${currentCategory === cat ? 'text-white border-b border-white pb-1' : 'text-stone-500 hover:text-stone-300'}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

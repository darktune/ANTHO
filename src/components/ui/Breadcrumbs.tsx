'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const router = useRouter();

  // Find preceding item URL to navigate back through the path
  const previousItem = items.length > 1 ? items[items.length - 2] : null;
  const previousHref = previousItem?.href || (items.length > 0 ? '/' : null);

  const handleLastClick = (item: BreadcrumbItem) => {
    if (item.href) {
      router.push(item.href);
    } else if (previousHref) {
      router.push(previousHref);
    } else {
      router.back();
    }
  };

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`flex items-center flex-wrap gap-1.5 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-medium text-neutral-500 dark:text-neutral-400 select-none ${className}`}
    >
      <Link 
        href="/" 
        className="hover:text-black dark:hover:text-white transition-colors"
      >
        Home
      </Link>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;

        return (
          <div key={`${item.label}-${idx}`} className="flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3 text-neutral-400 dark:text-neutral-600 shrink-0" />
            {!isLast ? (
              item.href ? (
                <Link 
                  href={item.href} 
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="hover:text-black dark:hover:text-white transition-colors uppercase tracking-[0.2em]"
                >
                  {item.label}
                </button>
              )
            ) : (
              <button
                type="button"
                onClick={() => handleLastClick(item)}
                title="Click to go back through path"
                className="group flex items-center gap-1 text-black dark:text-white font-semibold hover:text-[#C9A96E] dark:hover:text-[#C9A96E] transition-colors cursor-pointer uppercase tracking-[0.2em]"
              >
                <span>{item.label}</span>
                <span className="text-[9px] text-[#C9A96E] opacity-0 group-hover:opacity-100 transition-opacity">
                  &larr;
                </span>
              </button>
            )}
          </div>
        );
      })}
    </nav>
  );
}

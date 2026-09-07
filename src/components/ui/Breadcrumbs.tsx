'use client';

import Link from 'next/link';
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
  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`flex items-center flex-wrap gap-1.5 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-medium text-neutral-500 dark:text-neutral-400 ${className}`}
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
            {item.href && !isLast ? (
              <Link 
                href={item.href} 
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-black dark:text-white font-semibold' : ''}>
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}

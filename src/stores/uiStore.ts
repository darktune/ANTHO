"use client";

import { create } from "zustand";

interface UIStore {
  isMobileMenuOpen: boolean;
  isCartDrawerOpen: boolean;
  isSearchOpen: boolean;
  isPreloaderDone: boolean;
  theme: 'dark' | 'light';
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  setPreloaderDone: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
  initTheme: () => void;
}

export const useUIStore = create<UIStore>()((set, get) => ({
  isMobileMenuOpen: false,
  isCartDrawerOpen: false,
  isSearchOpen: false,
  isPreloaderDone: false,
  theme: 'dark',
  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () =>
    set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
  openCartDrawer: () => set({ isCartDrawerOpen: true }),
  closeCartDrawer: () => set({ isCartDrawerOpen: false }),
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  setPreloaderDone: () => set({ isPreloaderDone: true }),
  setTheme: (theme: 'dark' | 'light') => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('antho_theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    set({ theme });
  },
  toggleTheme: () => {
    const current = get().theme;
    const next = current === 'dark' ? 'light' : 'dark';
    get().setTheme(next);
  },
  initTheme: () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('antho_theme') as 'dark' | 'light' | null;
      const initial = stored || 'dark';
      if (initial === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      set({ theme: initial });
    }
  },
}));

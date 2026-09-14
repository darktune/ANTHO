"use client";

import { create } from "zustand";

export type ThemeMode = 'dark' | 'light' | 'system';

interface UIStore {
  isMobileMenuOpen: boolean;
  isCartDrawerOpen: boolean;
  isSearchOpen: boolean;
  isPreloaderDone: boolean;
  theme: ThemeMode;
  resolvedTheme: 'dark' | 'light';
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  setPreloaderDone: () => void;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  initTheme: () => void;
}

function resolveSystemTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'dark';
  
  // 1. Check time of day: 7:00 PM to 6:30 AM is dark mode
  const hour = new Date().getHours();
  const isNightTime = hour >= 19 || hour < 7;

  // 2. Check system OS preference
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return isNightTime || systemPrefersDark ? 'dark' : 'light';
}

function applyThemeToDOM(resolved: 'dark' | 'light') {
  if (typeof window === 'undefined') return;
  if (resolved === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export const useUIStore = create<UIStore>()((set, get) => ({
  isMobileMenuOpen: false,
  isCartDrawerOpen: false,
  isSearchOpen: false,
  isPreloaderDone: false,
  theme: 'dark',
  resolvedTheme: 'dark',

  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () =>
    set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
  openCartDrawer: () => set({ isCartDrawerOpen: true }),
  closeCartDrawer: () => set({ isCartDrawerOpen: false }),
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  setPreloaderDone: () => set({ isPreloaderDone: true }),

  setTheme: (theme: ThemeMode) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('antho_theme', theme);
    }
    const resolved = theme === 'system' ? resolveSystemTheme() : theme;
    applyThemeToDOM(resolved);
    set({ theme, resolvedTheme: resolved });
  },

  toggleTheme: () => {
    const current = get().theme;
    // 3-way toggle: dark -> light -> system -> dark
    const next: ThemeMode = 
      current === 'dark' ? 'light' : 
      current === 'light' ? 'system' : 'dark';
    get().setTheme(next);
  },

  initTheme: () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('antho_theme') as ThemeMode | null;
      const initial: ThemeMode = stored || 'dark';
      const resolved = initial === 'system' ? resolveSystemTheme() : initial;
      applyThemeToDOM(resolved);
      set({ theme: initial, resolvedTheme: resolved });

      // Listen to OS theme changes if on system mode
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleMediaChange = () => {
        if (get().theme === 'system') {
          const res = resolveSystemTheme();
          applyThemeToDOM(res);
          set({ resolvedTheme: res });
        }
      };
      mediaQuery.addEventListener('change', handleMediaChange);
    }
  },
}));

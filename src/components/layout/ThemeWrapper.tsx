'use client';

import { useEffect, useState } from 'react';
import { useUIStore } from '@/stores/uiStore';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme, initTheme } = useUIStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    initTheme();
    setMounted(true);
  }, [initTheme]);

  return (
    <div className={theme === 'light' ? 'light bg-[#F9F9F8] text-[#0A0A0A] transition-colors duration-300' : 'dark bg-[#0A0A0A] text-[#FAFAF9] transition-colors duration-300'}>
      {children}
    </div>
  );
}

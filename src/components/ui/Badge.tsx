import React from 'react';

interface BadgeProps {
  variant: 'success' | 'warning' | 'error' | 'info';
  children: React.ReactNode;
}

export default function Badge({ variant, children }: BadgeProps) {
  const variants = {
    success: 'bg-green-500/10 text-green-500 border-green-500/20',
    warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    error: 'bg-red-500/10 text-red-500 border-red-500/20',
    info: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  };

  const dotColors = {
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <div className={`inline-flex items-center px-2.5 py-1 rounded-full border text-[10px] uppercase tracking-wider font-semibold ${variants[variant]}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${dotColors[variant]}`} />
      {children}
    </div>
  );
}

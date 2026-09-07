'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#C9A96E] font-medium py-2.5">
        YOU&apos;RE IN // WELCOME TO ANTHO
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full sm:w-80 md:w-96 border-b border-black/30 dark:border-white/30 focus-within:border-[#C9A96E] transition-colors">
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={status === 'error' ? 'TRY AGAIN // INVALID EMAIL' : 'ENTER EMAIL FOR DROPS'} 
        className="flex-1 min-w-0 bg-transparent border-none focus:ring-0 text-[11px] sm:text-xs tracking-wider px-2 py-2.5 outline-none placeholder:text-neutral-400"
        required
        disabled={status === 'loading'}
      />
      <button 
        type="submit" 
        disabled={status === 'loading'}
        className="text-[11px] uppercase tracking-widest font-bold px-4 shrink-0 hover:text-[#C9A96E] transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? '...' : 'JOIN'}
      </button>
    </form>
  );
}

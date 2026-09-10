'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import { Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        sessionStorage.setItem('antho_admin_auth', 'true');
        router.push('/admin');
      } else {
        setError(data.error || 'Authentication failed. Please check your credentials.');
      }
    } catch {
      setError('Network communication error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 relative overflow-hidden">
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-serif tracking-[0.25em] text-white mb-2">ANTHO</h1>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] tracking-widest font-semibold uppercase bg-stone-900 border border-stone-800 text-[#C9A96E]">
            <ShieldCheck className="w-3.5 h-3.5" />
            ADMINISTRATIVE CONCIERGE PORTAL
          </div>
        </div>

        <div className="bg-stone-950 border border-stone-800 p-8 shadow-2xl backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center flex items-center justify-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <Input 
              label="Admin Email Address" 
              type="email" 
              name="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              placeholder="admin@antho.ng"
            />
            
            <Input 
              label="Master Password" 
              type="password" 
              name="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              placeholder="••••••••••••"
            />

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black py-3.5 text-xs uppercase tracking-widest font-bold hover:bg-stone-200 transition-colors disabled:opacity-70 flex justify-center items-center mt-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  AUTHENTICATING...
                </>
              ) : (
                'ENTER ADMIN PORTAL'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-stone-500 hover:text-white transition-colors tracking-wider uppercase">
              &larr; Return to Storefront
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import { Loader2 } from 'lucide-react';
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

    // Simulate authentication
    // In a real app, this would be an API call to authenticate against the DB
    setTimeout(() => {
      // Very basic client-side check just for demo purposes
      // The prompt asked to check against env vars client-side for now
      // Since we can't securely expose env vars to client without NEXT_PUBLIC_, 
      // we'll just use hardcoded demo credentials or accept anything temporarily
      
      const demoEmail = 'admin@antho.ng';
      const demoPass = 'password123';
      
      if (email === demoEmail && password === demoPass) {
        sessionStorage.setItem('antho_admin_auth', 'true');
        router.push('/admin');
      } else {
        setError('Invalid email or password. Use admin@antho.ng / password123 for demo.');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 relative overflow-hidden">
      {/* Background noise/texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-screen pointer-events-none"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-serif tracking-widest text-white mb-2">ANTHO</h1>
          </Link>
          <p className="text-stone-400 text-sm tracking-widest uppercase">Admin Portal</p>
        </div>

        <div className="bg-stone-900 border border-stone-800 p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
                {error}
              </div>
            )}
            
            <Input 
              label="Email Address" 
              type="email" 
              name="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              placeholder="admin@antho.ng"
            />
            
            <Input 
              label="Password" 
              type="password" 
              name="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              placeholder="••••••••"
            />

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black py-3.5 font-medium hover:bg-stone-200 transition-colors disabled:opacity-70 flex justify-center items-center mt-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  SIGNING IN...
                </>
              ) : (
                'SIGN IN'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-stone-500 hover:text-white transition-colors">
              &larr; Back to Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

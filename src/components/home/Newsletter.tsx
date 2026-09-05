'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <section className="py-32 px-4 bg-[#0A0A0A] border-t border-zinc-900 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto text-center w-full"
      >
        <h2 className="font-serif text-3xl md:text-5xl text-[#FAFAF9] mb-4">Join the Movement</h2>
        <p className="text-[#A8A29E] text-sm md:text-base mb-10 max-w-md mx-auto">
          Be the first to know about new drops, exclusive offers, and ANTHO stories.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={status === 'loading' || status === 'success'}
            className="flex-1 bg-transparent border-b border-zinc-700 py-3 px-2 text-[#FAFAF9] placeholder:text-zinc-500 focus:outline-none focus:border-[#FAFAF9] transition-colors disabled:opacity-50"
          />
          <button 
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="bg-[#FAFAF9] text-black px-8 py-3 text-xs font-medium tracking-widest uppercase hover:bg-[#C9A96E] hover:text-white transition-colors duration-300 disabled:opacity-50 min-w-[140px]"
          >
            {status === 'loading' ? 'WAIT...' : status === 'success' ? 'SUBSCRIBED' : 'SUBSCRIBE'}
          </button>
        </form>
      </motion.div>
    </section>
  );
}

import { ShieldCheck, Database, CreditCard, Store, Mail, Phone } from 'lucide-react';

export const metadata = {
  title: 'Settings & Diagnostics | ANTHO Admin',
};

export default function AdminSettingsPage() {
  const isPaystackConfigured = !!process.env.PAYSTACK_SECRET_KEY && !process.env.PAYSTACK_SECRET_KEY.includes('xxxxx');
  const isSupabaseConfigured = !!process.env.DATABASE_URL && process.env.DATABASE_URL.includes('supabase.com');
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+2348000000000';

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <span className="text-xs uppercase tracking-[0.25em] text-[#C9A96E] font-semibold block mb-1">SYSTEM & CONFIGURATION</span>
        <h1 className="text-3xl font-serif text-white">Settings & Diagnostics</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment Gateway Diagnostic */}
        <div className="bg-stone-950 border border-stone-800 p-6 rounded space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-stone-900 rounded text-[#C9A96E]">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm uppercase tracking-wider font-semibold text-white">Paystack Payment Gateway</h2>
              <p className="text-xs text-stone-400">Checkout & webhook settlement pipeline</p>
            </div>
          </div>

          <div className="pt-2 space-y-3 text-xs">
            <div className="flex justify-between items-center py-2 border-b border-stone-800/80">
              <span className="text-stone-400">Gateway Status</span>
              <span className={`px-2 py-0.5 rounded font-semibold uppercase text-[10px] ${
                isPaystackConfigured 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
              }`}>
                {isPaystackConfigured ? 'Live / Test Active' : 'Simulation Mode Active'}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-stone-800/80">
              <span className="text-stone-400">Base Currency</span>
              <span className="font-mono text-stone-200">Nigerian Naira (NGN / Kobo)</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-stone-800/80">
              <span className="text-stone-400">Callback Redirection</span>
              <span className="font-mono text-stone-300">/api/paystack/callback</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-stone-400">Webhook Verification</span>
              <span className="font-mono text-stone-300">HMAC SHA-512</span>
            </div>
          </div>
        </div>

        {/* Database & Supabase Diagnostic */}
        <div className="bg-stone-950 border border-stone-800 p-6 rounded space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-stone-900 rounded text-[#C9A96E]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm uppercase tracking-wider font-semibold text-white">Database & Pooler</h2>
              <p className="text-xs text-stone-400">PostgreSQL connection pooler</p>
            </div>
          </div>

          <div className="pt-2 space-y-3 text-xs">
            <div className="flex justify-between items-center py-2 border-b border-stone-800/80">
              <span className="text-stone-400">ORM Provider</span>
              <span className="font-mono text-stone-200">Prisma Client v6 (PostgreSQL)</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-stone-800/80">
              <span className="text-stone-400">Transaction Pooler</span>
              <span className="font-mono text-stone-300">Port 6543 (?pgbouncer=true)</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-stone-800/80">
              <span className="text-stone-400">Direct Session</span>
              <span className="font-mono text-stone-300">Port 5432 (DDL / Push)</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-stone-400">Resilient Fallback</span>
              <span className="px-2 py-0.5 rounded font-semibold uppercase text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Enabled (Zero Downtime)
              </span>
            </div>
          </div>
        </div>

        {/* Brand & Concierge Info */}
        <div className="bg-stone-950 border border-stone-800 p-6 rounded space-y-4 md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-stone-900 rounded text-[#C9A96E]">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm uppercase tracking-wider font-semibold text-white">Store Identity & Channels</h2>
              <p className="text-xs text-stone-400">Brand identity, contact numbers, and social links</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="p-4 bg-stone-900/40 border border-stone-800/80 rounded">
              <span className="text-stone-500 block uppercase tracking-wider text-[10px] mb-1">Brand Name</span>
              <span className="font-serif text-base text-white">ANTHO</span>
              <p className="text-[11px] text-stone-400 mt-1">God is the Greatest</p>
            </div>
            <div className="p-4 bg-stone-900/40 border border-stone-800/80 rounded">
              <span className="text-stone-500 block uppercase tracking-wider text-[10px] mb-1">Concierge Email</span>
              <span className="font-mono text-xs text-white">concierge@antho.ng</span>
              <p className="text-[11px] text-stone-400 mt-1">Direct support channel</p>
            </div>
            <div className="p-4 bg-stone-900/40 border border-stone-800/80 rounded">
              <span className="text-stone-500 block uppercase tracking-wider text-[10px] mb-1">WhatsApp Concierge</span>
              <span className="font-mono text-xs text-[#C9A96E]">{whatsappNumber}</span>
              <p className="text-[11px] text-stone-400 mt-1">Lagos Studio direct</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

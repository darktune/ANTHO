import { Truck, ShieldCheck, Star, RotateCcw } from 'lucide-react';

const signals = [
  { icon: Truck, text: 'Free Shipping Over ₦50K' },
  { icon: ShieldCheck, text: 'Secure Checkout' },
  { icon: Star, text: 'Premium Quality' },
  { icon: RotateCcw, text: 'Easy Returns' },
];

export default function TrustSignals() {
  return (
    <section className="py-12 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-zinc-800">
          {signals.map((signal, i) => {
            const Icon = signal.icon;
            return (
              <div key={i} className="flex flex-col items-center justify-center text-center px-4 space-y-4">
                <Icon className="w-6 h-6 text-[#C9A96E]" strokeWidth={1.5} />
                <span className="text-xs uppercase tracking-widest text-[#A8A29E]">
                  {signal.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

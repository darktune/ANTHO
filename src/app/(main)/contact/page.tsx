'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { MapPin, Mail, MessageCircle, Clock, Instagram, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+2348000000000';
  const cleanWhatsApp = whatsappNumber.replace(/[^0-9]/g, '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrorMessage(data.error || 'Failed to send message. Please try again or message our concierge on WhatsApp.');
      }
    } catch {
      setErrorMessage('Network connection issue. Please message our concierge directly on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 pt-28 md:pt-36 lg:py-24 lg:pt-36 max-w-6xl">
      <Breadcrumbs 
        items={[
          { label: 'Client Care', href: '/faq' },
          { label: 'Contact Concierge' }
        ]} 
        className="mb-8"
      />

      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.3em] text-[#C9A96E] mb-3 block">CLIENT CARE & CONCIERGE</span>
        <h1 className="text-4xl lg:text-6xl font-serif mb-4 text-neutral-900 dark:text-white tracking-tight">GET IN TOUCH</h1>
        <p className="text-neutral-600 dark:text-stone-400 max-w-xl mx-auto text-sm leading-relaxed">
          Have an inquiry about sizing, private fittings, bespoke alterations, or international delivery? Contact the ANTHO studio.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-6xl mx-auto">
        {/* Left Column - Form */}
        <div>
          {isSuccess ? (
            <div className="bg-stone-900/60 border border-stone-800 p-8 text-center h-full flex flex-col items-center justify-center backdrop-blur-sm">
              <div className="w-14 h-14 bg-[#C9A96E]/15 rounded-full flex items-center justify-center text-[#C9A96E] mb-4 border border-[#C9A96E]/30">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-serif mb-2 uppercase">Message Received</h3>
              <p className="text-stone-400 text-sm max-w-md">
                Thank you for reaching out. The ANTHO concierge team will review your note and respond within 24–48 hours.
              </p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="mt-8 text-xs uppercase tracking-widest text-[#C9A96E] hover:underline font-semibold"
              >
                Send another message &rarr;
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="Full Name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  placeholder="Your Name"
                />
                <Input 
                  label="Email Address" 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  placeholder="you@domain.com"
                />
              </div>
              
              <Input 
                label="Subject" 
                name="subject" 
                value={formData.subject}
                onChange={handleChange}
                required 
                placeholder="Order Inquiry / Sizing / Collaboration"
              />
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-stone-300">
                  Message
                </label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="How can we assist you today?"
                  className="w-full bg-stone-900 border border-stone-800 px-4 py-3 text-white focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500 transition-colors resize-none text-sm placeholder:text-stone-600"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black py-4 text-xs uppercase tracking-widest font-bold hover:bg-stone-200 transition-colors disabled:opacity-70 flex justify-center items-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    SENDING INQUIRY...
                  </>
                ) : (
                  'TRANSMIT MESSAGE'
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Column - Contact Info */}
        <div className="space-y-12">
          <div>
            <h2 className="text-xs uppercase tracking-[0.25em] font-semibold mb-6 text-[#C9A96E]">DIRECT CHANNELS</h2>
            <div className="space-y-6">
              <a href="mailto:concierge@antho.ng" className="flex items-start gap-4 text-stone-300 hover:text-white transition-colors group">
                <div className="p-2.5 bg-stone-900 border border-stone-800 rounded group-hover:border-stone-700">
                  <Mail className="w-4 h-4 text-[#C9A96E]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-stone-400 font-medium">Concierge Email</p>
                  <p className="text-sm font-mono mt-0.5">concierge@antho.ng</p>
                </div>
              </a>
              
              <a 
                href={`https://wa.me/${cleanWhatsApp}?text=Hello%20ANTHO%20concierge,%20I%20have%20an%20inquiry.`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-start gap-4 text-stone-300 hover:text-white transition-colors group"
              >
                <div className="p-2.5 bg-stone-900 border border-stone-800 rounded group-hover:border-stone-700">
                  <MessageCircle className="w-4 h-4 text-[#C9A96E]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-stone-400 font-medium">WhatsApp Concierge</p>
                  <p className="text-sm font-mono mt-0.5">{whatsappNumber}</p>
                </div>
              </a>
              
              <div className="flex items-start gap-4 text-stone-300">
                <div className="p-2.5 bg-stone-900 border border-stone-800 rounded">
                  <MapPin className="w-4 h-4 text-[#C9A96E]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-stone-400 font-medium">Atelier & Studio</p>
                  <p className="text-sm text-stone-300 mt-0.5">Victoria Island, Lagos, Nigeria</p>
                  <p className="text-xs text-stone-500 mt-0.5">(Private showroom fittings by appointment)</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 text-stone-300">
                <div className="p-2.5 bg-stone-900 border border-stone-800 rounded">
                  <Clock className="w-4 h-4 text-[#C9A96E]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-stone-400 font-medium">Concierge Hours</p>
                  <p className="text-sm text-stone-300 mt-0.5">Mon – Fri: 9:00 AM – 6:00 PM WAT</p>
                  <p className="text-xs text-stone-500 mt-0.5">Saturday: 10:00 AM – 4:00 PM WAT</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-[0.25em] font-semibold mb-4 text-[#C9A96E]">COMMUNITY</h2>
            <a 
              href="https://instagram.com/antho.ng" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-stone-900 border border-stone-800 text-stone-300 hover:text-white hover:border-stone-700 transition-colors text-xs tracking-wider"
            >
              <Instagram className="w-4 h-4 text-[#C9A96E]" />
              <span>@antho.ng on Instagram &rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

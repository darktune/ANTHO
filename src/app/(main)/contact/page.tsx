'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import { MapPin, Mail, Phone, Clock, Instagram, MessageCircle } from 'lucide-react';
import { Loader2 } from 'lucide-react';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-6xl font-serif mb-4">GET IN TOUCH</h1>
        <p className="text-stone-400 max-w-xl mx-auto">
          Have a question about an order, sizing, or just want to say hello? 
          Fill out the form below or reach us directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-6xl mx-auto">
        {/* Left Column - Form */}
        <div>
          {isSuccess ? (
            <div className="bg-stone-900 border border-stone-800 p-8 text-center h-full flex flex-col items-center justify-center">
              <h3 className="text-2xl font-serif mb-2">Message Sent</h3>
              <p className="text-stone-400">Thank you for reaching out. We will get back to you within 24-48 hours.</p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="mt-8 text-sm underline text-stone-300 hover:text-white"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="Name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
                <Input 
                  label="Email" 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <Input 
                label="Subject" 
                name="subject" 
                value={formData.subject}
                onChange={handleChange}
                required 
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
                  className="w-full bg-stone-900 border border-stone-800 px-4 py-3 text-white focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500 transition-colors resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black py-4 font-medium hover:bg-stone-200 transition-colors disabled:opacity-70 flex justify-center items-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    SENDING...
                  </>
                ) : (
                  'SEND MESSAGE'
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Column - Contact Info */}
        <div className="space-y-12">
          <div>
            <h2 className="text-xl font-medium mb-6 uppercase tracking-wider">Contact Information</h2>
            <div className="space-y-6">
              <a href="mailto:hello@antho.ng" className="flex items-start gap-4 text-stone-300 hover:text-white transition-colors">
                <Mail className="w-5 h-5 mt-1 text-gold" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-stone-400">hello@antho.ng</p>
                </div>
              </a>
              
              <a href="https://wa.me/2340000000000" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 text-stone-300 hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5 mt-1 text-gold" />
                <div>
                  <p className="font-medium">WhatsApp</p>
                  <p className="text-stone-400">+234 (0) 000 000 0000</p>
                </div>
              </a>
              
              <div className="flex items-start gap-4 text-stone-300">
                <MapPin className="w-5 h-5 mt-1 text-gold" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-stone-400">Victoria Island, Lagos, Nigeria<br/>(Online store only, no physical retail yet)</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 text-stone-300">
                <Clock className="w-5 h-5 mt-1 text-gold" />
                <div>
                  <p className="font-medium">Business Hours</p>
                  <p className="text-stone-400">Mon - Fri: 9:00 AM - 6:00 PM WAT<br/>Sat - Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-6 uppercase tracking-wider">Follow Us</h2>
            <a href="https://instagram.com/antho.ng" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-stone-300 hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
              <span>@antho.ng</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

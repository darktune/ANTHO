import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Link from 'next/link';

export const metadata = {
  title: 'Events & Pop-Ups | ANTHO',
  description: 'Pop-up experiences, community events, and installations by ANTHO.',
};

const EVENTS = [
  {
    id: 'ev-1',
    title: 'ANTHO x STREET SOUK // POP-UP',
    city: 'Lagos, Nigeria',
    location: 'Harbour Point, Victoria Island',
    date: 'DECEMBER 2025',
    status: 'PAST',
    description: 'Exclusive streetwear drop and interactive pop-up installation at West Africa’s largest youth culture convention.',
  },
  {
    id: 'ev-2',
    title: 'ANTHO LISTENING LOUNGE & VAULT',
    city: 'Lagos, Nigeria',
    location: 'Lekki Phase 1, Lagos',
    date: 'APRIL 2026',
    status: 'PAST',
    description: 'Private community listening session and archival pieces showcase featuring unreleased sample garments.',
  },
  {
    id: 'ev-3',
    title: 'SS26 WORLD RESIDENCY // LONDON POP-UP',
    city: 'London, United Kingdom',
    location: 'Shoreditch / Details TBA',
    date: 'SUMMER 2026',
    status: 'UPCOMING',
    description: 'International debut pop-up bringing Nigerian luxury streetwear silhouettes to London. RSVP open soon.',
  },
];

export default function EventsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-8 py-16 pt-28 md:pt-36">
      <Breadcrumbs 
        items={[
          { label: 'Drops & Visuals', href: '/collections' },
          { label: 'Events & Pop-Ups' }
        ]} 
      />

      <div className="mt-8 mb-16 pb-6 border-b border-black/10 dark:border-white/10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif uppercase tracking-tight">
            Events & Pop-Ups
          </h1>
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 mt-2">
            Installations &bull; Drops &bull; Community
          </p>
        </div>
        <div className="text-xs font-mono text-[#C9A96E]">
          [ 03 EXPERIENCES ]
        </div>
      </div>

      <div className="space-y-8">
        {EVENTS.map((event) => (
          <div 
            key={event.id}
            className="p-6 md:p-8 border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className={`text-[9px] uppercase tracking-widest px-2.5 py-1 rounded font-bold ${
                  event.status === 'UPCOMING'
                    ? 'bg-[#C9A96E] text-black'
                    : 'border border-black/20 dark:border-white/20 text-neutral-500'
                }`}>
                  {event.status}
                </span>
                <span className="text-xs font-mono text-neutral-500">{event.date}</span>
              </div>

              <h2 className="text-lg sm:text-xl font-semibold tracking-tight uppercase">
                {event.title}
              </h2>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                {event.description}
              </p>

              <div className="text-[11px] font-mono tracking-wider text-neutral-500 pt-1">
                📍 {event.location} &bull; {event.city}
              </div>
            </div>

            <div className="shrink-0">
              {event.status === 'UPCOMING' ? (
                <a
                  href="mailto:events@antho.com?subject=RSVP%20London%20Pop-Up"
                  className="inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#C9A96E] dark:hover:bg-[#C9A96E] dark:hover:text-white transition-colors"
                >
                  REQUEST RSVP &rarr;
                </a>
              ) : (
                <span className="text-[11px] uppercase tracking-widest text-neutral-400">
                  [ ARCHIVED ]
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

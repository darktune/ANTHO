import type { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import EventArchiveFolder, { CU_ARCHIVE_DATA, CAMPAIGN_MEDIA_ARCHIVE_DATA } from '@/components/events/EventArchiveFolder';
import { EventJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Events, Pop-Ups & Archive Dossier | ANTHO',
  description: 'Archival documentation of ANTHO runway activations, campus tradefairs, and international fashion installations.',
  alternates: {
    canonical: '/events',
  },
  openGraph: {
    title: 'Events & Archival Dossiers | ANTHO',
    description: 'Documenting the ANTHO x CU Tradefair 2026 and SS26 Campaign Media Vault.',
    url: 'https://www.anthosyllogi.xyz/events',
    images: ['/images/slideshow/1.jpg'],
  },
};

export default function EventsPage() {
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Events & Pop-Ups', url: '/events' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 sm:py-16 pt-20 sm:pt-28 md:pt-36">
      <EventJsonLd event={CU_ARCHIVE_DATA} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <Breadcrumbs 
        items={[
          { label: 'Drops & Visuals', href: '/collections' },
          { label: 'Events & Pop-Ups' }
        ]} 
      />

      <div className="mt-8 mb-16 pb-6 border-b border-black/10 dark:border-white/10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif uppercase tracking-tight text-neutral-900 dark:text-white">
            Events & Pop-Ups
          </h1>
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 mt-2 font-medium">
            Installations &bull; Campus Residencies &bull; Community Archives
          </p>
        </div>
        <div className="text-xs font-mono text-[#C9A96E] font-semibold">
          [ 01 UPCOMING // 02 ARCHIVED DOSSIERS ]
        </div>
      </div>

      <div className="space-y-16">
        
        {/* Section 1: Upcoming Events */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#C9A96E] animate-pulse" />
            <h2 className="text-xs uppercase tracking-[0.25em] font-bold text-neutral-900 dark:text-white">
              Upcoming Experiences
            </h2>
            <span className="h-px flex-1 bg-black/10 dark:border-white/10" />
          </div>

          <div className="p-6 md:p-8 border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-black/[0.02] dark:bg-white/[0.02]">
            <div className="space-y-2.5 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="text-[9px] uppercase tracking-widest px-2.5 py-1 rounded font-bold bg-[#C9A96E] text-black">
                  UPCOMING
                </span>
                <span className="text-xs font-mono text-neutral-500 font-medium">SUMMER 2026</span>
              </div>

              <h3 className="text-lg sm:text-xl font-semibold tracking-tight uppercase text-neutral-900 dark:text-white">
                SS26 WORLD RESIDENCY // LONDON POP-UP
              </h3>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                International debut pop-up bringing contemporary Nigerian youth streetwear silhouettes to London. Features private styling lounges and limited capsule garments.
              </p>

              <div className="text-[11px] font-mono tracking-wider text-neutral-500 pt-1">
                📍 Shoreditch / Details TBA &bull; London, United Kingdom
              </div>
            </div>

            <div className="shrink-0 w-full md:w-auto">
              <a
                href="mailto:antho.syllogi@gmail.com?subject=RSVP%20London%20Pop-Up"
                className="block text-center px-6 py-3.5 bg-black dark:bg-white text-white dark:text-black text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#C9A96E] dark:hover:bg-[#C9A96E] dark:hover:text-white transition-colors"
              >
                REQUEST RSVP &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* Section 2: Archive Dossiers (Folder Designs) */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-neutral-400" />
            <h2 className="text-xs uppercase tracking-[0.25em] font-bold text-neutral-900 dark:text-white">
              Archived Case Files & Pop-Up Vault
            </h2>
            <span className="h-px flex-1 bg-black/10 dark:border-white/10" />
          </div>

          <p className="text-xs text-neutral-500 uppercase tracking-wider font-mono">
            // Click any folder jacket to open full photo &amp; video process dossier
          </p>

          {/* Dossier 1: Covenant University Tradefair '26 */}
          <EventArchiveFolder 
            folderData={CU_ARCHIVE_DATA} 
            archiveNumber="001" 
          />

          {/* Dossier 2: New Campaign Assets & Media Vault */}
          <EventArchiveFolder 
            folderData={CAMPAIGN_MEDIA_ARCHIVE_DATA} 
            archiveNumber="002" 
          />
        </section>

      </div>
    </div>
  );
}

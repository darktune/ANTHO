import type { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import EventArchiveFolder, { CU_ARCHIVE_DATA, CAMPAIGN_MEDIA_ARCHIVE_DATA } from '@/components/events/EventArchiveFolder';
import { EventJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Events, Pop-Ups & Archive Dossier | ANTHO',
  description: 'Archival documentation of ANTHO runway activations, campus tradefairs, and declassified process dossiers.',
  alternates: {
    canonical: '/events',
  },
  openGraph: {
    title: 'Events & Archival Dossiers | ANTHO',
    description: 'Documenting the ANTHO x CU Tradefair 2026 and Campaign Media Vault.',
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

      <div className="mt-8 mb-12 pb-6 border-b border-black/10 dark:border-white/10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif uppercase tracking-tight text-neutral-900 dark:text-white">
            Events & Pop-Ups
          </h1>
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 mt-2 font-medium">
            Installations &bull; Campus Residencies &bull; Community Archives
          </p>
        </div>
        <div className="text-xs font-mono text-[#C9A96E] font-semibold">
          [ 02 DECLASSIFIED ARCHIVE DOSSIERS ]
        </div>
      </div>

      <div className="space-y-12">
        {/* Archive Dossiers (Folder Designs) */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#C9A96E] animate-pulse" />
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

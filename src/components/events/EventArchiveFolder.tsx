'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  FolderArchive, 
  FolderOpen, 
  X, 
  ExternalLink, 
  Instagram, 
  Film, 
  MapPin, 
  Volume2, 
  VolumeX 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ArchiveItem {
  id: string;
  type: 'video' | 'image';
  src: string;
  poster?: string;
  phase: string;
  title: string;
  date: string;
  story: string;
  socialLink: {
    platform: 'Instagram' | 'TikTok' | 'X (Twitter)';
    url: string;
    label: string;
  };
}

export const CU_ARCHIVE_DATA = {
  title: "ANTHO x CU TRADEFAIR '26 (COVENANT UNIVERSITY)",
  shortTitle: "ANTHO x CU TRADEFAIR '26",
  university: "Covenant University",
  date: "JUNE 2026",
  location: "Covenant University Campus, Ota, Ogun State, Nigeria",
  venue: "Student Activity Center // Main Tradefair Pavilion",
  status: "ARCHIVED",
  caseCode: "CU-TF-2026 // CASE 001",
  summary: "In June 2026, ANTHO mounted an exclusive campus activation and runway showcase at Covenant University. From secret midnight pattern drafting in Lagos to building an industrial steel pavilion inside the Student Activity Center, this dossier documents the complete creative journey, material testing, student community styling, and viral Genesis sellout.",
  stats: [
    { label: "Campus Attendance", value: "1,200+ Students" },
    { label: "Genesis Capsule", value: "Sold Out in 48h" },
    { label: "Archival Media", value: "08 Verified Entries" },
    { label: "Official Tag", value: "#AnthoCU26" },
  ],
  items: [
    {
      id: "cu-01",
      type: "video" as const,
      src: "/images/antho-shoot/video_2026-09-04_09-11-38.mp4",
      poster: "/images/antho-shoot/IMG_3806.JPG",
      phase: "PHASE 01 // KINETIC CAMPAIGN TEASER",
      title: "Lagos to Ota: The Motion Prologue",
      date: "May 28, 2026",
      story: "Before loading the freight convoy for Ogun State, the ANTHO creative unit captured a 48-hour motion reel in Lagos. We wanted the Covenant University student body to witness how our heavyweight streetwear silhouettes breathe, fall, and retain their architectural lines in kinetic motion rather than on static racks.",
      socialLink: {
        platform: "Instagram" as const,
        url: "https://instagram.com/antho.ng",
        label: "Watch Motion Reel on Instagram Stories"
      }
    },
    {
      id: "cu-02",
      type: "image" as const,
      src: "/images/antho-shoot/IMG_3804.JPG",
      phase: "PHASE 02 // HERITAGE MATERIAL DEVELOPMENT",
      title: "Indigo Adire & High-Tensile Cotton Dyework",
      date: "June 2, 2026",
      story: "For the tradefair drop, our studio partnered with master dye artisans in Abeokuta to formulate custom Adire resist-dyed indigo textiles. By binding ancestral dye techniques with heavyweight 380GSM cotton, each piece in the CU collection arrived completely one-of-a-kind.",
      socialLink: {
        platform: "Instagram" as const,
        url: "https://instagram.com/antho.ng",
        label: "View Atelier Indigo Dyeing BTS on IG"
      }
    },
    {
      id: "cu-03",
      type: "image" as const,
      src: "/images/antho-shoot/IMG_3806.JPG",
      phase: "PHASE 03 // SILK PROTOTYPING & FIT CHECKS",
      title: "The Silk Shirt 001: Fluid Anatomy & Collar Calibration",
      date: "June 5, 2026",
      story: "Fine-tuning the relaxed Cuban collar and fluid drape. Engineered specifically to breathe in the Ota campus humidity while commanding luxury distinction during university lectures and evening events.",
      socialLink: {
        platform: "X (Twitter)" as const,
        url: "https://x.com/antho_ng",
        label: "Read Design Philosophy Thread on X"
      }
    },
    {
      id: "cu-04",
      type: "image" as const,
      src: "/images/antho-shoot/IMG_3807.JPG",
      phase: "PHASE 04 // STRUCTURAL CALIBRATION",
      title: "480 GSM Heavyweight Hoodie Engineering",
      date: "June 8, 2026",
      story: "Developing our heavyweight French Terry fleece hoodie block. We subjected the fleece to thermal tests and shape-retention washes, ensuring the double-walled hood stays upright and sculpts the wearer’s silhouette.",
      socialLink: {
        platform: "Instagram" as const,
        url: "https://instagram.com/antho.ng",
        label: "View Heavyweight Fit Test Carousel on IG"
      }
    },
    {
      id: "cu-05",
      type: "image" as const,
      src: "/images/antho-shoot/IMG_3805.JPG",
      phase: "PHASE 05 // ARCHITECTURAL BOOTH CONSTRUCTION",
      title: "Building the Monolith Pavilion at CU Student Activity Center",
      date: "June 11, 2026",
      story: "Overnight installation inside the tradefair hall. Using raw steel scaffolding, low-profile industrial rails, warm 2700K museum spotlights, and matte-black directional signage, we converted standard event floor-space into a modern luxury boutique.",
      socialLink: {
        platform: "TikTok" as const,
        url: "https://tiktok.com/@antho.ng",
        label: "Watch Booth Build Time-Lapse on TikTok"
      }
    },
    {
      id: "cu-06",
      type: "image" as const,
      src: "/images/antho-shoot/Snapchat-1522984318.jpg",
      phase: "PHASE 06 // DOORS OPEN & THE DROP RUSH",
      title: "Day 01 Activation: 10:00 AM Doors & Student Rush",
      date: "June 12, 2026",
      story: "Covenant University students queued around the corridor before the official morning opening. Over 400 limited-run graphic tees and polos were claimed within the first four hours as students experienced the textures first-hand.",
      socialLink: {
        platform: "Instagram" as const,
        url: "https://instagram.com/antho.ng",
        label: "View Student Crowd Reactions on IG Stories"
      }
    },
    {
      id: "cu-07",
      type: "image" as const,
      src: "/images/antho-shoot/IMG_3801.JPG",
      phase: "PHASE 07 // COMMUNITY POLAROIDS & STYLING STORIES",
      title: "Student Portraits & Campus Uniform Hybrid Styling",
      date: "June 13, 2026",
      story: "We documented student stylists combining ANTHO tailored bottoms and graphic tees with varsity jackets, chunky loafers, and handcrafted leather accessories—reflecting the rich creative identity of the CU campus.",
      socialLink: {
        platform: "Instagram" as const,
        url: "https://instagram.com/antho.ng",
        label: "Explore Community Styling #AnthoCU26 on IG"
      }
    },
    {
      id: "cu-08",
      type: "image" as const,
      src: "/images/antho-shoot/IMG_3808.JPG",
      phase: "PHASE 08 // ARCHIVAL PRESERVATION",
      title: "Full Sellout & Permanent Vault Seal",
      date: "June 14, 2026",
      story: "By Sunday evening, every single piece produced for the CU Tradefair was in the hands of the community. Runway sample garments were cataloged, wrapped in archival paper, and returned to our Lagos vault. God is the greatest.",
      socialLink: {
        platform: "Instagram" as const,
        url: "https://instagram.com/antho.ng",
        label: "View Official Tradefair Recap on Instagram"
      }
    },
  ]
};

export default function EventArchiveFolder() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  // Lock body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Physical Folder Container */}
      <div className="relative group cursor-pointer" onClick={() => setIsOpen(true)}>
        
        {/* Top Folder Tab Notch */}
        <div className="flex items-end">
          <div className="relative z-10 px-3.5 sm:px-7 py-2 sm:py-2.5 bg-[#E8E5DF] dark:bg-[#1E1D1B] border-t-2 border-l-2 border-r-2 border-black/20 dark:border-white/20 rounded-t-lg flex items-center gap-2 sm:gap-3 transition-colors duration-300 shadow-sm">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <FolderArchive className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span className="text-[9px] sm:text-xs font-mono tracking-widest uppercase font-bold text-neutral-800 dark:text-neutral-200">
                ARCHIVE // 001
              </span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[8px] sm:text-[9px] uppercase tracking-widest px-1.5 sm:px-2 py-0.5 bg-red-600/10 text-red-600 dark:text-red-400 font-bold border border-red-600/20">
              DECLASSIFIED
            </span>
          </div>

          <div className="ml-auto pr-2 pb-1 hidden sm:flex items-center gap-2 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
            <span>REF: CU-TF-2026</span>
            <span>&bull;</span>
            <span>JUNE 2026</span>
          </div>
        </div>

        {/* Main Folder Body Jacket */}
        <div className="relative bg-[#F4F1EB] dark:bg-[#151413] border-2 border-black/20 dark:border-white/20 p-5 sm:p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:border-[#C9A96E]/80">
          
          {/* Subtle Folder Inner Stitching Border */}
          <div className="absolute inset-2 sm:inset-3 border border-dashed border-black/10 dark:border-white/10 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            
            {/* Left Content Column */}
            <div className="space-y-4 max-w-2xl">
              
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[10px] uppercase tracking-[0.25em] px-2.5 py-1 bg-black text-white dark:bg-white dark:text-black font-bold">
                  {CU_ARCHIVE_DATA.status}
                </span>
                <span className="text-xs font-mono text-[#C9A96E] font-semibold tracking-wider">
                  {CU_ARCHIVE_DATA.date}
                </span>
                <span className="text-xs text-neutral-400 font-mono hidden sm:inline">
                  [{CU_ARCHIVE_DATA.caseCode}]
                </span>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif tracking-tight uppercase text-neutral-900 dark:text-white group-hover:text-[#C9A96E] transition-colors">
                  {CU_ARCHIVE_DATA.title}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                  {CU_ARCHIVE_DATA.summary}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-500 dark:text-neutral-400 pt-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A96E]" />
                  <span>{CU_ARCHIVE_DATA.venue} &bull; {CU_ARCHIVE_DATA.location}</span>
                </div>
              </div>

              {/* Stat Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                {CU_ARCHIVE_DATA.stats.map((s) => (
                  <div key={s.label} className="p-2.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                    <span className="block text-[9px] uppercase tracking-wider text-neutral-500">{s.label}</span>
                    <span className="font-mono text-xs font-bold text-neutral-900 dark:text-white">{s.value}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Interactive Action & Peeking Polaroids Preview */}
            <div className="shrink-0 flex flex-col items-center sm:items-end w-full md:w-auto">
              
              {/* Stacked Peeking Polaroids Visual */}
              <div className="relative w-36 h-24 mb-4 hidden sm:block">
                <div className="absolute top-0 right-6 w-20 h-24 bg-stone-900 border border-white/20 shadow-md transform -rotate-6 transition-transform group-hover:-rotate-12 overflow-hidden">
                  <Image 
                    src="/images/antho-shoot/IMG_3806.JPG" 
                    alt="Preview 1" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="absolute top-1 right-2 w-20 h-24 bg-stone-900 border border-white/20 shadow-md transform rotate-6 transition-transform group-hover:rotate-12 overflow-hidden">
                  <Image 
                    src="/images/antho-shoot/IMG_3804.JPG" 
                    alt="Preview 2" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="absolute top-2 right-4 w-20 h-24 bg-stone-900 border border-white/30 shadow-lg overflow-hidden">
                  <Image 
                    src="/images/antho-shoot/Snapchat-1522984318.jpg" 
                    alt="Preview 3" 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <span className="text-[10px] font-mono text-white font-bold tracking-widest">+8</span>
                  </div>
                </div>
              </div>

              <button 
                type="button"
                onClick={() => setIsOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 bg-black dark:bg-white text-white dark:text-black text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#C9A96E] dark:hover:bg-[#C9A96E] dark:hover:text-white transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <FolderOpen className="w-4 h-4" />
                <span>OPEN ARCHIVE FOLDER &rarr;</span>
              </button>

              <span className="text-[10px] font-mono text-neutral-400 mt-2 uppercase tracking-wider">
                Tap to explore photo & video reel
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* Full Scrollable Dossier Popup Page (Modal) */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex justify-center p-2 sm:p-4 md:p-8">
            
            {/* Backdrop click to dismiss */}
            <div 
              className="fixed inset-0"
              onClick={() => setIsOpen(false)}
            />

            {/* Dossier Document Container */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-4xl bg-[#FAFAF9] dark:bg-[#0D0D0D] text-[#0A0A0A] dark:text-[#FAFAF9] border border-black/20 dark:border-white/20 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92dvh] sm:max-h-[90vh]"
            >
              {/* Sticky Top Header Bar */}
              <div className="sticky top-0 z-30 bg-[#FAFAF9]/95 dark:bg-[#0D0D0D]/95 backdrop-blur-md border-b border-black/10 dark:border-white/10 px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-red-600 animate-pulse shrink-0" />
                  <div>
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-mono text-[#C9A96E] font-bold block">
                      ARCHIVE DOSSIER // DECLASSIFIED
                    </span>
                    <h3 className="text-xs sm:text-sm font-serif uppercase tracking-wider font-semibold line-clamp-1">
                      {CU_ARCHIVE_DATA.shortTitle}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                  <span className="hidden sm:inline font-mono text-xs text-neutral-400">
                    {CU_ARCHIVE_DATA.date}
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
                    aria-label="Close archive dossier"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Story Document Content */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-10 md:px-12 py-6 sm:py-8 space-y-8 sm:space-y-12 custom-scrollbar">
                
                {/* Document Title Banner */}
                <div className="border-b border-black/10 dark:border-white/10 pb-8">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 bg-[#C9A96E] text-black font-bold">
                      COVENANT UNIVERSITY
                    </span>
                    <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 border border-black/20 dark:border-white/20 font-mono text-neutral-400">
                      CASE NO: 2026-CU-01
                    </span>
                    <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 border border-black/20 dark:border-white/20 font-mono text-neutral-400">
                      STATUS: VERIFIED
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif uppercase tracking-tight mb-4">
                    {CU_ARCHIVE_DATA.title}
                  </h1>

                  <p className="text-xs sm:text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">
                    {CU_ARCHIVE_DATA.summary}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-black/10 dark:border-white/10">
                    {CU_ARCHIVE_DATA.stats.map((st) => (
                      <div key={st.label} className="p-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                        <span className="text-[10px] uppercase tracking-wider text-neutral-500 block mb-0.5">{st.label}</span>
                        <span className="font-mono text-sm font-bold text-neutral-900 dark:text-white">{st.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chronological Process Story Reel */}
                <div className="space-y-14">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono uppercase tracking-[0.3em] font-bold text-[#C9A96E]">
                      // COMPLETE PROCESS NARRATIVE & MEDIA
                    </span>
                    <span className="h-px flex-1 bg-black/10 dark:border-white/10" />
                  </div>

                  {CU_ARCHIVE_DATA.items.map((item, index) => (
                    <article 
                      key={item.id}
                      className="group border border-black/15 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-5 sm:p-7 transition-all duration-300 hover:border-[#C9A96E]/50"
                    >
                      {/* Entry Header */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-black/10 dark:border-white/10">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-[#C9A96E] font-bold">
                            0{index + 1}
                          </span>
                          <span className="text-neutral-400">&bull;</span>
                          <span className="text-[10px] sm:text-xs font-mono tracking-wider uppercase font-semibold text-neutral-700 dark:text-neutral-300">
                            {item.phase}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-neutral-500">
                          {item.date}
                        </span>
                      </div>

                      {/* Entry Title */}
                      <h2 className="text-lg sm:text-xl md:text-2xl font-serif uppercase tracking-tight text-neutral-900 dark:text-white mb-4">
                        {item.title}
                      </h2>

                      {/* Media Display: Video or Image */}
                      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-stone-900 overflow-hidden mb-5 border border-black/10 dark:border-white/10">
                        {item.type === 'video' ? (
                          <div className="relative w-full h-full">
                            <video
                              src={item.src}
                              autoPlay
                              loop
                              muted={isVideoMuted}
                              playsInline
                              className="w-full h-full object-cover object-center"
                            />
                            {/* Video Control Buttons */}
                            <div className="absolute bottom-3 right-3 flex items-center gap-2 z-20">
                              <button
                                type="button"
                                onClick={() => setIsVideoMuted(!isVideoMuted)}
                                className="p-2 bg-black/70 hover:bg-black text-white rounded-full transition-colors backdrop-blur-sm"
                                aria-label={isVideoMuted ? "Unmute audio" : "Mute audio"}
                              >
                                {isVideoMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                            <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/70 backdrop-blur-sm text-[#C9A96E] text-[10px] font-mono tracking-widest uppercase flex items-center gap-1.5">
                              <Film className="w-3 h-3" /> CAMPAIGN MOTION REEL
                            </div>
                          </div>
                        ) : (
                          <div className="relative w-full h-full">
                            <Image
                              src={item.src}
                              alt={item.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 800px"
                              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/70 backdrop-blur-sm text-white text-[10px] font-mono tracking-widest uppercase">
                              ARCHIVAL STILL
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Process Story Write-up */}
                      <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-5 font-normal">
                        {item.story}
                      </p>

                      {/* Social Post / Story Direct Link */}
                      <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div className="flex items-center gap-2 text-[10px] uppercase font-mono text-neutral-500 tracking-wider">
                          <span>PLATFORM:</span>
                          <span className="font-semibold text-[#C9A96E]">{item.socialLink.platform}</span>
                        </div>

                        <a
                          href={item.socialLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-neutral-900 dark:text-white hover:text-[#C9A96E] dark:hover:text-[#C9A96E] transition-colors group/link"
                        >
                          {item.socialLink.platform === 'Instagram' && <Instagram className="w-3.5 h-3.5 text-[#C9A96E]" />}
                          <span>{item.socialLink.label}</span>
                          <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </a>
                      </div>

                    </article>
                  ))}
                </div>

                {/* Dossier Bottom Sign-off */}
                <div className="pt-10 pb-6 border-t-2 border-black/10 dark:border-white/10 text-center space-y-4">
                  <span className="text-xs sm:text-sm tracking-[0.35em] uppercase text-[#C9A96E] font-serif italic">
                    God is the greatest
                  </span>
                  <p className="text-[10px] font-mono tracking-widest uppercase text-neutral-500">
                    END OF DOSSIER &bull; ARCHIVE REF: 2026-CU-01 &bull; ANTHO STUDIO LAGOS
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-4 px-8 py-3.5 border border-black dark:border-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                  >
                    CLOSE DOSSIER &times;
                  </button>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

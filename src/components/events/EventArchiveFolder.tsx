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
    platform: 'Instagram' | 'TikTok' | 'X (Twitter)' | 'Snapchat';
    url: string;
    label: string;
  };
}

export interface ArchiveFolderData {
  title: string;
  shortTitle: string;
  university?: string;
  date: string;
  location: string;
  venue: string;
  status: string;
  caseCode: string;
  summary: string;
  stats: { label: string; value: string }[];
  previews: string[];
  items: ArchiveItem[];
}

export const CU_ARCHIVE_DATA: ArchiveFolderData = {
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
  previews: [
    "/images/antho-shoot/IMG_3806.JPG",
    "/images/antho-shoot/IMG_3804.JPG",
    "/images/antho-shoot/Snapchat-1522984318.jpg"
  ],
  items: [
    {
      id: "cu-01",
      type: "video",
      src: "/images/antho-shoot/video_2026-09-04_09-11-38.mp4",
      poster: "/images/antho-shoot/IMG_3806.JPG",
      phase: "PHASE 01 // KINETIC CAMPAIGN TEASER",
      title: "Lagos to Ota: The Motion Prologue",
      date: "May 28, 2026",
      story: "Before loading the freight convoy for Ogun State, the ANTHO creative unit captured a 48-hour motion reel in Lagos. We wanted the Covenant University student body to witness how our heavyweight streetwear silhouettes breathe, fall, and retain their architectural lines in kinetic motion rather than on static racks.",
      socialLink: {
        platform: "Instagram",
        url: "https://www.instagram.com/antho.syllogi",
        label: "Watch Motion Reel on Instagram Stories"
      }
    },
    {
      id: "cu-02",
      type: "image",
      src: "/images/antho-shoot/IMG_3804.JPG",
      phase: "PHASE 02 // HERITAGE MATERIAL DEVELOPMENT",
      title: "Indigo Adire & High-Tensile Cotton Dyework",
      date: "June 2, 2026",
      story: "For the tradefair drop, our studio partnered with master dye artisans in Abeokuta to formulate custom Adire resist-dyed indigo textiles. By binding ancestral dye techniques with heavyweight 380GSM cotton, each piece in the CU collection arrived completely one-of-a-kind.",
      socialLink: {
        platform: "Instagram",
        url: "https://www.instagram.com/antho.syllogi",
        label: "View Atelier Indigo Dyeing BTS on IG"
      }
    },
    {
      id: "cu-03",
      type: "image",
      src: "/images/antho-shoot/IMG_3806.JPG",
      phase: "PHASE 03 // SILK PROTOTYPING & FIT CHECKS",
      title: "The Silk Shirt 001: Fluid Anatomy & Collar Calibration",
      date: "June 5, 2026",
      story: "Fine-tuning the relaxed Cuban collar and fluid drape. Engineered specifically to breathe in the Ota campus humidity while commanding luxury distinction during university lectures and evening events.",
      socialLink: {
        platform: "X (Twitter)",
        url: "https://x.com/syllogiantho?s=21",
        label: "Read Design Philosophy Thread on X"
      }
    },
    {
      id: "cu-04",
      type: "image",
      src: "/images/antho-shoot/IMG_3807.JPG",
      phase: "PHASE 04 // STRUCTURAL CALIBRATION",
      title: "480 GSM Heavyweight Hoodie Engineering",
      date: "June 8, 2026",
      story: "Rigorous fit checks inside our Yaba workshop. The double-layered hood was engineered to remain rigid and sculptural without collapsing, while deep kangaroo pockets were reinforced with double-needle lockstitching.",
      socialLink: {
        platform: "TikTok",
        url: "https://www.tiktok.com/@antho.syllogi",
        label: "Watch Tailoring Process on TikTok"
      }
    },
    {
      id: "cu-05",
      type: "image",
      src: "/images/antho-shoot/IMG_3801.JPG",
      phase: "PHASE 05 // CARGO PROPORTIONING",
      title: "Wide-Leg Tactical Trousers: The Campus Fit",
      date: "June 12, 2026",
      story: "Designed for effortless campus movement between halls and lecture theaters. Gusseted leg seams allow natural stride, while dual cinch cords at the ankles enable styling either as relaxed straight trousers or stacked tapered sweat silhouettes.",
      socialLink: {
        platform: "Instagram",
        url: "https://www.instagram.com/antho.syllogi",
        label: "View Campus Styling Lookbook on IG"
      }
    },
    {
      id: "cu-06",
      type: "image",
      src: "/images/antho-shoot/IMG_3803.JPG",
      phase: "PHASE 06 // BOOTH INSTALLATION",
      title: "Pavilion Build: Cold-Rolled Steel & Concrete Pedestals",
      date: "June 18, 2026",
      story: "Constructing the ANTHO experiential pavilion inside the Covenant University Student Activity Center. Over 36 sleepless hours, raw scaffolding tubes were wire-brushed and mounted with warm gallery-spec track lighting.",
      socialLink: {
        platform: "X (Twitter)",
        url: "https://x.com/syllogiantho?s=21",
        label: "See Booth Construction Time-Lapse on X"
      }
    },
    {
      id: "cu-07",
      type: "image",
      src: "/images/antho-shoot/IMG_3805.JPG",
      phase: "PHASE 07 // COMMUNITY ACTIVATION",
      title: "Day 01: 600-Student Queue & Live Fitting Sessions",
      date: "June 20, 2026",
      story: "Doors opened at 10:00 AM to a queue extending across the Student Activity Center plaza. Students engaged in on-the-spot styling sessions with creative directors, experiencing the garments directly.",
      socialLink: {
        platform: "Instagram",
        url: "https://www.instagram.com/antho.syllogi",
        label: "Watch Opening Day Stories on Instagram"
      }
    },
    {
      id: "cu-08",
      type: "image",
      src: "/images/antho-shoot/Snapchat-1522984318.jpg",
      phase: "PHASE 08 // THE CONCLUSION",
      title: "Complete Sellout: The Genesis Archive Closed",
      date: "June 22, 2026",
      story: "By Sunday afternoon, all 300 numbered Genesis garments were sold out. A momentous milestone proving that Nigerian university youth demand uncompromising luxury streetwear made with local integrity.",
      socialLink: {
        platform: "X (Twitter)",
        url: "https://x.com/syllogiantho?s=21",
        label: "Read Founder Debrief & Thanks on X"
      }
    }
  ]
};

export const CAMPAIGN_MEDIA_ARCHIVE_DATA: ArchiveFolderData = {
  title: "ANTHO SYLLOGI // SS26 CAMPAIGN & MEDIA VAULT",
  shortTitle: "SS26 CAMPAIGN & MEDIA VAULT",
  date: "2026 ARCHIVAL RECORD",
  location: "Lagos Atelier & Global Digital Archives",
  venue: "Official Visual & Media Asset Repository",
  status: "CLASSIFIED VAULT",
  caseCode: "SYLLOGI-VAULT-2026 // CASE 002",
  summary: "Comprehensive visual and technical process documentation of the SS26 launch drops. Contains authentic studio captures, 300GSM combed cotton and 500GSM fleece engineering tests, high-density silkscreen formulation, and editorial sequence stills from the verified live media archive.",
  stats: [
    { label: "Verified Assets", value: "74 Media Files" },
    { label: "Core Capsules", value: "04 Hero Pieces" },
    { label: "Process Log", value: "08 Deep Entries" },
    { label: "Social Vault", value: "IG / TT / X / SC" },
  ],
  previews: [
    "/images/global_black/IMG_6729.JPEG",
    "/images/global_white/IMG_6733.JPEG",
    "/images/black_prevails/IMG_6738.JPEG"
  ],
  items: [
    {
      id: "vault-01",
      type: "image",
      src: "/images/global_black/IMG_6729.JPEG",
      phase: "PHASE 01 // TEXTILE DENSITY & FORM",
      title: "Global Tee — Heavyweight Combed Cotton Matrix",
      date: "July 2026",
      story: "Close inspection of the high-tensile 300gsm combed cotton weave on the ANTHO Global Tee in Onyx Black. Formulated to resist tropical shrinkage and maintain a sharp, boxy drop shoulder silhouette without deformation under rigorous daily wear.",
      socialLink: {
        platform: "Instagram",
        url: "https://www.instagram.com/antho.syllogi",
        label: "View Global Black Stills on IG"
      }
    },
    {
      id: "vault-02",
      type: "image",
      src: "/images/global_white/IMG_6580.JPEG",
      phase: "PHASE 02 // CHROMATIC BALANCE & COLLAR ANATOMY",
      title: "Global Tee — Crisp Chalk White Studio Silhouette",
      date: "July 2026",
      story: "Achieving true white opacity without board-like stiffness. The custom tight ribbed neckline is double-stitched to eliminate baconing and stretching through dozens of high-temperature wash cycles.",
      socialLink: {
        platform: "TikTok",
        url: "https://www.tiktok.com/@antho.syllogi",
        label: "Watch Studio Fit Reel on TikTok"
      }
    },
    {
      id: "vault-03",
      type: "image",
      src: "/images/black_prevails/IMG_4911.jpg",
      phase: "PHASE 03 // SILKSCREEN INSCRIPTION TESTING",
      title: "Prevails Tee — Streetwear Friction Testing",
      date: "August 2026",
      story: "Field testing on the streets of Lagos. The ANTHO PREVAILS silkscreen artwork utilizes custom plastisol pigment formulated with high-tensile elastic binders so the print flexes with the heavy cotton without cracking.",
      socialLink: {
        platform: "X (Twitter)",
        url: "https://x.com/syllogiantho?s=21",
        label: "Read Silkscreen Formulation Notes on X"
      }
    },
    {
      id: "vault-04",
      type: "image",
      src: "/images/white_prevails/IMG_6714.JPEG",
      phase: "PHASE 04 // YOUTH STREETWEAR PROPORTIONS",
      title: "Prevails Tee — Model Silhouette & Proportioning",
      date: "August 2026",
      story: "Engineered specifically for youth and young adult streetwear connoisseurs: wider sleeve hems, elongated back drop, and clean architectural drape over denim or cargo trousers.",
      socialLink: {
        platform: "Instagram",
        url: "https://www.instagram.com/antho.syllogi",
        label: "View Model Lookbook on Instagram"
      }
    },
    {
      id: "vault-05",
      type: "image",
      src: "/images/slideshow/1.jpg",
      phase: "PHASE 05 // CAMPAIGN LAUNCH VISUAL",
      title: "SS26 Campaign Sequence — Hero Portrait",
      date: "August 2026",
      story: "Captured in high contrast against industrial concrete in Lagos. Visualizes the defiant elegance and unapologetic swagger of contemporary Nigerian youth culture.",
      socialLink: {
        platform: "Snapchat",
        url: "https://snapchat.com/t/yXLe7p2I",
        label: "View Behind-The-Scenes on Snapchat"
      }
    },
    {
      id: "vault-06",
      type: "image",
      src: "/images/slideshow/10.jpg",
      phase: "PHASE 06 // POP-UP ARCHIVE STILL",
      title: "SS26 Campaign Sequence — Night Installation",
      date: "August 2026",
      story: "Documentation of the mobile clothing racks, ambient lighting, and high-energy music at the pop-up drop. Community members gathered to inspect and pick up reserved orders directly.",
      socialLink: {
        platform: "Instagram",
        url: "https://www.instagram.com/antho.syllogi",
        label: "View Pop-Up Highlights on IG"
      }
    },
    {
      id: "vault-07",
      type: "image",
      src: "/images/products/sweatpants/Snapchat-396574672.jpg",
      phase: "PHASE 07 // 500GSM FLEECE ANATOMY",
      title: "ANTHO “NPNG” Sweats — Stacked Fall & Pockets",
      date: "August 2026",
      story: "500gsm French terry fleece custom milled to provide thermal weight and structured stacking over low-top or chunky sneakers. Deep reinforced welt pockets and tonal inner drawcords.",
      socialLink: {
        platform: "TikTok",
        url: "https://www.tiktok.com/@antho.syllogi",
        label: "Watch Styling Reel on TikTok"
      }
    },
    {
      id: "vault-08",
      type: "image",
      src: "/images/products/polos/photo_1_2026-09-04_09-11-37.jpg",
      phase: "PHASE 08 // LUXURY PIQUE DETAILING",
      title: "ANTHO 99' Polo — Mother-of-Pearl & Chest Insignia",
      date: "August 2026",
      story: "Refining the classic pique polo into high-end youth streetwear. Boxy relaxed drape, hand-sewn genuine mother-of-pearl buttons, and tonal embroidery.",
      socialLink: {
        platform: "X (Twitter)",
        url: "https://x.com/syllogiantho?s=21",
        label: "Read Atelier Notes on X"
      }
    }
  ]
};

export default function EventArchiveFolder({ 
  folderData = CU_ARCHIVE_DATA,
  archiveNumber = "001"
}: { 
  folderData?: ArchiveFolderData;
  archiveNumber?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const activeItem = folderData.items[activeMediaIndex];

  return (
    <>
      {/* Visual Archive Folder Jacket */}
      <div 
        onClick={() => setIsOpen(true)}
        className="group cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
      >
        {/* Top Folder Tab Notch */}
        <div className="flex items-end max-w-[280px] sm:max-w-xs">
          <div className="bg-[#E5DFD5] dark:bg-[#201E1B] border-t-2 border-l-2 border-r-2 border-black/20 dark:border-white/20 px-3 sm:px-5 py-1.5 sm:py-2 rounded-t-lg flex items-center gap-2 sm:gap-3 shadow-sm group-hover:border-[#C9A96E]/80 transition-colors">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <FolderArchive className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span className="text-[9px] sm:text-xs font-mono tracking-widest uppercase font-bold text-neutral-800 dark:text-neutral-200">
                ARCHIVE // {archiveNumber}
              </span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[8px] sm:text-[9px] uppercase tracking-widest px-1.5 sm:px-2 py-0.5 bg-red-600/10 text-red-600 dark:text-red-400 font-bold border border-red-600/20">
              DECLASSIFIED
            </span>
          </div>

          <div className="ml-auto pr-2 pb-1 hidden sm:flex items-center gap-2 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
            <span>REF: {folderData.caseCode.split('//')[0].trim()}</span>
            <span>&bull;</span>
            <span>{folderData.date}</span>
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
                  {folderData.status}
                </span>
                <span className="text-xs font-mono text-[#C9A96E] font-semibold tracking-wider">
                  {folderData.date}
                </span>
                <span className="text-xs text-neutral-400 font-mono hidden sm:inline">
                  [{folderData.caseCode}]
                </span>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif tracking-tight uppercase text-neutral-900 dark:text-white group-hover:text-[#C9A96E] transition-colors">
                  {folderData.title}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                  {folderData.summary}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-500 dark:text-neutral-400 pt-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A96E]" />
                  <span>{folderData.venue} &bull; {folderData.location}</span>
                </div>
              </div>

              {/* Stat Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                {folderData.stats.map((s) => (
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
                    src={folderData.previews[0] || folderData.items[0].src} 
                    alt="Preview 1" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="absolute top-1 right-2 w-20 h-24 bg-stone-900 border border-white/20 shadow-md transform rotate-6 transition-transform group-hover:rotate-12 overflow-hidden">
                  <Image 
                    src={folderData.previews[1] || folderData.items[1].src} 
                    alt="Preview 2" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="absolute top-2 right-4 w-20 h-24 bg-stone-900 border border-white/30 shadow-lg overflow-hidden">
                  <Image 
                    src={folderData.previews[2] || folderData.items[2].src} 
                    alt="Preview 3" 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <span className="text-[10px] font-mono text-white font-bold tracking-widest">+{folderData.items.length}</span>
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
                    <h3 className="text-xs sm:text-sm font-serif font-bold uppercase tracking-wider text-neutral-900 dark:text-white line-clamp-1">
                      {folderData.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="hidden md:inline font-mono text-[10px] text-neutral-400">
                    {folderData.caseCode}
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 sm:p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors"
                    aria-label="Close Case File"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Dossier Body */}
              <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8 sm:space-y-12 divide-y divide-black/10 dark:divide-white/10 custom-scrollbar">
                
                {/* Dossier Header Info */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
                    <span className="px-2.5 py-1 bg-red-600 text-white font-bold uppercase text-[9px]">
                      RESTRICTED VAULT // PUBLIC DECLASSIFICATION
                    </span>
                    <span className="text-neutral-500 font-bold">{folderData.date}</span>
                    <span className="text-neutral-400">&bull;</span>
                    <span className="text-neutral-500">{folderData.location}</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight uppercase">
                    {folderData.title}
                  </h1>

                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans max-w-3xl">
                    {folderData.summary}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {folderData.stats.map((stat) => (
                      <div key={stat.label} className="p-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                        <span className="block text-[9px] uppercase tracking-wider text-neutral-500">{stat.label}</span>
                        <span className="font-mono text-sm font-bold text-neutral-900 dark:text-white">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary Cinema Feature (Active Media Preview) */}
                <div className="pt-8 sm:pt-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#C9A96E] font-semibold">
                      CURRENT EXHIBIT: {activeItem.phase}
                    </span>
                    <span className="text-xs font-mono text-neutral-500">
                      ENTRY {activeMediaIndex + 1} OF {folderData.items.length}
                    </span>
                  </div>

                  <div className="relative aspect-video w-full bg-black rounded-sm overflow-hidden border border-black/20 dark:border-white/20 shadow-xl">
                    {activeItem.type === 'video' ? (
                      <div className="relative w-full h-full">
                        <video
                          key={activeItem.src}
                          src={activeItem.src}
                          poster={activeItem.poster}
                          controls
                          autoPlay
                          muted={isMuted}
                          playsInline
                          className="w-full h-full object-contain"
                        />
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className="absolute top-4 right-4 p-2 bg-black/70 hover:bg-black text-white rounded-full backdrop-blur-md transition-colors z-20"
                          title={isMuted ? "Unmute" : "Mute"}
                        >
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                      </div>
                    ) : (
                      <div className="relative w-full h-full">
                        <Image
                          key={activeItem.src}
                          src={activeItem.src}
                          alt={activeItem.title}
                          fill
                          priority
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>

                  {/* Active Media Story & Context Box */}
                  <div className="p-4 sm:p-6 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-3">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <h4 className="text-base sm:text-lg font-serif font-bold uppercase tracking-tight text-neutral-900 dark:text-white">
                        {activeItem.title}
                      </h4>
                      <span className="text-xs font-mono text-neutral-500">{activeItem.date}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {activeItem.story}
                    </p>

                    <div className="pt-2 flex items-center justify-between">
                      <a
                        href={activeItem.socialLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C9A96E] hover:underline"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>{activeItem.socialLink.label} &rarr;</span>
                      </a>
                      <span className="text-[10px] font-mono text-neutral-400">
                        VIA {activeItem.socialLink.platform.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Media Strip Timeline (Horizontal Scrollable Thumbnails) */}
                <div className="pt-8 sm:pt-10 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-neutral-500 font-semibold">
                      ARCHIVE TIMELINE (TAP TO INSPECT)
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {folderData.items.length} EXHIBITS
                    </span>
                  </div>

                  <div className="flex gap-3 overflow-x-auto pb-4 pt-1 hide-scrollbar">
                    {folderData.items.map((item, index) => {
                      const isSelected = index === activeMediaIndex;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveMediaIndex(index)}
                          className={`group relative shrink-0 w-28 sm:w-36 aspect-[4/3] rounded-sm overflow-hidden border-2 transition-all duration-300 text-left ${
                            isSelected 
                              ? 'border-[#C9A96E] ring-2 ring-[#C9A96E]/30 scale-[1.02]' 
                              : 'border-black/10 dark:border-white/10 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <Image
                            src={item.type === 'video' ? (item.poster || item.src) : item.src}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          
                          {item.type === 'video' && (
                            <div className="absolute top-1.5 right-1.5 p-1 bg-black/60 rounded text-white">
                              <Film className="w-3 h-3" />
                            </div>
                          )}

                          <div className="absolute bottom-1.5 left-2 right-2">
                            <span className="block text-[8px] font-mono text-[#C9A96E] uppercase leading-none mb-0.5">
                              0{index + 1}
                            </span>
                            <span className="block text-[10px] font-bold text-white uppercase leading-tight line-clamp-1">
                              {item.title}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Complete Story / Behind-the-Scenes Process Breakdown */}
                <div className="pt-8 sm:pt-10 space-y-8">
                  <div className="border-b border-black/10 dark:border-white/10 pb-4">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#C9A96E] block mb-1">
                      CHRONOLOGICAL NARRATIVE
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif uppercase tracking-tight text-neutral-900 dark:text-white">
                      The Process: Step-by-Step Production Log
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {folderData.items.map((item, idx) => (
                      <div 
                        key={item.id}
                        className={`p-4 sm:p-5 border transition-colors ${
                          idx === activeMediaIndex
                            ? 'border-[#C9A96E] bg-[#C9A96E]/5 dark:bg-[#C9A96E]/10'
                            : 'border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                          <span className="text-[9px] font-mono uppercase tracking-widest text-[#C9A96E] font-bold">
                            {item.phase}
                          </span>
                          <span className="text-[10px] font-mono text-neutral-400">{item.date}</span>
                        </div>

                        <h4 className="text-sm sm:text-base font-serif font-bold uppercase text-neutral-900 dark:text-white mb-2">
                          {item.title}
                        </h4>

                        <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
                          {item.story}
                        </p>

                        <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/5">
                          <button
                            type="button"
                            onClick={() => {
                              setActiveMediaIndex(idx);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 hover:text-black dark:hover:text-white"
                          >
                            [ Inspect In Player &uarr; ]
                          </button>

                          <a
                            href={item.socialLink.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C9A96E] hover:underline flex items-center gap-1.5"
                          >
                            <span>Open {item.socialLink.platform} Post</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Disclaimer & Sign-off */}
                <div className="pt-8 text-center text-xs font-mono text-neutral-500 space-y-2">
                  <p className="uppercase tracking-widest">
                    ANTHO SYLLOGI // DECLASSIFIED ARCHIVAL DIVISION
                  </p>
                  <p className="text-[10px] text-neutral-400">
                    &copy; 2026 ANTHO. All photo, video, and pattern rights reserved.
                  </p>
                </div>

              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </>
  );
}

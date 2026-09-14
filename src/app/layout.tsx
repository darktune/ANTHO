import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Playfair_Display } from "next/font/google";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.anthosyllogi.xyz";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF9" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ANTHO — Premium Contemporary Nigerian Fashion & Streetwear",
    template: "%s | ANTHO",
  },
  description:
    "ANTHO is a premier Nigerian luxury streetwear atelier blending architectural silhouettes with cultural roots. Shop limited drops, classic polos, heavyweight sweatpants, and archival graphic tees.",
  keywords: [
    "ANTHO",
    "ANTHO Syllogi",
    "Nigerian fashion",
    "premium clothing",
    "streetwear Nigeria",
    "Lagos fashion",
    "African luxury fashion",
    "luxury streetwear",
    "Nigerian clothing brand",
    "contemporary streetwear Lagos",
  ],
  authors: [{ name: "ANTHO", url: siteUrl }],
  creator: "ANTHO",
  publisher: "ANTHO",
  manifest: "/manifest.json",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteUrl,
    siteName: "ANTHO",
    title: "ANTHO — Premium Contemporary Nigerian Fashion",
    description:
      "Premier Nigerian luxury streetwear atelier blending architectural silhouettes with cultural roots. Shop limited drops.",
    images: [
      {
        url: "/images/antho-shoot/IMG_3806.JPG",
        width: 1200,
        height: 630,
        alt: "ANTHO — Contemporary Nigerian Streetwear & Editorial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ANTHO — Premium Contemporary Nigerian Fashion",
    description:
      "Premier Nigerian luxury streetwear atelier blending architectural silhouettes with cultural roots.",
    creator: "@syllogiantho",
    images: ["/images/antho-shoot/IMG_3806.JPG"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSans.variable} ${playfairDisplay.variable} scroll-smooth`}
    >
      <head suppressHydrationWarning>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Instrument_Sans, Playfair_Display } from "next/font/google";
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

export const metadata: Metadata = {
  title: {
    default: "ANTHO — Premium Nigerian Fashion",
    template: "%s | ANTHO",
  },
  description:
    "ANTHO is a premium Nigerian clothing brand blending contemporary design with cultural roots. Shop modern, bold, street-luxury fashion made for the culture.",
  keywords: [
    "ANTHO",
    "Nigerian fashion",
    "premium clothing",
    "streetwear Nigeria",
    "Lagos fashion",
    "African fashion",
    "luxury streetwear",
    "Nigerian clothing brand",
  ],
  authors: [{ name: "ANTHO" }],
  creator: "ANTHO",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "ANTHO",
    title: "ANTHO — Premium Nigerian Fashion",
    description:
      "Premium Nigerian clothing brand. Contemporary design rooted in culture.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ANTHO — Premium Nigerian Fashion",
    description:
      "Premium Nigerian clothing brand. Contemporary design rooted in culture.",
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
      className={`${instrumentSans.variable} ${playfairDisplay.variable} scroll-smooth`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}

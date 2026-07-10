import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, Playfair_Display } from 'next/font/google';
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { OrganizationJsonLd } from "@/components/JsonLd";
import LayoutWidgets from "@/components/LayoutWidgets";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const GA_ID = 'G-QE08T7YJFS';

export const metadata: Metadata = {
  title: {
    default: "YlooTrips — Safe, Budget & Luxury India Tour Packages | Domestic & International Trips",
    template: "%s | YlooTrips — India Travel Experts"
  },
  description: "YlooTrips — Book safe, affordable & luxury India tour packages. Budget trips from ₹9,999. Luxury packages with 5★ hotels. Manali, Goa, Kashmir, Kerala, Bali, Dubai, Maldives & more. 4.9★ rated · 25,000+ travelers · MSME certified.",
  keywords: [
    // Budget
    "budget trips India",
    "affordable tour packages India",
    "cheap India tour packages",
    "best budget travel company India",
    // Safe
    "safe trips India",
    "safe travel company India",
    "trusted travel agency India",
    // Luxury
    "luxury trips India",
    "luxury tour packages India",
    "luxury travel company India",
    "premium India tour packages",
    // Domestic destinations
    "Manali trip package",
    "Kedarnath yatra package",
    "Goa tour package",
    "Kerala tour package",
    "Kashmir tour package",
    "Rajasthan tour",
    "Spiti Valley trip",
    "Ladakh tour package",
    "Andaman tour package",
    // International
    "international tour packages from India",
    "Bali tour package from India",
    "Dubai tour package from India",
    "Thailand trip from India",
    "Maldives luxury package from India",
    "Europe tour from India",
    // Brand
    "YlooTrips",
    "Yloo Trips",
    // Travel type
    "India trip planner",
    "best travel company India",
    "MSME certified travel agency",
    "group tours India",
    "honeymoon packages India",
    "solo travel India",
    "solo female travel India",
    "family trips India",
    "weekend trips from Delhi",
    "Himalaya trekking packages",
    "domestic trips India",
    "Golden Triangle tour",
  ].join(", "),
  openGraph: {
    title: "YlooTrips | Safe, Budget & Luxury India Tour Packages — Domestic & International",
    description: "Safe, affordable & luxury India trips from ₹9,999. Budget trips to Manali, Goa, Kashmir, luxury Maldives, Bali, Dubai & more. 4.9★ rated · 25,000+ travelers · MSME certified.",
    type: "website",
    siteName: "YlooTrips",
    url: "https://www.ylootrips.com",
    images: [
      {
        url: "https://www.ylootrips.com/api/og",
        width: 1200,
        height: 630,
        alt: "YlooTrips — Safe & Budget India Tour Packages",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YlooTrips | Safe & Budget India Tour Packages",
    description: "Safe, affordable domestic & international trips from India. Manali, Kedarnath, Bali, Dubai & more. 4.9★ rated · 25,000+ travelers.",
    images: ["https://www.ylootrips.com/api/og"],
  },
  alternates: {
    canonical: "https://www.ylootrips.com",
    languages: {
      "en-US": "https://www.ylootrips.com",
      "en-GB": "https://www.ylootrips.com",
      "en-AU": "https://www.ylootrips.com",
      "en-CA": "https://www.ylootrips.com",
      "en-IE": "https://www.ylootrips.com",
      "en": "https://www.ylootrips.com",
    },
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png', sizes: '512x512' },
      { url: '/favicon.png', type: 'image/png', sizes: '192x192' },
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
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
  verification: {
    google: '9C1_Q3HeFI5G6i2JTyjPllbVtlomtZQzOsWDVekljY0',
  },
  // GEO: help AI engines understand the site content and purpose
  other: {
    'ai-content-declaration': 'human-authored',
    'revisit-after': '3 days',
    'rating': 'general',
    'geo.region': 'IN-DL',
    'geo.placename': 'New Delhi, India',
    'geo.position': '28.6139;77.2090',
    'ICBM': '28.6139, 77.2090',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#ffffff" />
        {/* Viewport — critical for mobile rendering */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        {/* GEO: AI search engine discovery link */}
        <link rel="ai-content-declaration" href="/llms.txt" />
        {/* GEO: Perplexity / Bing / DuckDuckGo AI meta */}
        <meta name="perplexity-origin" content="ylootrips.com" />
        <meta name="revisit-after" content="3 days" />
        <meta name="rating" content="general" />
        {/* Geo-targeting for local SEO */}
        <meta name="geo.region" content="IN-DL" />
        <meta name="geo.placename" content="New Delhi, India" />
        <meta name="geo.position" content="28.6139;77.2090" />
        <meta name="ICBM" content="28.6139, 77.2090" />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <OrganizationJsonLd />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>

        <Providers>
          <Suspense fallback={<div className="h-24 bg-cream" />}>
            <Header />
          </Suspense>
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          {/* Non-critical widgets lazy-loaded after main content */}
          <LayoutWidgets />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

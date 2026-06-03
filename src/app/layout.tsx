import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Nav from '@/components/ui/Nav';
import Footer from '@/components/ui/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import SmoothScroll from '@/components/ui/SmoothScroll';
import GlobalBackground from '@/components/layout/GlobalBackground';
import Preloader from '@/components/ui/Preloader';

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

// Resolve the canonical origin: Vercel's production URL in prod, localhost in dev.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Ezequiel Breiterman — Motion Designer, Creative Developer & Technologist',
  description:
    'Buenos Aires-based creative technologist combining motion graphics, video editing, 3D animation, web development, and AI-powered workflows to craft visual experiences that resonate.',
  keywords: [
    'motion designer',
    'video editor',
    'creative developer',
    '3D animation',
    'Buenos Aires',
    'portfolio',
    'GSAP',
    'After Effects',
    'Blender',
    'React',
    'AI creative',
  ],
  authors: [{ name: 'Ezequiel Breiterman' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Ezequiel Breiterman — Motion, Code & AI',
    description:
      'Motion, code, and AI-crafted visual experiences. Portfolio of Ezequiel Breiterman.',
    siteName: 'Ezequiel Breiterman Portfolio',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Ezequiel Breiterman — Motion, Code & AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ezequiel Breiterman — Motion, Code & AI',
    description:
      'Motion, code, and AI-crafted visual experiences. Portfolio of Ezequiel Breiterman.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <Preloader />
        <SmoothScroll>
          <GlobalBackground />
          <CustomCursor />
          <Nav />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

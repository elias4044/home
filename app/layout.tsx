import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
// import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

const BASE_URL = 'https://elias4044.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Elias Gulam — Full-Stack Developer & Cybersecurity Enthusiast',
    template: '%s | Elias Gulam',
  },
  description:
    'Portfolio of Elias Gulam (elias4044) — full-stack developer and cybersecurity enthusiast based in Sweden. Building secure systems, thoughtful interfaces, and open-source tools.',
  keywords: [
    'Elias Gulam',
    'elias4044',
    'full-stack developer',
    'cybersecurity',
    'Next.js developer',
    'React developer',
    'TypeScript',
    'Sweden',
    'web development',
    'open source',
    'portfolio',
  ],
  authors: [{ name: 'Elias Gulam', url: BASE_URL }],
  creator: 'Elias Gulam',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Elias Gulam',
    title: 'Elias Gulam — Full-Stack Developer & Cybersecurity Enthusiast',
    description:
      'Portfolio of Elias Gulam — full-stack developer and cybersecurity enthusiast based in Sweden. 10+ projects shipped across web, security, and open-source.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Elias Gulam — Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@elias4044_',
    creator: '@elias4044_',
    title: 'Elias Gulam — Full-Stack Developer & Cybersecurity Enthusiast',
    description:
      'Portfolio of Elias Gulam — full-stack developer and cybersecurity enthusiast based in Sweden.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: 'technology',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {/* <Analytics /> */}
      </body>
    </html>
  )
}

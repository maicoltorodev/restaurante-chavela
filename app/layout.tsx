import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://chavelacocina.vercel.app'),
  title: 'Chavela Cocina Mexicana | Taquitos de un Mundo Raro',
  description: 'Chavela Cocina Mexicana - Auténtica cocina con tacos artesanales, sabores vibrantes y un ambiente único. Taquitos de un mundo raro.',
  generator: 'v0.app',
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://chavelacocina.vercel.app/',
    siteName: 'Chavela Cocina Mexicana',
    title: 'Chavela Cocina Mexicana | Taquitos de un Mundo Raro',
    description: 'Chavela Cocina Mexicana - Auténtica cocina con tacos artesanales, sabores vibrantes y un ambiente único.',
    images: [
      {
        url: '/imagen-metadata.jpg',
        width: 1200,
        height: 630,
        alt: 'Chavela Cocina Mexicana - Taquitos de un Mundo Raro',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chavela Cocina Mexicana | Taquitos de un Mundo Raro',
    description: 'Chavela Cocina Mexicana - Auténtica cocina con tacos artesanales, sabores vibrantes y un ambiente único.',
    images: ['/imagen-metadata.jpg'],
    creator: '@chavelacocina',
  },
  icons: {
    icon: [
      {
        url: '/images/logo.png',
      },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1210',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${dmSans.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <Toaster position="top-center" richColors />
        <Analytics />
      </body>
    </html>
  )
}

import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
  title: 'Chavela Cocina Mexicana | Taquitos de un Mundo Raro',
  description: 'Chavela Cocina Mexicana - Autentica cocina mexicana con tacos artesanales, sabores vibrantes y un ambiente unico. Taquitos de un mundo raro.',
  generator: 'v0.app',
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
        <Analytics />
      </body>
    </html>
  )
}

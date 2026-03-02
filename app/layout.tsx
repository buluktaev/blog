import type { Metadata } from 'next'
import { GeistMono } from 'geist/font/mono'
import { Providers } from '@/components/Providers'
import { Header } from '@/components/Header'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Bulat', template: '%s | Bulat' },
  description: 'Писать о дизайне и AI-инструментах',
  metadataBase: new URL('https://blog-buluktaev.vercel.app'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={GeistMono.variable}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}

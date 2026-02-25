import type { Metadata } from 'next'
import { sora } from '@/lib/fonts'
import { createMetadata } from '@/lib/metadata'
import { Navbar, Footer } from '@/components/layout'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

export const metadata: Metadata = createMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <body className={`${sora.variable} font-sans antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  )
}

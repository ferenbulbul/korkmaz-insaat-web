import type { Metadata } from 'next'
import { sora, fraunces } from '@/lib/fonts'
import { createMetadata } from '@/lib/metadata'
import { Navbar, Footer } from '@/components/layout'
import ConditionalFooter from '@/components/layout/ConditionalFooter'
import { Toaster } from '@/components/ui/sonner'
import { getBlogVisible } from '@/services/settings'
import './globals.css'

export const metadata: Metadata = createMetadata()

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const blogVisible = await getBlogVisible()

  return (
    <html lang="tr">
      <body className={`${sora.variable} ${fraunces.variable} font-sans antialiased`}>
        <Navbar showBlog={blogVisible} />
        <main className="min-h-screen">{children}</main>
        <ConditionalFooter>
          <Footer showBlog={blogVisible} />
        </ConditionalFooter>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}

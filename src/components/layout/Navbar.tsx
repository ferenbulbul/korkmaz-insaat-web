'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/constants/navigation'
import { Button } from '@/components/ui/button'
import Logo from './Logo'
import NavbarMobile from './NavbarMobile'

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHomeTop = pathname === '/' && !scrolled

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300',
          isHomeTop
            ? 'bg-transparent'
            : 'border-b border-border/40 bg-white/95 backdrop-blur-xl shadow-sm shadow-black/[0.03]',
        )}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Logo variant={isHomeTop ? 'light' : 'dark'} size="md" />

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-colors',
                    isHomeTop
                      ? 'text-white/75 hover:text-white'
                      : 'text-foreground/50 hover:text-foreground',
                    'after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-accent after:transition-all after:duration-300 hover:after:w-2/3',
                    isActive && (isHomeTop ? 'text-white after:w-2/3' : 'text-foreground after:w-2/3')
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTA + Mobile hamburger */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              className={cn(
                'hidden text-sm font-semibold text-white md:inline-flex',
                isHomeTop
                  ? 'border border-white/25 bg-white/10 backdrop-blur hover:bg-white/15'
                  : 'bg-accent hover:bg-accent/90',
              )}
              size="default"
            >
              <Link href="/iletisim">Bize Ulasin</Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'md:hidden',
                isHomeTop
                  ? 'text-white hover:bg-white/10'
                  : 'text-foreground hover:bg-secondary',
              )}
              onClick={() => setMobileOpen(true)}
              aria-label="Menuyu ac"
            >
              <Menu className="size-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <NavbarMobile open={mobileOpen} onOpenChange={setMobileOpen} />

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-20" />
    </>
  )
}

export default Navbar

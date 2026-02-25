'use client'

import { useState } from 'react'
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
  const pathname = usePathname()

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-border/40 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Logo variant="dark" size="md" />

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
                    'relative px-4 py-2 text-sm font-medium text-foreground/50 transition-colors hover:text-foreground',
                    'after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-accent after:transition-all after:duration-300 hover:after:w-2/3',
                    isActive && 'text-foreground after:w-2/3'
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
              className="hidden bg-accent text-sm font-semibold text-white hover:bg-accent/90 md:inline-flex"
              size="default"
            >
              <Link href="/iletisim">Bize Ulasin</Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:bg-secondary md:hidden"
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

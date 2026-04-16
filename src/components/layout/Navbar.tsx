'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/constants/navigation'
import { Button } from '@/components/ui/button'
import Logo from './Logo'
import NavbarMobile from './NavbarMobile'

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Hide the site navbar on admin routes
  if (pathname.startsWith('/admin')) return null

  const isHomeTop = pathname === '/' && !scrolled

  const handleMouseEnter = useCallback((href: string) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current)
      closeTimeout.current = null
    }
    setOpenDropdown(href)
  }, [])

  const handleMouseLeave = useCallback(() => {
    closeTimeout.current = setTimeout(() => {
      setOpenDropdown(null)
    }, 150)
  }, [])

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
              const hasChildren = item.children && item.children.length > 0
              const isOpen = openDropdown === item.href

              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => hasChildren && handleMouseEnter(item.href)}
                  onMouseLeave={() => hasChildren && handleMouseLeave()}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'relative flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors',
                      isHomeTop
                        ? 'text-white/75 hover:text-white'
                        : 'text-foreground/50 hover:text-foreground',
                      'after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-accent after:transition-all after:duration-300 hover:after:w-2/3',
                      isActive && (isHomeTop ? 'text-white after:w-2/3' : 'text-foreground after:w-2/3')
                    )}
                  >
                    {item.label}
                    {hasChildren && (
                      <ChevronDown className={cn(
                        'size-3.5 transition-transform duration-200',
                        isOpen && 'rotate-180'
                      )} />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {hasChildren && (
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 top-full z-50 min-w-[200px] pt-2"
                        >
                          <div className="overflow-hidden rounded-xl border border-border/60 bg-white shadow-xl shadow-black/[0.08]">
                            <div className="py-1.5">
                              {item.children!.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setOpenDropdown(null)}
                                  className="flex items-center px-4 py-2.5 text-sm text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
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

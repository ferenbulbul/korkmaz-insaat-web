'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Phone, Mail, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/constants/navigation'
import { siteConfig } from '@/config/site'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet'
import Logo from './Logo'

interface NavbarMobileProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const NavbarMobile = ({ open, onOpenChange }: NavbarMobileProps) => {
  const pathname = usePathname()
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const handleLinkClick = () => {
    onOpenChange(false)
  }

  const toggleExpand = (href: string) => {
    setExpandedItem((prev) => (prev === href ? null : href))
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="flex w-80 flex-col p-0">
        {/* Header with logo */}
        <SheetHeader className="border-b border-border/60 px-6 py-5">
          <SheetTitle className="sr-only">Navigasyon Menusu</SheetTitle>
          <SheetDescription className="sr-only">
            Site navigasyon baglantilari
          </SheetDescription>
          <Logo variant="dark" size="md" />
        </SheetHeader>

        {/* Navigation links */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href)
              const hasChildren = item.children && item.children.length > 0
              const isExpanded = expandedItem === item.href

              return (
                <li key={item.href}>
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={handleLinkClick}
                      className={cn(
                        'flex flex-1 items-center rounded-lg px-4 py-3 text-[13px] font-medium tracking-wide transition-colors',
                        isActive
                          ? 'bg-accent/10 font-semibold text-accent'
                          : 'text-foreground/70 hover:bg-secondary hover:text-foreground'
                      )}
                    >
                      {item.label}
                    </Link>
                    {hasChildren && (
                      <button
                        onClick={() => toggleExpand(item.href)}
                        className="flex size-10 items-center justify-center rounded-lg text-foreground/50 transition-colors hover:bg-secondary hover:text-foreground"
                        aria-label={isExpanded ? 'Alt menüyü kapat' : 'Alt menüyü aç'}
                      >
                        <ChevronDown className={cn(
                          'size-4 transition-transform duration-200',
                          isExpanded && 'rotate-180'
                        )} />
                      </button>
                    )}
                  </div>

                  {/* Children submenu */}
                  {hasChildren && isExpanded && (
                    <ul className="ml-4 mt-1 space-y-0.5 border-l border-gold-500/30 pl-3">
                      {item.children!.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={handleLinkClick}
                            className="flex items-center rounded-lg px-3 py-2.5 text-[13px] text-foreground/60 transition-colors hover:bg-secondary hover:text-foreground"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer with CTA and contact info */}
        <SheetFooter className="border-t border-border/60 px-6 py-6">
          <Button
            asChild
            className="w-full rounded-lg bg-accent text-[13px] font-semibold uppercase tracking-[0.1em] text-white hover:bg-accent/90"
            size="lg"
          >
            <Link href="/iletisim" onClick={handleLinkClick}>
              Bize Ulaşın
            </Link>
          </Button>

          <div className="mt-5 space-y-3">
            <a
              href={`tel:${siteConfig.links.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-3 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              <Phone className="size-4 text-gold-500/60" />
              {siteConfig.links.phone}
            </a>
            <a
              href={`mailto:${siteConfig.links.email}`}
              className="flex items-center gap-3 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="size-4 text-gold-500/60" />
              {siteConfig.links.email}
            </a>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default NavbarMobile

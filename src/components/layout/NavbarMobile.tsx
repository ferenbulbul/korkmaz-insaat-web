'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Phone, Mail } from 'lucide-react'
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

  const handleLinkClick = () => {
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="flex w-80 flex-col p-0">
        {/* Header with logo */}
        <SheetHeader className="border-b px-6 py-5">
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

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    className={cn(
                      'flex items-center rounded-md px-4 py-3 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-accent/10 text-accent font-semibold'
                        : 'text-foreground/70 hover:bg-secondary hover:text-foreground'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer with CTA and contact info */}
        <SheetFooter className="border-t px-6 py-6">
          <Button
            asChild
            className="w-full bg-accent font-semibold text-white hover:bg-accent/90"
            size="lg"
          >
            <Link href="/iletisim" onClick={handleLinkClick}>
              Bize Ulasin
            </Link>
          </Button>

          <div className="mt-4 space-y-2">
            <a
              href={`tel:${siteConfig.links.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Phone className="size-4" />
              {siteConfig.links.phone}
            </a>
            <a
              href={`mailto:${siteConfig.links.email}`}
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="size-4" />
              {siteConfig.links.email}
            </a>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default NavbarMobile

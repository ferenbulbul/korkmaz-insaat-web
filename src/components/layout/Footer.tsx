import Link from 'next/link'
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import { FOOTER_SECTIONS } from '@/constants/navigation'
import Container from './Container'
import Logo from './Logo'

const socialLinks = [
  {
    label: 'Instagram',
    href: siteConfig.social.instagram,
    icon: Instagram,
  },
] as const

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="noise-overlay relative bg-[#1C1917] text-stone-300">
      {/* Top gold line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent to-transparent" />

      {/* Main footer content */}
      <Container className="py-14 md:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Logo + description + social */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo variant="light" size="lg" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-stone-400">
              Gönen, Balıkesir&apos;de güvenilir müteahhit. Konut projeleri ve
              modern yaşam alanlarında kaliteli işçilik ve zamanında teslim.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn(
                    'flex size-10 items-center justify-center rounded-lg',
                    'border border-white/8 bg-white/5 text-stone-400 transition-all duration-300',
                    'hover:border-gold-500/30 hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20'
                  )}
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2-3: Footer sections from constant */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white">
                {section.title}
              </h3>
              <div className="mt-3 h-px w-10 bg-gold-500/40" />
              <ul className="mt-5 space-y-3.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-stone-400 transition-colors duration-200 hover:text-gold-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 4: Contact info */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white">
              İletişim
            </h3>
            <div className="mt-3 h-px w-10 bg-gold-500/40" />
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.links.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-stone-400 transition-colors duration-200 hover:text-gold-300"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-gold-500/60" />
                  <span>{siteConfig.links.address}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.links.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-sm text-stone-400 transition-colors duration-200 hover:text-gold-300"
                >
                  <Phone className="size-4 shrink-0 text-gold-500/60" />
                  <span>{siteConfig.links.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.links.email}`}
                  className="flex items-center gap-3 text-sm text-stone-400 transition-colors duration-200 hover:text-gold-300"
                >
                  <Mail className="size-4 shrink-0 text-gold-500/60" />
                  <span>{siteConfig.links.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom copyright bar */}
      <div className="border-t border-white/8">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-[11px] tracking-wide text-stone-500">
            &copy; {currentYear} {siteConfig.name}. Tüm hakları saklıdır.
          </p>
          <p className="text-[11px] tracking-[0.2em] text-stone-600">
            Kalite ve güvenin adresi
          </p>
        </Container>
      </div>
    </footer>
  )
}

export default Footer

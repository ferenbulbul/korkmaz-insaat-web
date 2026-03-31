import Link from 'next/link'
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Linkedin,
  Facebook,
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
  {
    label: 'LinkedIn',
    href: siteConfig.social.linkedin,
    icon: Linkedin,
  },
  {
    label: 'Facebook',
    href: siteConfig.social.facebook,
    icon: Facebook,
  },
] as const

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="noise-overlay relative bg-[#1C1917] text-stone-300">
      {/* Top gold line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-accent to-transparent" />

      {/* Main footer content */}
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Logo + description + social */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo variant="light" size="lg" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone-400">
              25 yillik deneyimimizle konut, ticari yapi ve altyapi
              projelerinde guvenilir ve kaliteli insaat hizmetleri sunuyoruz.
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
                    'flex size-10 items-center justify-center rounded-md',
                    'bg-white/8 text-stone-400 transition-all duration-300',
                    'hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20'
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
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                {section.title}
              </h3>
              <div className="mt-2 h-[1px] w-8 bg-accent/40" />
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-stone-400 transition-colors hover:text-gold-300"
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
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Iletisim
            </h3>
            <div className="mt-2 h-[1px] w-8 bg-accent/40" />
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.links.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-stone-400 transition-colors hover:text-gold-300"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0" />
                  <span>{siteConfig.links.address}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.links.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-sm text-stone-400 transition-colors hover:text-gold-300"
                >
                  <Phone className="size-4 shrink-0" />
                  <span>{siteConfig.links.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.links.email}`}
                  className="flex items-center gap-3 text-sm text-stone-400 transition-colors hover:text-gold-300"
                >
                  <Mail className="size-4 shrink-0" />
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
          <p className="text-xs text-stone-500">
            &copy; {currentYear} {siteConfig.name}. Tum haklari saklidir.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-stone-500">
              Kalite ve guvenin adresi
            </span>
          </div>
        </Container>
      </div>
    </footer>
  )
}

export default Footer

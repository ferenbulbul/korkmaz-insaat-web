import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CTABannerProps {
  title: string
  description: string
  buttonText: string
  href: string
  className?: string
}

const CTABanner = ({
  title,
  description,
  buttonText,
  href,
  className,
}: CTABannerProps) => {
  return (
    <section
      className={cn(
        'noise-overlay relative overflow-hidden bg-primary px-6 py-20 md:py-24',
        className,
      )}
    >
      {/* Diagonal gold pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, transparent, transparent 60px, #B8962E 60px, #B8962E 61px)',
        }}
      />

      {/* Top gold accent line */}
      <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-accent to-transparent" />

      {/* Tick corners */}
      <span className="tick-corner tl pointer-events-none hidden md:block" style={{ top: '1.5rem', left: '1.5rem' }} />
      <span className="tick-corner br pointer-events-none hidden md:block" style={{ bottom: '1.5rem', right: '1.5rem' }} />

      <div className="relative mx-auto max-w-3xl text-center">
        {/* Overline hairline */}
        <div className="mx-auto mb-8 h-px w-16 bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />

        <h2 className="font-sans text-2xl font-bold tracking-tight text-primary-foreground md:text-3xl lg:text-4xl">
          {title}
        </h2>
        <p className="mt-4 font-sans text-sm leading-relaxed text-primary-foreground/55 md:text-base">
          {description}
        </p>
        <div className="mt-10">
          <Link
            href={href}
            className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-lg bg-accent px-8 font-sans text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-all duration-300 hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/30 active:scale-[0.98]"
          >
            {buttonText}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CTABanner

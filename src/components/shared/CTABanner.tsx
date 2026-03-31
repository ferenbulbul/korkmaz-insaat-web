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
        'relative overflow-hidden bg-primary px-6 py-16 md:py-20',
        className,
      )}
    >
      {/* Diagonal gold pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, transparent, transparent 60px, #B8962E 60px, #B8962E 61px)',
        }}
      />

      {/* Gold accent line */}
      <div className="pointer-events-none absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl lg:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-primary-foreground/60 md:text-lg">
          {description}
        </p>
        <div className="mt-8">
          <Link
            href={href}
            className="group inline-flex h-13 items-center justify-center gap-2 rounded-lg bg-accent px-8 text-[15px] font-semibold text-white shadow-lg shadow-accent/20 transition-all duration-300 hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/30 active:scale-[0.98]"
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

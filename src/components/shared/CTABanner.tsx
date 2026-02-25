import Link from 'next/link'
import { Button } from '@/components/ui/button'
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
        'bg-accent px-6 py-16 md:py-20',
        className,
      )}
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold text-accent-foreground md:text-3xl">
          {title}
        </h2>
        <p className="mt-4 text-accent-foreground/80 md:text-lg">
          {description}
        </p>
        <div className="mt-8">
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href={href}>{buttonText}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CTABanner

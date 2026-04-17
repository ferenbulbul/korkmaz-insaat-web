import { cn } from '@/lib/utils'

interface SectionTitleProps {
  overline?: string
  title: string
  description?: string
  alignment?: 'left' | 'center'
  dark?: boolean
  serif?: boolean
  className?: string
}

const SectionTitle = ({
  overline,
  title,
  description,
  alignment = 'left',
  dark = false,
  serif = false,
  className,
}: SectionTitleProps) => {
  const isCenter = alignment === 'center'

  return (
    <div
      className={cn(
        'mb-10 md:mb-16',
        isCenter && 'text-center',
        className,
      )}
    >
      {overline && (
        <div className={cn('mb-4 flex items-center gap-3', isCenter && 'justify-center')}>
          <div className="h-[1px] w-12 bg-accent" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent md:text-xs">
            {overline}
          </p>
          {isCenter && <div className="h-[1px] w-12 bg-accent" />}
        </div>
      )}
      <h2
        className={cn(
          'tracking-tight',
          serif
            ? 'font-display text-4xl font-normal leading-[1.05] md:text-5xl lg:text-6xl'
            : 'text-3xl font-extrabold md:text-4xl lg:text-5xl',
          dark ? 'text-primary-foreground' : 'text-foreground',
        )}
        style={serif ? { fontVariationSettings: "'opsz' 72" } : undefined}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 max-w-2xl text-base text-muted-foreground md:text-lg',
            isCenter && 'mx-auto',
            dark && 'text-primary-foreground/70',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionTitle

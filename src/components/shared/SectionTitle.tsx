import { cn } from '@/lib/utils'

interface SectionTitleProps {
  overline?: string
  title: string
  description?: string
  alignment?: 'left' | 'center'
  dark?: boolean
  className?: string
}

const SectionTitle = ({
  overline,
  title,
  description,
  alignment = 'left',
  dark = false,
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
          <div className="h-[1px] w-8 bg-accent" />
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent md:text-xs">
            {overline}
          </p>
          {isCenter && <div className="h-[1px] w-8 bg-accent" />}
        </div>
      )}
      <h2
        className={cn(
          'text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl',
          dark ? 'text-primary-foreground' : 'text-foreground',
        )}
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

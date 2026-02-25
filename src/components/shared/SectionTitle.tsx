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
        <p
          className={cn(
            'mb-3 text-xs font-bold uppercase tracking-widest text-accent md:text-sm',
          )}
        >
          {overline}
        </p>
      )}
      <h2
        className={cn(
          'text-2xl font-bold tracking-tight md:text-4xl',
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

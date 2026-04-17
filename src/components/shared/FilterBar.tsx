'use client'

import { cn } from '@/lib/utils'

interface FilterBarProps {
  categories: { value: string; label: string }[]
  active: string
  onChange: (value: string) => void
  className?: string
  label?: string
}

const FilterBar = ({ categories, active, onChange, className, label }: FilterBarProps) => {
  const allCategories = [{ value: 'all', label: 'Tümü' }, ...categories]

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-6 gap-y-3',
        className,
      )}
    >
      {label && (
        <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          {label}
        </span>
      )}
      {allCategories.map((category) => {
        const isActive = active === category.value

        return (
          <button
            key={category.value}
            type="button"
            onClick={() => onChange(category.value)}
            className={cn(
              'relative shrink-0 pb-2 pt-1 text-sm transition-colors duration-200',
              isActive
                ? 'font-semibold text-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {category.label}
            <span
              className={cn(
                'absolute inset-x-0 bottom-0 h-[2px] bg-accent transition-transform duration-300 ease-out',
                isActive ? 'scale-x-100' : 'scale-x-0',
              )}
              style={{ transformOrigin: 'left' }}
            />
          </button>
        )
      })}
    </div>
  )
}

export default FilterBar

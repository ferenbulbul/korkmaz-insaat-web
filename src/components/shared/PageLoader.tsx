'use client'

import { cn } from '@/lib/utils'

interface PageLoaderProps {
  className?: string
}

const PageLoader = ({ className }: PageLoaderProps) => {
  return (
    <div
      className={cn(
        'flex min-h-[60vh] items-center justify-center',
        className,
      )}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Spinning ring */}
        <div className="relative size-10">
          <div className="absolute inset-0 rounded-full border-2 border-stone-200" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-accent" />
        </div>
        {/* Brand text */}
        <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground">
          KORKMAZ INSAAT
        </p>
      </div>
    </div>
  )
}

export default PageLoader

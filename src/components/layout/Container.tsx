import { cn } from '@/lib/utils'

interface ContainerProps {
  className?: string
  narrow?: boolean
  children: React.ReactNode
}

const Container = ({ className, narrow, children }: ContainerProps) => {
  return (
    <div
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8',
        narrow ? 'max-w-4xl' : 'max-w-7xl',
        className
      )}
    >
      {children}
    </div>
  )
}

export default Container

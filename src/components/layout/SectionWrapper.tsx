import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  className?: string
  id?: string
  bgColor?: 'white' | 'muted' | 'dark'
  children: React.ReactNode
}

const bgColorMap = {
  white: 'bg-background',
  muted: 'bg-secondary',
  dark: 'bg-primary text-primary-foreground',
} as const

const SectionWrapper = ({
  className,
  id,
  bgColor = 'white',
  children,
}: SectionWrapperProps) => {
  return (
    <section
      id={id}
      className={cn('py-16 md:py-24', bgColorMap[bgColor], className)}
    >
      {children}
    </section>
  )
}

export default SectionWrapper

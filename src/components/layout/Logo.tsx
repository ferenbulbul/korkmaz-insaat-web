import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  variant?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const heightMap = {
  sm: 'h-9',
  md: 'h-12',
  lg: 'h-14',
} as const

const Logo = ({ variant = 'dark', size = 'md', className }: LogoProps) => {
  return (
    <Link
      href="/"
      className={cn(
        'inline-flex items-center overflow-hidden rounded-md',
        variant === 'light' && 'bg-white/95 px-2 py-1',
        className
      )}
    >
      <Image
        src="/logo.jpeg"
        alt="Korkmaz Insaat"
        width={200}
        height={200}
        className={cn('w-auto object-contain', heightMap[size])}
        priority
      />
    </Link>
  )
}

export default Logo

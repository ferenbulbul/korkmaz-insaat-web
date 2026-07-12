import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  variant?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const heightMap = {
  sm: 'h-14',
  md: 'h-[84px]',
  lg: 'h-[104px]',
} as const

const Logo = ({ variant = 'dark', size = 'md', className }: LogoProps) => {
  return (
    <Link href="/" className={cn('inline-flex items-center', className)}>
      <Image
        src={variant === 'light' ? '/logo-light-2.png' : '/logo-2.png'}
        alt="Korkmaz İnşaat"
        width={1249}
        height={1431}
        className={cn('w-auto object-contain', heightMap[size])}
        priority
      />
    </Link>
  )
}

export default Logo

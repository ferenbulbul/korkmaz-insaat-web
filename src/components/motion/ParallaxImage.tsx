'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ParallaxImageProps {
  children: React.ReactNode
  /** Parallax intensity: 0.1 = subtle, 0.3 = medium, 0.5 = strong */
  speed?: number
  className?: string
  /** Overflow wrapper class — controls the visible "window" */
  wrapperClassName?: string
}

const ParallaxImage = ({
  children,
  speed = 0.15,
  className,
  wrapperClassName,
}: ParallaxImageProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Map scroll progress [0,1] to vertical offset range
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${speed * 100}%`, `${speed * 100}%`]
  )

  if (prefersReducedMotion) {
    return (
      <div className={cn('overflow-hidden', wrapperClassName)}>
        <div className={className}>{children}</div>
      </div>
    )
  }

  return (
    <div ref={ref} className={cn('overflow-hidden', wrapperClassName)}>
      <motion.div
        style={{ y }}
        className={cn('will-change-transform', className)}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default ParallaxImage

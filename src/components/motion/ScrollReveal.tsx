'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: Direction
  delay?: number
  duration?: number
  distance?: number
  className?: string
  once?: boolean
  threshold?: number
  /** Optional tag override — renders as this HTML element */
  as?: 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'span'
}

const directionOffset = (direction: Direction, distance: number) => {
  switch (direction) {
    case 'up':
      return { y: distance, x: 0 }
    case 'down':
      return { y: -distance, x: 0 }
    case 'left':
      return { y: 0, x: distance }
    case 'right':
      return { y: 0, x: -distance }
    case 'none':
    default:
      return { y: 0, x: 0 }
  }
}

const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  distance = 60,
  className,
  once = true,
  threshold = 0.2,
  as = 'div',
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })
  const prefersReducedMotion = useReducedMotion()

  const offset = directionOffset(direction, distance)

  // Respect user motion preferences
  if (prefersReducedMotion) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  const MotionTag = motion[as] || motion.div

  return (
    <MotionTag
      ref={ref}
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
      }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: offset.x, y: offset.y }
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0], // cubic-bezier for a heavy, structural feel
      }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  )
}

export default ScrollReveal

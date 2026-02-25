'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface StaggerContainerProps {
  children: React.ReactNode
  staggerDelay?: number
  className?: string
  once?: boolean
  threshold?: number
  /** Delay before the stagger sequence begins */
  initialDelay?: number
}

const StaggerContainer = ({
  children,
  staggerDelay = 0.12,
  className,
  once = true,
  threshold = 0.15,
  initialDelay = 0,
}: StaggerContainerProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: initialDelay,
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export default StaggerContainer

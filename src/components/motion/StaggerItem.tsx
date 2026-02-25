'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface StaggerItemProps {
  children: React.ReactNode
  direction?: Direction
  distance?: number
  duration?: number
  className?: string
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

const StaggerItem = ({
  children,
  direction = 'up',
  distance = 40,
  duration = 0.6,
  className,
}: StaggerItemProps) => {
  const prefersReducedMotion = useReducedMotion()
  const offset = directionOffset(direction, distance)

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          x: offset.x,
          y: offset.y,
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration,
            ease: [0.25, 0.1, 0.25, 1.0],
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export default StaggerItem

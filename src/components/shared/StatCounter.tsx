'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface StatCounterProps {
  value: number
  suffix?: string
  label: string
}

const StatCounter = ({ value, suffix, label }: StatCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
    duration: 2000,
  })
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        const rounded = Math.round(latest)
        ref.current.textContent = rounded.toLocaleString('tr-TR') + (suffix ?? '')
      }
    })
    return unsubscribe
  }, [springValue, suffix])

  return (
    <div className="text-center">
      <motion.span
        ref={ref}
        className={cn(
          'block text-3xl font-extrabold text-accent md:text-5xl',
        )}
      >
        0{suffix ?? ''}
      </motion.span>
      <span className="mt-2 block text-sm text-primary-foreground/80 md:text-base">
        {label}
      </span>
    </div>
  )
}

export default StatCounter

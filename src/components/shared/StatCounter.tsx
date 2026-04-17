'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring, motion } from 'framer-motion'

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
        className="block font-display text-4xl font-normal text-accent md:text-5xl"
        style={{ fontVariationSettings: "'opsz' 144" }}
      >
        0{suffix ?? ''}
      </motion.span>
      <span className="mt-3 block text-[11px] font-semibold uppercase tracking-[0.25em] text-primary-foreground/70 md:text-xs">
        {label}
      </span>
    </div>
  )
}

export default StatCounter

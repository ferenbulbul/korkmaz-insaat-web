'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CountUpProps {
  from?: number
  to: number
  duration?: number
  suffix?: string
  className?: string
  /** Format with locale separator (e.g. 500.000 for tr-TR) */
  locale?: string
}

// Custom easeOutExpo for a dramatic ramp that decelerates heavily at the end
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

const CountUp = ({
  from = 0,
  to,
  duration = 2,
  suffix = '',
  className,
  locale = 'tr-TR',
}: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const prefersReducedMotion = useReducedMotion()
  const [displayValue, setDisplayValue] = useState(from)

  useEffect(() => {
    if (!isInView) return
    if (prefersReducedMotion) {
      setDisplayValue(to)
      return
    }

    const startTime = performance.now()
    const durationMs = duration * 1000

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / durationMs, 1)
      const eased = easeOutExpo(progress)
      const current = Math.round(from + (to - from) * eased)

      setDisplayValue(current)

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [isInView, from, to, duration, prefersReducedMotion])

  const formatted = displayValue.toLocaleString(locale)

  return (
    <span ref={ref} className={cn(className)}>
      {formatted}
      {suffix}
    </span>
  )
}

export default CountUp

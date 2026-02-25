'use client'

import { useState, useCallback, useRef } from 'react'

interface UseInViewOptions {
  threshold?: number
  triggerOnce?: boolean
}

interface UseInViewReturn {
  ref: (node: Element | null) => void
  inView: boolean
}

const useInView = (options: UseInViewOptions = {}): UseInViewReturn => {
  const { threshold = 0, triggerOnce = false } = options
  const [inView, setInView] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const ref = useCallback(
    (node: Element | null) => {
      // Disconnect previous observer
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }

      if (!node) return

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          const isIntersecting = entry.isIntersecting

          setInView(isIntersecting)

          if (isIntersecting && triggerOnce && observerRef.current) {
            observerRef.current.disconnect()
            observerRef.current = null
          }
        },
        { threshold }
      )

      observerRef.current.observe(node)
    },
    [threshold, triggerOnce]
  )

  return { ref, inView }
}

export default useInView

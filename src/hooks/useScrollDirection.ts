'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface ScrollDirectionState {
  scrollDirection: 'up' | 'down'
  scrollY: number
}

const useScrollDirection = (): ScrollDirectionState => {
  const [state, setState] = useState<ScrollDirectionState>({
    scrollDirection: 'up',
    scrollY: 0,
  })

  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  const updateScrollDirection = useCallback(() => {
    const currentScrollY = window.scrollY
    const direction = currentScrollY > lastScrollY.current ? 'down' : 'up'

    setState({
      scrollDirection: direction,
      scrollY: currentScrollY,
    })

    lastScrollY.current = currentScrollY
    ticking.current = false
  }, [])

  const onScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(updateScrollDirection)
      ticking.current = true
    }
  }, [updateScrollDirection])

  useEffect(() => {
    lastScrollY.current = window.scrollY

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  return state
}

export default useScrollDirection

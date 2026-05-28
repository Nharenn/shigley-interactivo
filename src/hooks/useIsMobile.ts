'use client'

import { useState, useEffect } from 'react'

type Breakpoint = 'compact' | 'medium' | 'expanded'

export function useBreakpoint() {
  const [size, setSize] = useState<Breakpoint>('expanded')

  useEffect(() => {
    const compactMQ = window.matchMedia('(max-width: 639px)')
    const mediumMQ = window.matchMedia('(min-width: 640px) and (max-width: 1023px)')
    const update = () => {
      if (compactMQ.matches) setSize('compact')
      else if (mediumMQ.matches) setSize('medium')
      else setSize('expanded')
    }
    update()
    compactMQ.addEventListener('change', update)
    mediumMQ.addEventListener('change', update)
    return () => {
      compactMQ.removeEventListener('change', update)
      mediumMQ.removeEventListener('change', update)
    }
  }, [])

  return {
    size,
    isCompact: size === 'compact',
    isMobile: size === 'compact',
    isTablet: size === 'medium',
    isExpanded: size === 'expanded',
  }
}

export function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    setIsMobile(mq.matches)
    const h = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [breakpoint])

  return isMobile
}

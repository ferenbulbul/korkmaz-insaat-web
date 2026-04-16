'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

interface ConditionalFooterProps {
  children: ReactNode
}

const ConditionalFooter = ({ children }: ConditionalFooterProps) => {
  const pathname = usePathname()
  if (pathname.startsWith('/admin')) return null
  return <>{children}</>
}

export default ConditionalFooter

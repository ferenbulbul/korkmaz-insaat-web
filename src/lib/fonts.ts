import { Sora, Fraunces } from 'next/font/google'

export const sora = Sora({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-sora',
})

export const fraunces = Fraunces({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-fraunces',
  axes: ['opsz', 'SOFT'],
  style: ['normal', 'italic'],
})

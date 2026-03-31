'use client'

import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Container from '@/components/layout/Container'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

const ErrorPage = ({ reset }: ErrorPageProps) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Container className="flex flex-col items-center text-center py-16">
        <AlertTriangle className="size-24 text-accent mb-6" />

        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Bir Hata Oluştu
        </h1>

        <p className="text-muted-foreground max-w-md mb-8">
          Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="lg" onClick={() => reset()}>
            Tekrar Dene
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">Ana Sayfaya Dön</Link>
          </Button>
        </div>
      </Container>
    </div>
  )
}

export default ErrorPage

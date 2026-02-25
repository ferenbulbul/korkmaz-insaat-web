import Link from 'next/link'
import { HardHat } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Container from '@/components/layout/Container'

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Container className="flex flex-col items-center text-center py-16">
        <HardHat className="size-24 text-accent mb-6" />

        <p className="text-8xl font-extrabold text-muted-foreground/20 leading-none mb-4">
          404
        </p>

        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Sayfa Bulunamadı
        </h1>

        <p className="text-muted-foreground max-w-md mb-8">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg">
            <Link href="/">Ana Sayfaya Dön</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/projeler">Projelerimiz</Link>
          </Button>
        </div>
      </Container>
    </div>
  )
}

export default NotFound

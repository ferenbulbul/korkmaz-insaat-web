import { MapPin, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MapPlaceholderProps {
  address: string
  className?: string
}

const MapPlaceholder = ({ address, className }: MapPlaceholderProps) => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

  return (
    <div
      className={cn(
        'flex min-h-[300px] flex-col items-center justify-center gap-4 rounded-xl bg-muted',
        className,
      )}
    >
      <div className="flex size-16 items-center justify-center rounded-full bg-accent/10">
        <MapPin className="size-8 text-accent" />
      </div>

      <p className="max-w-sm text-center text-sm text-muted-foreground">
        {address}
      </p>

      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'inline-flex items-center gap-2 text-sm font-medium text-accent',
          'transition-colors hover:text-accent/80',
        )}
      >
        Haritada Goruntule
        <ExternalLink className="size-4" />
      </a>
    </div>
  )
}

export default MapPlaceholder

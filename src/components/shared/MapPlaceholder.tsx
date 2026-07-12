import { cn } from '@/lib/utils'

interface MapPlaceholderProps {
  address: string
  className?: string
}

// Korkmaz İnşaat place on Google Maps (Korkmaz Plaza, Akçaali Mah. 1002 Sk. No:6B, Gönen)
const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1500!2d27.6528501!3d40.1055704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b693fc8b628e45%3A0x9fe67f177cacf60e!2zS29ya21heiDEsG7Fn2FhdA!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str'

const MapPlaceholder = ({ address, className }: MapPlaceholderProps) => {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl',
        className,
      )}
    >
      <iframe
        src={MAP_EMBED_URL}
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: 300 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={address}
        className="h-full w-full"
      />
    </div>
  )
}

export default MapPlaceholder

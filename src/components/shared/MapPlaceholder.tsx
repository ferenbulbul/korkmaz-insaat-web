import { cn } from '@/lib/utils'

interface MapPlaceholderProps {
  address: string
  className?: string
}

const MapPlaceholder = ({ address, className }: MapPlaceholderProps) => {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl',
        className,
      )}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12036.243895498498!2d29.0088!3d41.0451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7650656bd63%3A0x8ca058b28c20b6c3!2sBe%C5%9Fikta%C5%9F%2C%20Istanbul!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={address}
        className="min-h-[300px]"
      />
    </div>
  )
}

export default MapPlaceholder

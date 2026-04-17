import { Building2, Landmark, HardHat, Paintbrush } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Service } from '@/types/ui'

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Building2,
  Landmark,
  HardHat,
  Paintbrush,
}

interface ServiceCardProps {
  service: Service
  index?: number
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const { icon, title, description } = service
  const IconComponent = iconMap[icon] ?? Building2
  const indexLabel =
    typeof index === 'number' ? String(index + 1).padStart(2, '0') : null

  return (
    <div
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card p-7 transition-all duration-500 md:p-8',
        'hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5',
      )}
    >
      {/* Animated top gold hairline on hover */}
      <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-accent via-gold-300 to-accent/0 transition-transform duration-700 ease-out group-hover:scale-x-100" />

      {/* Header row: index + icon */}
      <div className="mb-8 flex items-start justify-between">
        {indexLabel && (
          <span
            className="index-number text-3xl opacity-40 transition-opacity duration-500 group-hover:opacity-70"
            style={{ fontVariationSettings: "'opsz' 72" }}
          >
            {indexLabel}
          </span>
        )}
        <div className="flex size-12 items-center justify-center rounded-xl bg-accent/8 transition-colors duration-500 group-hover:bg-accent/15">
          <IconComponent className="size-6 text-accent" />
        </div>
      </div>

      {/* Title — serif display */}
      <h3
        className="mb-3 font-display text-xl font-medium tracking-tight text-foreground md:text-2xl"
        style={{ fontVariationSettings: "'opsz' 48" }}
      >
        {title}
      </h3>

      {/* Hairline separator */}
      <div className="relative mb-4 h-px bg-border/50">
        <span className="absolute left-0 top-0 h-full w-10 bg-gold-500/60 transition-all duration-500 ease-out group-hover:w-full group-hover:bg-gold-500/40" />
      </div>

      {/* Description */}
      <p className="mt-auto text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

export default ServiceCard

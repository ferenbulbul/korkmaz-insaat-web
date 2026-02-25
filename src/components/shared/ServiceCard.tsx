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
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const { icon, title, description } = service
  const IconComponent = iconMap[icon] ?? Building2

  return (
    <div
      className={cn(
        'rounded-xl border bg-card p-6 transition-all duration-300 md:p-8',
        'hover:shadow-lg hover:border-accent/30',
      )}
    >
      {/* Icon */}
      <div className="mb-5 flex size-14 items-center justify-center rounded-xl bg-accent/10">
        <IconComponent className="size-7 text-accent" />
      </div>

      {/* Title */}
      <h3 className="mb-3 text-xl font-bold tracking-tight text-foreground">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
        {description}
      </p>
    </div>
  )
}

export default ServiceCard

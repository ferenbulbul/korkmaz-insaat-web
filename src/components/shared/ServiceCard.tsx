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
        'group relative h-full overflow-hidden rounded-xl border bg-card p-6 transition-all duration-500 md:p-8',
        'hover:-translate-y-1 hover:shadow-xl hover:border-accent/20',
        'before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-transparent before:transition-all before:duration-500',
        'hover:before:bg-accent',
      )}
    >
      {/* Icon */}
      <div className="relative mb-5 flex size-14 items-center justify-center rounded-xl bg-accent/8 transition-colors duration-500 group-hover:bg-accent/15">
        <IconComponent className="size-7 text-accent" />
      </div>

      {/* Title */}
      <h3 className="relative mb-3 text-xl font-bold tracking-tight text-foreground">
        {title}
      </h3>

      {/* Description */}
      <p className="relative text-sm leading-relaxed text-muted-foreground md:text-base">
        {description}
      </p>

      {/* Bottom gold line on hover */}
      <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-accent to-accent/0 transition-all duration-700 group-hover:w-full" />
    </div>
  )
}

export default ServiceCard

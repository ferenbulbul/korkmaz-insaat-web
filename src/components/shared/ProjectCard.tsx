import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Ruler, ImageOff } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Project, ProjectStatus } from '@/types/project'
import { PROJECT_CATEGORIES, PROJECT_STATUS_LABELS } from '@/types/project'

const statusBadgeClass = (status: ProjectStatus) => {
  switch (status) {
    case 'completed':
      return 'bg-emerald-500/90 text-white hover:bg-emerald-500'
    case 'ongoing':
      return 'bg-blue-500/90 text-white hover:bg-blue-500'
    case 'planned':
      return 'bg-amber-500/90 text-white hover:bg-amber-500'
  }
}

interface ProjectCardProps {
  project: Project
  index?: number
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { slug, title, location, area, category, status, thumbnailUrl, apartmentTypes, images } =
    project

  const displayImage = thumbnailUrl || images[0]?.url || null
  const indexLabel =
    typeof index === 'number' ? String(index + 1).padStart(2, '0') : null

  return (
    <Link href={`/projeler/${slug}`} className="group block">
      <article className="relative">
        {/* Image — portrait ratio */}
        <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
          {displayImage ? (
            <Image
              src={displayImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.05]"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-muted-foreground">
              <ImageOff className="size-10 opacity-40" />
            </div>
          )}

          {/* Bottom-to-top overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A09]/80 via-[#0C0A09]/20 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />

          {/* Index number — top left */}
          {indexLabel && (
            <div className="absolute left-4 top-4 z-10">
              <span
                className="index-number text-2xl md:text-3xl"
                style={{ fontVariationSettings: "'opsz' 96" }}
              >
                {indexLabel}
              </span>
            </div>
          )}

          {/* Status badges — top right */}
          <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5">
            {status && (
              <Badge className={cn('h-6 text-[10px]', statusBadgeClass(status))}>
                {PROJECT_STATUS_LABELS[status]}
              </Badge>
            )}
          </div>

          {/* Hover CTA from bottom */}
          <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-between px-5 pb-5 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white">
              Projeyi İncele
            </span>
            <span className="font-display text-lg text-gold-300">&rarr;</span>
          </div>
        </div>

        {/* Content */}
        <div className="pt-5">
          {/* Row 1: category + location */}
          <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            <span>{PROJECT_CATEGORIES[category]}</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3 text-gold-400" />
              <span className="normal-case tracking-normal">{location}</span>
            </span>
          </div>

          {/* Hairline separator — expands on hover */}
          <div className="relative mt-3 h-px bg-border/60">
            <span className="absolute left-0 top-0 h-full w-12 bg-gold-500 transition-all duration-500 ease-out group-hover:w-full" />
          </div>

          {/* Row 2: title (serif) */}
          <h3
            className="mt-4 font-display text-xl font-medium leading-tight tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent md:text-2xl"
            style={{ fontVariationSettings: "'opsz' 48" }}
          >
            {title}
          </h3>

          {/* Row 3: meta chips */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
              <Ruler className="size-3 shrink-0" />
              {area.toLocaleString('tr-TR')} m&sup2;
            </span>

            {category === 'konut' && apartmentTypes && apartmentTypes.length > 0 && (
              <>
                {apartmentTypes.slice(0, 3).map((type) => (
                  <span
                    key={type}
                    className="rounded-md bg-secondary/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                  >
                    {type}
                  </span>
                ))}
              </>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}

export default ProjectCard

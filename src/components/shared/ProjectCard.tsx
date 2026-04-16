import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowUpRight, Ruler, ImageOff } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
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
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { slug, title, location, area, category, status, thumbnailUrl, apartmentTypes, images } =
    project

  const displayImage = thumbnailUrl || images[0]?.url || null

  return (
    <Link href={`/projeler/${slug}`} className="group block">
      <Card
        className={cn(
          'overflow-hidden border p-0 transition-all duration-500',
          'hover:shadow-2xl hover:shadow-accent/5',
        )}
      >
        {/* Project image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {displayImage ? (
            <Image
              src={displayImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-secondary text-muted-foreground">
              <ImageOff className="size-10 opacity-40" />
            </div>
          )}

          {/* Hover overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A09]/80 via-[#0C0A09]/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Badges - top right */}
          <div className="absolute right-3 top-3 flex items-center gap-1.5">
            {status && (
              <Badge className={cn('text-[11px]', statusBadgeClass(status))}>
                {PROJECT_STATUS_LABELS[status]}
              </Badge>
            )}
            <Badge className="bg-white/90 text-[11px] text-foreground backdrop-blur-sm hover:bg-white/90">
              {PROJECT_CATEGORIES[category]}
            </Badge>
          </div>

          {/* Arrow indicator on hover */}
          <div className="absolute bottom-4 right-4 flex size-10 translate-y-4 items-center justify-center rounded-full bg-accent opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="size-5 text-white" />
          </div>
        </div>

        {/* Content */}
        <CardContent className="space-y-3 p-5">
          <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent">
            {title}
          </h3>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-3.5 shrink-0" />
            <span>{location}</span>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Ruler className="size-3.5 shrink-0" />
              <span>{area.toLocaleString('tr-TR')} m&sup2;</span>
            </div>

            {/* Apartment type chips (only for residential) */}
            {category === 'konut' && apartmentTypes && apartmentTypes.length > 0 && (
              <div className="flex items-center gap-1">
                {apartmentTypes.slice(0, 3).map((type) => (
                  <span
                    key={type}
                    className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                  >
                    {type}
                  </span>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default ProjectCard

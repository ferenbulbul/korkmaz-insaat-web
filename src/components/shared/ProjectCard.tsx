import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowUpRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Project } from '@/types/project'
import { PROJECT_CATEGORIES } from '@/types/project'

interface ProjectCardProps {
  project: Project
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { slug, title, location, area, category, thumbnailUrl } = project

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
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Hover overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A09]/80 via-[#0C0A09]/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Category badge */}
          <Badge
            className="absolute right-3 top-3 bg-white/90 text-foreground backdrop-blur-sm hover:bg-white/90"
          >
            {PROJECT_CATEGORIES[category]}
          </Badge>

          {/* Arrow indicator on hover */}
          <div className="absolute bottom-4 right-4 flex size-10 translate-y-4 items-center justify-center rounded-full bg-accent opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="size-5 text-white" />
          </div>
        </div>

        {/* Content */}
        <CardContent className="space-y-2 p-5">
          <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent">
            {title}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-3.5 shrink-0" />
              <span>{location}</span>
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              {area.toLocaleString('tr-TR')} m&sup2;
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default ProjectCard

import Link from 'next/link'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
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
          'overflow-hidden border p-0 transition-all duration-300',
          'hover:shadow-xl hover:scale-[1.02]',
        )}
      >
        {/* Project image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Category badge */}
          <Badge
            className="absolute right-3 top-3 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {PROJECT_CATEGORIES[category]}
          </Badge>
        </div>

        {/* Content */}
        <CardContent className="space-y-2 p-5">
          <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent">
            {title}
          </h3>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4 shrink-0" />
            <span>{location}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {area.toLocaleString('tr-TR')} m&sup2;
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}

export default ProjectCard

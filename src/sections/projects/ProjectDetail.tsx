import Link from 'next/link'
import Image from 'next/image'
import {
  MapPin, Calendar, Ruler, Tag, CheckCircle2,
  // Feature icons
  Waves, Dumbbell, Baby, ShieldCheck, ArrowUpDown, Car, Zap,
  TreePine, Thermometer, Wifi, Sun, Flame, Shield, Droplets,
  Siren, Video,
  // Spec icons
  Layers, Building2, Briefcase, Store, Wrench, Award,
  AlignLeft, CalendarDays, Film, FileCheck, Hash,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Container from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout'
import { SectionTitle } from '@/components/shared'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  PROJECT_CATEGORIES,
  PROJECT_STATUS_LABELS,
  PROJECT_FEATURES,
  PROJECT_SPEC_TYPES,
} from '@/types/project'
import type { Project, ProjectStatus } from '@/types/project'

// Icon map for dynamic feature rendering
const featureIconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Waves, Dumbbell, Baby, ShieldCheck, ArrowUpDown, Car, Zap,
  TreePine, Thermometer, Wifi, Sun, Flame, Shield, Droplets,
  Siren, Video,
}

// Icon map for dynamic spec rendering
const specIconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Layers, Building2, Briefcase, Store, Car, Wrench, Zap, Award,
  ShieldCheck, AlignLeft, Ruler, CalendarDays, Film, FileCheck, Hash,
}

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

interface ProjectDetailProps {
  project: Project
}

const ProjectDetail = ({ project }: ProjectDetailProps) => {
  const heroImage = project.images[0]?.url || project.thumbnailUrl

  const quickSpecs = [
    { icon: Ruler, label: 'Insaat Alani', value: `${project.area.toLocaleString('tr-TR')} m\u00B2` },
    { icon: Tag, label: 'Kategori', value: PROJECT_CATEGORIES[project.category] },
    { icon: Calendar, label: project.status === 'ongoing' ? 'Baslangic' : 'Tamamlanma', value: project.status === 'ongoing' ? (project.startDate || '-') : project.completionDate },
    { icon: MapPin, label: 'Konum', value: project.location },
  ]

  return (
    <>
      {/* ── Hero: Full-width project image ── */}
      <div className="relative h-[50vh] min-h-[400px] md:h-[60vh]">
        <Image
          src={heroImage}
          alt={project.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A09]/90 via-[#0C0A09]/50 to-[#0C0A09]/20" />

        <Container className="relative z-10 flex h-full flex-col justify-end pb-8 md:pb-12">
          <ScrollReveal direction="down" distance={20} delay={0.1}>
            <Breadcrumb>
              <BreadcrumbList className="text-white/50">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/" className="hover:text-white">Ana Sayfa</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/25" />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/projeler" className="hover:text-white">Projeler</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/25" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white">{project.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {project.status && (
                <Badge className={statusBadgeClass(project.status)}>
                  {PROJECT_STATUS_LABELS[project.status]}
                </Badge>
              )}
              <Badge className="bg-accent text-accent-foreground hover:bg-accent/90">
                {PROJECT_CATEGORIES[project.category]}
              </Badge>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              {project.title}
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <div className="mt-2 flex items-center gap-1.5 text-white/65">
              <MapPin className="size-4" />
              <span className="text-sm md:text-base">{project.location}</span>
            </div>
          </ScrollReveal>
        </Container>
      </div>

      {/* ── Quick Specs Bar ── */}
      <div className="border-b bg-card">
        <Container>
          <StaggerContainer
            staggerDelay={0.1}
            className="scrollbar-hide flex overflow-x-auto"
          >
            {quickSpecs.map((item, index) => (
              <StaggerItem key={item.label} direction="up">
                <div
                  className={cn(
                    'flex shrink-0 items-center gap-3 px-4 py-5 md:px-6 md:py-6',
                    index > 0 && 'border-l border-border',
                  )}
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <item.icon className="size-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-0.5 whitespace-nowrap text-sm font-semibold text-foreground">
                      {item.value}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </div>

      {/* ── About Section ── */}
      <SectionWrapper bgColor="white">
        <Container className="max-w-4xl">
          <ScrollReveal direction="up">
            <SectionTitle overline="PROJE HAKKINDA" title="Proje Detaylari" alignment="left" />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="space-y-4">
              {project.description.split('\n').map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-relaxed text-muted-foreground md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </ScrollReveal>

          {(project.client || project.architect || project.startDate) && (
            <ScrollReveal direction="up" delay={0.3}>
              <Separator className="my-8" />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {project.client && (
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Isveren
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      {project.client}
                    </p>
                  </div>
                )}
                {project.architect && (
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Mimar
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      {project.architect}
                    </p>
                  </div>
                )}
                {project.startDate && (
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Baslangic Tarihi
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      {project.startDate}
                    </p>
                  </div>
                )}
              </div>
            </ScrollReveal>
          )}
        </Container>
      </SectionWrapper>

      {/* ── Technical Specs Section ── */}
      {project.specs && project.specs.length > 0 && (
        <SectionWrapper bgColor="muted">
          <Container>
            <ScrollReveal direction="up">
              <SectionTitle overline="TEKNIK BILGILER" title="Teknik Ozellikler" alignment="left" />
            </ScrollReveal>

            <StaggerContainer
              staggerDelay={0.07}
              className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
            >
              {project.specs.map((spec) => {
                const specDef = spec.type ? PROJECT_SPEC_TYPES[spec.type] : null
                const IconComp = specDef ? (specIconMap[specDef.icon] ?? Hash) : Hash

                return (
                  <StaggerItem key={spec.label} direction="up">
                    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:border-accent/40 hover:shadow-lg">
                      {/* Subtle top accent line */}
                      <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

                      {/* Icon */}
                      <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-accent/10 transition-colors duration-200 group-hover:bg-accent/20">
                        <IconComp className="size-5 text-accent" />
                      </div>

                      {/* Value */}
                      <p className="text-2xl font-bold leading-none text-foreground">
                        {spec.value}
                      </p>

                      {/* Label */}
                      <p className="mt-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                        {spec.label}
                      </p>
                    </div>
                  </StaggerItem>
                )
              })}
            </StaggerContainer>
          </Container>
        </SectionWrapper>
      )}

      {/* ── Features / Amenities Section ── */}
      {project.features && project.features.length > 0 && (
        <SectionWrapper bgColor="white">
          <Container>
            <ScrollReveal direction="up">
              <SectionTitle overline="DONANIMLAR" title="Proje Donanimlari" alignment="left" />
            </ScrollReveal>

            <StaggerContainer
              staggerDelay={0.05}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            >
              {project.features.map((featureKey) => {
                const feature = PROJECT_FEATURES[featureKey]
                if (!feature) return null
                const IconComp = featureIconMap[feature.icon] ?? CheckCircle2

                return (
                  <StaggerItem key={featureKey} direction="up">
                    <div className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card px-4 py-6 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg">
                      {/* Icon container */}
                      <div className="flex size-14 items-center justify-center rounded-2xl bg-gold-100 transition-colors duration-200 group-hover:bg-gold-200">
                        <IconComp className="size-7 text-accent" />
                      </div>

                      {/* Label */}
                      <span className="text-sm font-semibold leading-snug text-foreground">
                        {feature.label}
                      </span>
                    </div>
                  </StaggerItem>
                )
              })}
            </StaggerContainer>
          </Container>
        </SectionWrapper>
      )}
    </>
  )
}

export default ProjectDetail

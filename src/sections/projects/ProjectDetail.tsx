import Link from 'next/link'
import Image from 'next/image'
import {
  MapPin, Calendar, Ruler, Tag, CheckCircle2, ImageOff,
  // Spec icons
  Layers, Building2, Briefcase, Store, Car, Wrench, Zap, Award,
  ShieldCheck, AlignLeft, CalendarDays, Film, FileCheck, Hash,
  // Feature icons
  Waves, Dumbbell, Baby, ArrowUpDown,
  TreePine, Thermometer, Wifi, Sun, Flame, Shield, Droplets,
  Siren, Video,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Container from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout'
import { SectionTitle } from '@/components/shared'
import { Badge } from '@/components/ui/badge'
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
  PROJECT_NIZAM_LABELS,
  PROJECT_SPEC_TYPES,
} from '@/types/project'
import type { Project, ProjectStatus, ProjectSpecType } from '@/types/project'

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

// Icon map for dynamic spec rendering
const specIconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Layers, Building2, Briefcase, Store, Car, Wrench, Zap, Award,
  ShieldCheck, AlignLeft, Ruler, CalendarDays, Film, FileCheck, Hash,
}

// Icon map for dynamic feature rendering
const featureIconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Waves, Dumbbell, Baby, ShieldCheck, ArrowUpDown, Car, Zap,
  TreePine, Thermometer, Wifi, Sun, Flame, Shield, Droplets,
  Siren, Video, CheckCircle2,
}

interface ProjectDetailProps {
  project: Project
}

const ProjectDetail = ({ project }: ProjectDetailProps) => {
  const quickSpecs = [
    { icon: Tag, label: 'Proje Adı', value: project.title },
    { icon: MapPin, label: 'Konum', value: project.location },
    {
      icon: Calendar,
      label: 'Durum',
      value: PROJECT_STATUS_LABELS[project.status],
    },
    {
      icon: Ruler,
      label: 'İnşaat Alanı',
      value: `${project.area.toLocaleString('tr-TR')} m\u00B2`,
    },
  ]

  // Build project info items
  const infoLeft = [
    { label: 'İnşaat Alanı', value: `${project.area.toLocaleString('tr-TR')} m\u00B2` },
    ...(project.completionDate
      ? [{ label: 'Tamamlanma Yılı', value: project.completionDate }]
      : []),
    { label: 'Kat Adedi', value: String(project.floorCount) },
    ...(project.unitCount
      ? [{ label: 'Daire Sayısı', value: String(project.unitCount) }]
      : []),
    ...(project.parkingFloorCount
      ? [{ label: 'Otopark Kat Sayısı', value: String(project.parkingFloorCount) }]
      : []),
  ]

  const infoRight = [
    ...(project.startDate
      ? [{ label: 'Başlangıç Tarihi', value: project.startDate }]
      : []),
    ...(project.nizam
      ? [{ label: 'Nizam', value: PROJECT_NIZAM_LABELS[project.nizam] }]
      : []),
    ...(project.apartmentTypes && project.apartmentTypes.length > 0
      ? [{ label: 'Daire Tipleri', value: project.apartmentTypes.join(', ') }]
      : []),
  ]

  // Build unified technical spec grid (specs with values + features with check)
  const specItems = (project.specs ?? []).map((spec) => {
    const specDef =
      spec.type && (spec.type as ProjectSpecType) in PROJECT_SPEC_TYPES
        ? PROJECT_SPEC_TYPES[spec.type as ProjectSpecType]
        : null
    const IconComp = specDef ? specIconMap[specDef.icon] ?? Hash : Hash
    return { key: `spec-${spec.label}`, icon: IconComp, label: spec.label, value: spec.value }
  })

  const featureItems = (project.features ?? []).map((feature) => {
    const IconComp = feature.icon
      ? featureIconMap[feature.icon] ?? CheckCircle2
      : CheckCircle2
    return {
      key: `feature-${feature.key}`,
      icon: IconComp,
      label: feature.label,
      value: null as string | null,
    }
  })

  const heroImage = project.images[0]?.url || project.thumbnailUrl || null
  const descriptionParagraphs = project.description.split('\n')

  return (
    <>
      {/* ── Hero: Single image ── */}
      <div className="relative h-[45vh] min-h-[360px] md:h-[55vh]">
        {heroImage ? (
          <Image
            src={heroImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-secondary text-muted-foreground">
            <ImageOff className="size-16 opacity-40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A09]/90 via-[#0C0A09]/50 to-[#0C0A09]/20" />

        {/* Tick corners */}
        <span className="tick-corner tl" style={{ top: '6rem', left: '2rem' }} />
        <span className="tick-corner br" style={{ bottom: '2.5rem', right: '2rem' }} />

        <Container className="relative z-10 flex h-full flex-col justify-end pb-10 md:pb-16">
          <ScrollReveal direction="down" distance={20} delay={0.1}>
            <Breadcrumb>
              <BreadcrumbList className="text-[11px] uppercase tracking-[0.25em] text-white/50">
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
                  <BreadcrumbPage className="text-gold-300">{project.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Badge className={statusBadgeClass(project.status)}>
                {PROJECT_STATUS_LABELS[project.status]}
              </Badge>
              <Badge className="bg-accent text-accent-foreground hover:bg-accent/90">
                {PROJECT_CATEGORIES[project.category]}
              </Badge>
              {project.nizam && (
                <Badge className="bg-white/90 text-foreground backdrop-blur-sm hover:bg-white/90">
                  {PROJECT_NIZAM_LABELS[project.nizam]}
                </Badge>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <h1
              className="mt-4 font-display text-5xl font-normal leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl"
              style={{ fontVariationSettings: "'opsz' 96" }}
            >
              {project.title}
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <div className="mt-4 flex items-center gap-2 text-white/70">
              <MapPin className="size-4 text-gold-400" />
              <span className="text-base md:text-lg">{project.location}</span>
            </div>
          </ScrollReveal>
        </Container>

        {/* Animated bottom gold rule */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px">
          <span className="block h-full w-full animate-draw-horizontal bg-gradient-to-r from-transparent via-gold-500/80 to-transparent" />
        </div>
      </div>

      {/* ── Quick Info Bar — stacked vertical layout ── */}
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
                    'relative flex min-w-[180px] shrink-0 flex-col items-start gap-3 px-6 py-6 md:px-8 md:py-8',
                  )}
                >
                  {/* Dikey hairline-gold separator */}
                  {index > 0 && (
                    <span className="absolute inset-y-4 left-0 w-px bg-gradient-to-b from-transparent via-gold-500/40 to-transparent" />
                  )}
                  <item.icon className="size-5 text-gold-500" />
                  <div>
                    <p className="font-display text-lg font-normal leading-tight text-foreground md:text-xl">
                      {item.value}
                    </p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                      {item.label}
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
            <SectionTitle
              overline="PROJE HAKKINDA"
              title="Proje Detaylari"
              alignment="left"
              serif
            />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="space-y-5">
              {descriptionParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={cn(
                    'text-base leading-relaxed text-muted-foreground md:text-lg',
                    index === 0 && 'dropcap',
                  )}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </ScrollReveal>

          {/* Project info: left (area, year, floors) + right (start date) */}
          {(infoLeft.length > 0 || infoRight.length > 0) && (
            <ScrollReveal direction="up" delay={0.3}>
              <div className="hairline-gold my-10" />
              <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12">
                {/* Vertical hairline divider between columns */}
                {infoRight.length > 0 && (
                  <span className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold-500/30 to-transparent sm:block" />
                )}

                {/* Left column */}
                <div className="space-y-6">
                  {infoLeft.map((item) => (
                    <div key={item.label}>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                        {item.label}
                      </p>
                      <p
                        className="mt-2 font-display text-2xl font-normal text-foreground"
                        style={{ fontVariationSettings: "'opsz' 48" }}
                      >
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Right column */}
                {infoRight.length > 0 && (
                  <div className="space-y-6">
                    {infoRight.map((item) => (
                      <div key={item.label}>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                          {item.label}
                        </p>
                        <p
                          className="mt-2 font-display text-2xl font-normal text-foreground"
                          style={{ fontVariationSettings: "'opsz' 48" }}
                        >
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
          )}
        </Container>
      </SectionWrapper>

      {/* ── Unified Technical Specs & Features Section — modular grid ── */}
      {(specItems.length > 0 || featureItems.length > 0) && (
        <SectionWrapper bgColor="muted">
          <Container>
            <ScrollReveal direction="up">
              <SectionTitle
                overline="TEKNIK BILGILER"
                title="Teknik Ozellikler"
                alignment="left"
                serif
              />
            </ScrollReveal>

            {/* Specs — modular grid with first item focal (col-span-2) */}
            {specItems.length > 0 && (
              <StaggerContainer
                staggerDelay={0.05}
                className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
              >
                {specItems.map((item, index) => {
                  const IconComp = item.icon
                  const isFocal = index === 0
                  return (
                    <StaggerItem
                      key={item.key}
                      direction="up"
                      className={cn(isFocal && 'col-span-2')}
                    >
                      <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-lg md:p-7">
                        {/* Animated top gold hairline */}
                        <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent/0 via-accent/60 to-accent/0 transition-transform duration-500 ease-out group-hover:scale-x-100" />

                        {/* Icon */}
                        <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-accent/10 transition-colors duration-300 group-hover:bg-accent/20">
                          <IconComp className="size-5 text-accent" />
                        </div>

                        <p
                          className={cn(
                            'font-display font-normal leading-none text-foreground',
                            isFocal ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl',
                          )}
                          style={{
                            fontVariationSettings: isFocal
                              ? "'opsz' 144"
                              : "'opsz' 72",
                          }}
                        >
                          {item.value}
                        </p>
                        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                          {item.label}
                        </p>
                      </div>
                    </StaggerItem>
                  )
                })}
              </StaggerContainer>
            )}

            {/* Features — sade overline-style list grid */}
            {featureItems.length > 0 && (
              <StaggerContainer
                staggerDelay={0.04}
                className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
              >
                {featureItems.map((item) => {
                  const IconComp = item.icon
                  return (
                    <StaggerItem key={item.key} direction="up">
                      <div className="group flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4 transition-all duration-300 hover:border-accent/40 hover:shadow-sm">
                        <IconComp className="size-5 shrink-0 text-gold-500" />
                        <span className="text-sm font-medium text-foreground">
                          {item.label}
                        </span>
                      </div>
                    </StaggerItem>
                  )
                })}
              </StaggerContainer>
            )}
          </Container>
        </SectionWrapper>
      )}
    </>
  )
}

export default ProjectDetail

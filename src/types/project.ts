export type ProjectCategory = 'konut' | 'ticari' | 'altyapi' | 'renovasyon'

export type ProjectStatus = 'completed' | 'ongoing' | 'planned'

export type ProjectSpecType =
  | 'floors'
  | 'units'
  | 'offices'
  | 'shops'
  | 'parking'
  | 'construction-type'
  | 'energy-class'
  | 'certification'
  | 'length'
  | 'lanes'
  | 'reinforcement'
  | 'year'
  | 'cinema'
  | 'registration'
  | 'generic'

export interface ProjectSpecDefinition {
  icon: string
  color?: string
}

export const PROJECT_SPEC_TYPES: Record<ProjectSpecType, ProjectSpecDefinition> = {
  'floors':            { icon: 'Layers' },
  'units':             { icon: 'Building2' },
  'offices':           { icon: 'Briefcase' },
  'shops':             { icon: 'Store' },
  'parking':           { icon: 'Car' },
  'construction-type': { icon: 'Wrench' },
  'energy-class':      { icon: 'Zap' },
  'certification':     { icon: 'Award' },
  'length':            { icon: 'Ruler' },
  'lanes':             { icon: 'AlignLeft' },
  'reinforcement':     { icon: 'ShieldCheck' },
  'year':              { icon: 'CalendarDays' },
  'cinema':            { icon: 'Film' },
  'registration':      { icon: 'FileCheck' },
  'generic':           { icon: 'Hash' },
}

export type ProjectFeatureKey =
  | 'swimming-pool'
  | 'gym'
  | 'playground'
  | 'security'
  | 'elevator'
  | 'parking'
  | 'generator'
  | 'landscape'
  | 'insulation'
  | 'smart-home'
  | 'solar'
  | 'central-heating'
  | 'seismic'
  | 'waterproofing'
  | 'fire-system'
  | 'intercom'

export interface ProjectImage {
  id: string
  url: string
  alt: string
  width: number
  height: number
}

export interface ProjectSpec {
  label: string
  value: string
  type?: ProjectSpecType
}

export interface ProjectFeatureDefinition {
  label: string
  icon: string
}

export interface Project {
  id: string
  slug: string
  title: string
  description: string
  category: ProjectCategory
  location: string
  completionDate: string
  area: number
  images: ProjectImage[]
  thumbnailUrl: string
  featured: boolean
  createdAt: string
  // Optional fields for detail page (admin selects per project)
  status?: ProjectStatus
  specs?: ProjectSpec[]
  features?: ProjectFeatureKey[]
  client?: string
  architect?: string
  startDate?: string
}

export const PROJECT_CATEGORIES: Record<ProjectCategory, string> = {
  konut: 'Konut',
  ticari: 'Ticari',
  altyapi: 'Altyapi',
  renovasyon: 'Renovasyon',
}

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  completed: 'Tamamlandi',
  ongoing: 'Devam Ediyor',
  planned: 'Planlaniyor',
}

export const PROJECT_FEATURES: Record<ProjectFeatureKey, ProjectFeatureDefinition> = {
  'swimming-pool': { label: 'Yuzme Havuzu', icon: 'Waves' },
  'gym': { label: 'Spor Salonu', icon: 'Dumbbell' },
  'playground': { label: 'Cocuk Oyun Alani', icon: 'Baby' },
  'security': { label: '7/24 Guvenlik', icon: 'ShieldCheck' },
  'elevator': { label: 'Asansor', icon: 'ArrowUpDown' },
  'parking': { label: 'Otopark', icon: 'Car' },
  'generator': { label: 'Jenerator', icon: 'Zap' },
  'landscape': { label: 'Peyzaj', icon: 'TreePine' },
  'insulation': { label: 'Isi Yalitimi', icon: 'Thermometer' },
  'smart-home': { label: 'Akilli Ev', icon: 'Wifi' },
  'solar': { label: 'Gunes Paneli', icon: 'Sun' },
  'central-heating': { label: 'Merkezi Isitma', icon: 'Flame' },
  'seismic': { label: 'Deprem Izolatoru', icon: 'Shield' },
  'waterproofing': { label: 'Su Yalitimi', icon: 'Droplets' },
  'fire-system': { label: 'Yangin Sistemi', icon: 'Siren' },
  'intercom': { label: 'Goruntulu Diafon', icon: 'Video' },
}

// ============================================================
// Domain Types (Supabase-backed)
// ============================================================

export type ProjectCategory = 'konut' | 'ticari' | 'karma'
export type ProjectStatus = 'ongoing' | 'completed' | 'planned'
export type ProjectNizam = 'bitisik' | 'ayrik'

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
  label: string
  color?: string
}

export const PROJECT_SPEC_TYPES: Record<ProjectSpecType, ProjectSpecDefinition> = {
  'floors':            { icon: 'Layers',       label: 'Kat Sayisi' },
  'units':             { icon: 'Building2',    label: 'Daire / Birim' },
  'offices':           { icon: 'Briefcase',    label: 'Ofis' },
  'shops':             { icon: 'Store',        label: 'Dukkan / Magaza' },
  'parking':           { icon: 'Car',          label: 'Otopark' },
  'construction-type': { icon: 'Wrench',       label: 'Yapi Tipi' },
  'energy-class':      { icon: 'Zap',          label: 'Enerji Sinifi' },
  'certification':     { icon: 'Award',        label: 'Sertifika' },
  'length':            { icon: 'Ruler',        label: 'Uzunluk' },
  'lanes':             { icon: 'AlignLeft',    label: 'Serit Sayisi' },
  'reinforcement':     { icon: 'ShieldCheck',  label: 'Guclendirme' },
  'year':              { icon: 'CalendarDays', label: 'Yil' },
  'cinema':            { icon: 'Film',         label: 'Sinema' },
  'registration':      { icon: 'FileCheck',    label: 'Kayit / Tescil' },
  'generic':           { icon: 'Hash',         label: 'Genel' },
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

export interface ProjectFeatureDefinition {
  label: string
  icon: string
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

export interface ProjectImage {
  id: string
  url: string
  alt: string
  width?: number | null
  height?: number | null
}

export interface ProjectSpec {
  label: string
  value: string
  type?: ProjectSpecType | string
}

export interface ProjectFeature {
  key: string
  label: string
  icon?: string
}

export interface Project {
  id: string
  slug: string
  title: string
  description: string
  category: ProjectCategory
  status: ProjectStatus
  nizam?: ProjectNizam | null
  location: string
  area: number
  floorCount: number
  unitCount?: number | null
  parkingFloorCount?: number | null
  completionDate?: string | null
  startDate?: string | null
  apartmentTypes?: string[] | null
  client?: string | null
  architect?: string | null
  featured: boolean
  specs: ProjectSpec[]
  features: ProjectFeature[]
  thumbnailUrl?: string | null
  orderIndex: number
  images: ProjectImage[]
  createdAt: string
  updatedAt: string
}

export const PROJECT_CATEGORIES: Record<ProjectCategory, string> = {
  konut: 'Konut',
  ticari: 'Ticari',
  karma: 'Karma',
}

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  completed: 'Tamamlandi',
  ongoing: 'Devam Ediyor',
  planned: 'Planlaniyor',
}

export const PROJECT_NIZAM_LABELS: Record<ProjectNizam, string> = {
  bitisik: 'Bitisik Nizam',
  ayrik: 'Ayrik Nizam',
}

// ============================================================
// DB Row Types (snake_case — as returned by Supabase)
// ============================================================

export interface ProjectImageRow {
  id: string
  project_id: string
  url: string
  alt: string | null
  width: number | null
  height: number | null
  order_index: number
  created_at: string
}

export interface ProjectRow {
  id: string
  slug: string
  title: string
  description: string
  category: ProjectCategory
  status: ProjectStatus
  nizam: ProjectNizam | null
  location: string
  area: number
  floor_count: number
  unit_count: number | null
  parking_floor_count: number | null
  completion_date: string | null
  start_date: string | null
  apartment_types: string[] | null
  client: string | null
  architect: string | null
  featured: boolean
  specs: ProjectSpec[] | null
  features: ProjectFeature[] | Record<string, unknown> | null
  thumbnail_url: string | null
  order_index: number
  created_at: string
  updated_at: string
  project_images?: ProjectImageRow[]
}

// ============================================================
// Mappers (DB row → Domain)
// ============================================================

const normalizeFeatures = (
  raw: ProjectRow['features'],
): ProjectFeature[] => {
  if (!raw) return []
  if (Array.isArray(raw)) return raw as ProjectFeature[]
  // Legacy object shape { key: true } → convert to array of ProjectFeature
  return Object.entries(raw)
    .filter(([, v]) => v === true || typeof v === 'string')
    .map(([key, v]) => {
      const catalog = PROJECT_FEATURES[key as ProjectFeatureKey]
      return {
        key,
        label: catalog?.label ?? (typeof v === 'string' ? v : key),
        icon: catalog?.icon,
      }
    })
}

export const mapProjectRow = (row: ProjectRow): Project => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  description: row.description,
  category: row.category,
  status: row.status,
  nizam: row.nizam,
  location: row.location,
  area: row.area,
  floorCount: row.floor_count,
  unitCount: row.unit_count,
  parkingFloorCount: row.parking_floor_count,
  completionDate: row.completion_date,
  startDate: row.start_date,
  apartmentTypes: row.apartment_types,
  client: row.client,
  architect: row.architect,
  featured: row.featured,
  specs: row.specs ?? [],
  features: normalizeFeatures(row.features),
  thumbnailUrl: row.thumbnail_url,
  orderIndex: row.order_index,
  images: (row.project_images ?? [])
    .sort((a, b) => a.order_index - b.order_index)
    .map((img) => ({
      id: img.id,
      url: img.url,
      alt: img.alt ?? row.title,
      width: img.width,
      height: img.height,
    })),
  createdAt: row.created_at,
  updatedAt: row.updated_at,
})

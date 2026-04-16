'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Save, Plus, X } from 'lucide-react'
import { toast } from 'sonner'
import { slugify, cn } from '@/lib/utils'
import {
  PROJECT_CATEGORIES,
  PROJECT_STATUS_LABELS,
  PROJECT_NIZAM_LABELS,
  PROJECT_FEATURES,
  PROJECT_SPEC_TYPES,
} from '@/types/project'
import type {
  Project,
  ProjectCategory,
  ProjectStatus,
  ProjectNizam,
  ProjectSpec,
  ProjectFeature,
  ProjectFeatureKey,
  ProjectSpecType,
} from '@/types/project'

interface ProjectFormProps {
  mode: 'create' | 'edit'
  project?: Project
}

interface FormState {
  title: string
  slug: string
  description: string
  category: ProjectCategory
  status: ProjectStatus
  nizam: ProjectNizam | ''
  location: string
  area: string
  floorCount: string
  unitCount: string
  parkingFloorCount: string
  completionDate: string
  startDate: string
  apartmentTypes: string[]
  client: string
  architect: string
  featured: boolean
  specs: ProjectSpec[]
  features: ProjectFeature[]
  orderIndex: string
}

const initialState = (project?: Project): FormState => ({
  title: project?.title ?? '',
  slug: project?.slug ?? '',
  description: project?.description ?? '',
  category: project?.category ?? 'konut',
  status: project?.status ?? 'ongoing',
  nizam: project?.nizam ?? '',
  location: project?.location ?? '',
  area: project?.area ? String(project.area) : '',
  floorCount: project?.floorCount ? String(project.floorCount) : '',
  unitCount: project?.unitCount ? String(project.unitCount) : '',
  parkingFloorCount: project?.parkingFloorCount ? String(project.parkingFloorCount) : '',
  completionDate: project?.completionDate ?? '',
  startDate: project?.startDate ?? '',
  apartmentTypes: project?.apartmentTypes ?? [],
  client: project?.client ?? '',
  architect: project?.architect ?? '',
  featured: project?.featured ?? false,
  specs: project?.specs ?? [],
  features: project?.features ?? [],
  orderIndex: project?.orderIndex !== undefined ? String(project.orderIndex) : '0',
})

const specTypeOptions = Object.keys(PROJECT_SPEC_TYPES) as ProjectSpecType[]
const featureCatalog = Object.entries(PROJECT_FEATURES) as [
  ProjectFeatureKey,
  { label: string; icon: string },
][]

const ProjectForm = ({ mode, project }: ProjectFormProps) => {
  const router = useRouter()
  const [state, setState] = useState<FormState>(initialState(project))
  const [slugTouched, setSlugTouched] = useState(mode === 'edit')
  const [apartmentInput, setApartmentInput] = useState('')
  const [loading, setLoading] = useState(false)

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }))
  }

  const onTitleChange = (value: string) => {
    setField('title', value)
    if (!slugTouched) {
      setField('slug', slugify(value))
    }
  }

  // Apartment types
  const addApartmentType = () => {
    const val = apartmentInput.trim()
    if (!val) return
    if (state.apartmentTypes.includes(val)) {
      setApartmentInput('')
      return
    }
    setField('apartmentTypes', [...state.apartmentTypes, val])
    setApartmentInput('')
  }
  const removeApartmentType = (t: string) => {
    setField(
      'apartmentTypes',
      state.apartmentTypes.filter((x) => x !== t),
    )
  }

  // Specs
  const addSpec = () => {
    setField('specs', [...state.specs, { label: '', value: '', type: 'generic' }])
  }
  const removeSpec = (index: number) => {
    setField('specs', state.specs.filter((_, i) => i !== index))
  }
  const updateSpec = (index: number, patch: Partial<ProjectSpec>) => {
    setField(
      'specs',
      state.specs.map((s, i) => (i === index ? { ...s, ...patch } : s)),
    )
  }

  // Features
  const toggleCatalogFeature = (key: ProjectFeatureKey) => {
    const exists = state.features.find((f) => f.key === key)
    if (exists) {
      setField('features', state.features.filter((f) => f.key !== key))
    } else {
      const def = PROJECT_FEATURES[key]
      setField('features', [...state.features, { key, label: def.label, icon: def.icon }])
    }
  }
  const addCustomFeature = () => {
    const customKey = `custom_${Date.now()}`
    setField('features', [...state.features, { key: customKey, label: '', icon: 'CheckCircle2' }])
  }
  const updateCustomFeature = (key: string, label: string) => {
    setField(
      'features',
      state.features.map((f) => (f.key === key ? { ...f, label } : f)),
    )
  }
  const removeCustomFeature = (key: string) => {
    setField('features', state.features.filter((f) => f.key !== key))
  }

  const customFeatures = state.features.filter((f) => f.key.startsWith('custom_'))

  // Submit
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validation
    if (!state.title.trim()) {
      toast.error('Baslik gerekli')
      setLoading(false)
      return
    }
    if (!state.description.trim()) {
      toast.error('Aciklama gerekli')
      setLoading(false)
      return
    }
    if (!state.location.trim()) {
      toast.error('Konum gerekli')
      setLoading(false)
      return
    }
    const areaNum = Number(state.area)
    const floorNum = Number(state.floorCount)
    if (!Number.isFinite(areaNum) || areaNum <= 0) {
      toast.error("Alan (m²) pozitif bir sayi olmali")
      setLoading(false)
      return
    }
    if (!Number.isInteger(floorNum) || floorNum <= 0) {
      toast.error('Kat sayisi pozitif bir tam sayi olmali')
      setLoading(false)
      return
    }

    // Clean specs (drop empty rows)
    const cleanSpecs = state.specs.filter(
      (s) => s.label.trim() && s.value.trim(),
    )
    // Clean features (drop unlabeled custom rows)
    const cleanFeatures = state.features.filter((f) => f.label.trim())

    const payload = {
      title: state.title.trim(),
      slug: state.slug.trim() || slugify(state.title),
      description: state.description.trim(),
      category: state.category,
      status: state.status,
      nizam: state.nizam || null,
      location: state.location.trim(),
      area: areaNum,
      floor_count: floorNum,
      unit_count: state.unitCount ? Number(state.unitCount) : null,
      parking_floor_count: state.parkingFloorCount ? Number(state.parkingFloorCount) : null,
      completion_date: state.completionDate.trim() || null,
      start_date: state.startDate.trim() || null,
      apartment_types: state.apartmentTypes.length > 0 ? state.apartmentTypes : null,
      client: state.client.trim() || null,
      architect: state.architect.trim() || null,
      featured: state.featured,
      specs: cleanSpecs,
      features: cleanFeatures,
      order_index: Number(state.orderIndex) || 0,
    }

    try {
      const url =
        mode === 'create'
          ? '/api/admin/projects'
          : `/api/admin/projects/${project!.id}`
      const method = mode === 'create' ? 'POST' : 'PATCH'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error || 'Kayit basarisiz')
        return
      }
      toast.success(mode === 'create' ? 'Proje olusturuldu' : 'Proje guncellendi')

      if (mode === 'create' && data?.project?.id) {
        router.push(`/admin/projeler/${data.project.id}`)
      } else {
        router.refresh()
      }
    } catch {
      toast.error('Baglanti hatasi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* ── Basic Info ── */}
      <Card title="Temel Bilgiler">
        <Row>
          <Field label="Baslik" required>
            <input
              type="text"
              value={state.title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Park Konutlari"
              className={inputCls}
              required
            />
          </Field>
          <Field label="Slug (URL)" hint="Otomatik olusur, degistirebilirsin">
            <input
              type="text"
              value={state.slug}
              onChange={(e) => {
                setSlugTouched(true)
                setField('slug', slugify(e.target.value))
              }}
              placeholder="park-konutlari"
              className={inputCls}
            />
          </Field>
        </Row>

        <Field label="Aciklama" required>
          <textarea
            value={state.description}
            onChange={(e) => setField('description', e.target.value)}
            placeholder="Proje aciklamasi. Paragraflari bosluk ile ayirmak icin satir atlayabilirsiniz."
            rows={6}
            className={cn(inputCls, 'min-h-[140px] resize-y py-2.5')}
            required
          />
        </Field>
      </Card>

      {/* ── Classification ── */}
      <Card title="Siniflandirma">
        <Row>
          <Field label="Kategori" required>
            <select
              value={state.category}
              onChange={(e) =>
                setField('category', e.target.value as ProjectCategory)
              }
              className={inputCls}
            >
              {Object.entries(PROJECT_CATEGORIES).map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Durum" required>
            <select
              value={state.status}
              onChange={(e) =>
                setField('status', e.target.value as ProjectStatus)
              }
              className={inputCls}
            >
              {Object.entries(PROJECT_STATUS_LABELS).map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Nizam">
            <select
              value={state.nizam}
              onChange={(e) =>
                setField('nizam', e.target.value as ProjectNizam | '')
              }
              className={inputCls}
            >
              <option value="">Secim yok</option>
              {Object.entries(PROJECT_NIZAM_LABELS).map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </Field>
        </Row>

        <Row>
          <Field label="Konum" required>
            <input
              type="text"
              value={state.location}
              onChange={(e) => setField('location', e.target.value)}
              placeholder="Beylikduzu, Istanbul"
              className={inputCls}
              required
            />
          </Field>
          <Field label="Siralama (order_index)" hint="Kucuk sayi ustte gorunur">
            <input
              type="number"
              value={state.orderIndex}
              onChange={(e) => setField('orderIndex', e.target.value)}
              min={0}
              className={inputCls}
            />
          </Field>
        </Row>
      </Card>

      {/* ── Numeric specs ── */}
      <Card title="Temel Rakamlar">
        <Row>
          <Field label="Alan (m²)" required>
            <input
              type="number"
              value={state.area}
              onChange={(e) => setField('area', e.target.value)}
              min={1}
              placeholder="28000"
              className={inputCls}
              required
            />
          </Field>
          <Field label="Kat Sayisi" required>
            <input
              type="number"
              value={state.floorCount}
              onChange={(e) => setField('floorCount', e.target.value)}
              min={1}
              placeholder="12"
              className={inputCls}
              required
            />
          </Field>
          <Field label="Daire Sayisi">
            <input
              type="number"
              value={state.unitCount}
              onChange={(e) => setField('unitCount', e.target.value)}
              min={0}
              placeholder="120"
              className={inputCls}
            />
          </Field>
          <Field label="Otopark Kat Sayisi">
            <input
              type="number"
              value={state.parkingFloorCount}
              onChange={(e) => setField('parkingFloorCount', e.target.value)}
              min={0}
              placeholder="2"
              className={inputCls}
            />
          </Field>
        </Row>

        <Row>
          <Field label="Baslangic Tarihi (yil)">
            <input
              type="text"
              value={state.startDate}
              onChange={(e) => setField('startDate', e.target.value)}
              placeholder="2021"
              className={inputCls}
            />
          </Field>
          <Field label="Tamamlanma Tarihi (yil)">
            <input
              type="text"
              value={state.completionDate}
              onChange={(e) => setField('completionDate', e.target.value)}
              placeholder="2024"
              className={inputCls}
            />
          </Field>
          <Field label="Isveren">
            <input
              type="text"
              value={state.client}
              onChange={(e) => setField('client', e.target.value)}
              placeholder="Korkmaz Yapi A.S."
              className={inputCls}
            />
          </Field>
          <Field label="Mimari">
            <input
              type="text"
              value={state.architect}
              onChange={(e) => setField('architect', e.target.value)}
              placeholder="Tabanlioglu Mimarlik"
              className={inputCls}
            />
          </Field>
        </Row>
      </Card>

      {/* ── Apartment types (only for konut) ── */}
      {state.category === 'konut' && (
        <Card title="Daire Tipleri" subtitle="Sadece konut projeleri icin (2+1, 3+1 vb.)">
          <div className="flex flex-wrap items-center gap-2">
            {state.apartmentTypes.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-sm"
              >
                {t}
                <button
                  type="button"
                  onClick={() => removeApartmentType(t)}
                  className="text-muted-foreground hover:text-red-600"
                  aria-label={`${t} kaldir`}
                >
                  <X className="size-3" />
                </button>
              </span>
            ))}
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={apartmentInput}
                onChange={(e) => setApartmentInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addApartmentType()
                  }
                }}
                placeholder="2+1"
                className={cn(inputCls, 'h-8 w-24')}
              />
              <button
                type="button"
                onClick={addApartmentType}
                className="inline-flex h-8 items-center gap-1 rounded-md border border-border bg-white px-3 text-xs font-semibold hover:bg-secondary"
              >
                <Plus className="size-3" /> Ekle
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* ── Specs (dynamic list) ── */}
      <Card
        title="Ozellikler (Specs)"
        subtitle="Etiket + deger + ikon tipi. Ornegin 'Blok Sayisi' = '6'"
        action={
          <button
            type="button"
            onClick={addSpec}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-white px-3 py-1.5 text-xs font-semibold hover:bg-secondary"
          >
            <Plus className="size-3.5" /> Ozellik Ekle
          </button>
        }
      >
        {state.specs.length === 0 ? (
          <p className="text-sm text-muted-foreground">Henuz ozellik eklenmemis.</p>
        ) : (
          <div className="space-y-2">
            {state.specs.map((spec, i) => (
              <div
                key={i}
                className="grid grid-cols-1 gap-2 rounded-lg border border-border bg-secondary/30 p-3 md:grid-cols-[2fr_2fr_1fr_auto]"
              >
                <input
                  type="text"
                  value={spec.label}
                  onChange={(e) => updateSpec(i, { label: e.target.value })}
                  placeholder="Etiket (Kat Sayisi)"
                  className={inputCls}
                />
                <input
                  type="text"
                  value={spec.value}
                  onChange={(e) => updateSpec(i, { value: e.target.value })}
                  placeholder="Deger (12)"
                  className={inputCls}
                />
                <select
                  value={spec.type ?? 'generic'}
                  onChange={(e) => updateSpec(i, { type: e.target.value as ProjectSpecType })}
                  className={inputCls}
                >
                  {specTypeOptions.map((t) => (
                    <option key={t} value={t}>
                      {PROJECT_SPEC_TYPES[t].label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => removeSpec(i)}
                  className="inline-flex size-9 items-center justify-center rounded-md border border-red-200 text-red-600 hover:bg-red-50"
                  aria-label="Ozelligi kaldir"
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* ── Features (catalog + custom) ── */}
      <Card
        title="Donanimlar"
        subtitle="Standart donanimlar icin kutulari isaretleyin, ozel donanim icin 'Ozel' ekleyin"
      >
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {featureCatalog.map(([key, def]) => {
            const active = !!state.features.find((f) => f.key === key)
            return (
              <label
                key={key}
                className={cn(
                  'flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition',
                  active
                    ? 'border-accent bg-accent/5 text-foreground'
                    : 'border-border bg-white hover:bg-secondary',
                )}
              >
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => toggleCatalogFeature(key)}
                  className="size-4 rounded border-border text-accent focus:ring-accent"
                />
                <span className="flex-1 text-left">{def.label}</span>
              </label>
            )
          })}
        </div>

        <div className="mt-5 border-t border-border pt-5">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Ozel Donanimlar
            </h4>
            <button
              type="button"
              onClick={addCustomFeature}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-white px-3 py-1.5 text-xs font-semibold hover:bg-secondary"
            >
              <Plus className="size-3.5" /> Ozel Ekle
            </button>
          </div>
          {customFeatures.length === 0 ? (
            <p className="text-sm text-muted-foreground">Henuz ozel donanim yok.</p>
          ) : (
            <div className="space-y-2">
              {customFeatures.map((f) => (
                <div key={f.key} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={f.label}
                    onChange={(e) => updateCustomFeature(f.key, e.target.value)}
                    placeholder="Ozel donanim adi"
                    className={inputCls}
                  />
                  <button
                    type="button"
                    onClick={() => removeCustomFeature(f.key)}
                    className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-red-200 text-red-600 hover:bg-red-50"
                    aria-label="Ozel donanimi kaldir"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* ── Featured toggle ── */}
      <Card title="Yayim">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={state.featured}
            onChange={(e) => setField('featured', e.target.checked)}
            className="size-5 rounded border-border text-accent focus:ring-accent"
          />
          <span>
            <span className="block text-sm font-semibold text-foreground">
              Ana sayfada one cikar
            </span>
            <span className="block text-xs text-muted-foreground">
              Isaretli projeler ana sayfadaki &quot;One Cikan Projeler&quot; alaninda gosterilir
            </span>
          </span>
        </label>
      </Card>

      {/* ── Submit ── */}
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="rounded-lg border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary"
        >
          Iptal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent/90 disabled:opacity-50"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          {mode === 'create' ? 'Projeyi Olustur' : 'Degisiklikleri Kaydet'}
        </button>
      </div>
    </form>
  )
}

// ============================================================
// Helpers
// ============================================================
const inputCls =
  'w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent'

const Card = ({
  title,
  subtitle,
  action,
  children,
}: {
  title: string
  subtitle?: string
  action?: React.ReactNode
  children: React.ReactNode
}) => (
  <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-1 text-xs text-muted-foreground/80">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
    <div className="space-y-4">{children}</div>
  </section>
)

const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:[&:has(>:nth-child(3))]:grid-cols-3 lg:[&:has(>:nth-child(4))]:grid-cols-4">
    {children}
  </div>
)

const Field = ({
  label,
  required,
  hint,
  children,
}: {
  label: string
  required?: boolean
  hint?: string
  children: React.ReactNode
}) => (
  <label className="block">
    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {label}
      {required && <span className="ml-1 text-red-500">*</span>}
    </span>
    {children}
    {hint && <span className="mt-1 block text-[11px] text-muted-foreground/70">{hint}</span>}
  </label>
)

export default ProjectForm

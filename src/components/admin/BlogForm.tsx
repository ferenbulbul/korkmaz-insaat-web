'use client'

import { useState, useRef, type FormEvent, type ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Save, X, Upload, Trash2, ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import { slugify, cn } from '@/lib/utils'
import { BLOG_STATUS_LABELS } from '@/types/blog'
import type { BlogPost, BlogStatus } from '@/types/blog'

interface BlogFormProps {
  mode: 'create' | 'edit'
  post?: BlogPost
}

interface FormState {
  title: string
  slug: string
  excerpt: string
  content: string
  status: BlogStatus
  featuredImage: string
  tags: string[]
}

const initialState = (post?: BlogPost): FormState => ({
  title: post?.title ?? '',
  slug: post?.slug ?? '',
  excerpt: post?.excerpt ?? '',
  content: post?.content ?? '',
  status: post?.status ?? 'draft',
  featuredImage: post?.featuredImage ?? '',
  tags: post?.tags ?? [],
})

const BlogForm = ({ mode, post }: BlogFormProps) => {
  const router = useRouter()
  const [state, setState] = useState<FormState>(initialState(post))
  const [slugTouched, setSlugTouched] = useState(mode === 'edit')
  const [tagInput, setTagInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }))
  }

  const onTitleChange = (value: string) => {
    setField('title', value)
    if (!slugTouched) {
      setField('slug', slugify(value))
    }
  }

  // Tags
  const addTag = () => {
    const val = tagInput.trim().toLowerCase()
    if (!val) return
    if (state.tags.includes(val)) {
      setTagInput('')
      return
    }
    setField('tags', [...state.tags, val])
    setTagInput('')
  }

  const removeTag = (t: string) => {
    setField('tags', state.tags.filter((x) => x !== t))
  }

  // Image upload
  const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)

    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/blog/upload', {
        method: 'POST',
        body: fd,
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error || 'Gorsel yuklenemedi')
        return
      }
      setField('featuredImage', data.url)
      toast.success('Gorsel yuklendi')
    } catch {
      toast.error('Yukleme hatasi')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  // Submit
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!state.title.trim()) {
      toast.error('Baslik gerekli')
      setLoading(false)
      return
    }
    if (!state.excerpt.trim()) {
      toast.error('Ozet gerekli')
      setLoading(false)
      return
    }
    if (!state.content.trim()) {
      toast.error('Icerik gerekli')
      setLoading(false)
      return
    }

    const payload = {
      title: state.title.trim(),
      slug: state.slug.trim() || slugify(state.title),
      excerpt: state.excerpt.trim(),
      content: state.content.trim(),
      status: state.status,
      featured_image: state.featuredImage.trim() || null,
      tags: state.tags,
    }

    try {
      const url =
        mode === 'create'
          ? '/api/admin/blog'
          : `/api/admin/blog/${post!.id}`
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
      toast.success(mode === 'create' ? 'Yazi olusturuldu' : 'Yazi guncellendi')

      if (mode === 'create' && data?.post?.id) {
        router.push(`/admin/yazilar/${data.post.id}`)
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
      {/* Basic Info */}
      <Card title="Temel Bilgiler">
        <Row>
          <Field label="Baslik" required>
            <input
              type="text"
              value={state.title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Gonende Yeni Konut Trendleri"
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
              placeholder="gonende-yeni-konut-trendleri"
              className={inputCls}
            />
          </Field>
        </Row>

        <Field label="Ozet (SEO Description)" required>
          <textarea
            value={state.excerpt}
            onChange={(e) => setField('excerpt', e.target.value)}
            placeholder="Kisa bir ozet yazin. Bu metin arama sonuclarinda gorunecek."
            rows={3}
            className={cn(inputCls, 'min-h-[80px] resize-y py-2.5')}
            required
          />
        </Field>

        <Field label="Icerik" required>
          <textarea
            value={state.content}
            onChange={(e) => setField('content', e.target.value)}
            placeholder="Blog yazisi icerigi. Markdown desteklidir."
            rows={16}
            className={cn(inputCls, 'min-h-[300px] resize-y py-2.5 font-mono text-sm')}
            required
          />
        </Field>
      </Card>

      {/* Image & Status */}
      <Card title="Gorsel ve Durum">
        <Field label="Kapak Gorseli">
          {state.featuredImage ? (
            <div className="relative inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={state.featuredImage}
                alt="Kapak gorseli"
                className="h-48 max-w-full rounded-lg border border-border object-cover"
              />
              <button
                type="button"
                onClick={() => setField('featuredImage', '')}
                className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-red-600 text-white shadow-sm transition hover:bg-red-700"
                aria-label="Gorseli kaldir"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-secondary/30 py-10 text-center">
              <ImageIcon className="mb-2 size-8 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">Henuz kapak gorseli yok</p>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 text-xs font-semibold text-white hover:bg-accent/90 disabled:opacity-50"
              >
                {uploading ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Upload className="size-3.5" />
                )}
                Gorsel Yukle
              </button>
            </div>
          )}
          {state.featuredImage && (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-border bg-white px-3 py-1.5 text-xs font-semibold hover:bg-secondary disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Upload className="size-3.5" />
              )}
              Degistir
            </button>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={onImageChange}
            className="hidden"
          />
        </Field>

        <Field label="Durum" required>
          <select
            value={state.status}
            onChange={(e) => setField('status', e.target.value as BlogStatus)}
            className={inputCls}
          >
            {Object.entries(BLOG_STATUS_LABELS).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </Field>
      </Card>

      {/* Tags */}
      <Card title="Etiketler" subtitle="SEO etiketleri (virgul ile ayirin veya Enter'a basin)">
        <div className="flex flex-wrap items-center gap-2">
          {state.tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-sm"
            >
              {t}
              <button
                type="button"
                onClick={() => removeTag(t)}
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
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ',') {
                  e.preventDefault()
                  addTag()
                }
              }}
              placeholder="gonen, satilik daire..."
              className={cn(inputCls, 'h-8 w-48')}
            />
            <button
              type="button"
              onClick={addTag}
              className="inline-flex h-8 items-center gap-1 rounded-md border border-border bg-white px-3 text-xs font-semibold hover:bg-secondary"
            >
              Ekle
            </button>
          </div>
        </div>
      </Card>

      {/* Submit */}
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push('/admin/yazilar')}
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
          {mode === 'create' ? 'Yaziyi Olustur' : 'Degisiklikleri Kaydet'}
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
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) => (
  <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
    <div className="mb-5">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      {subtitle && (
        <p className="mt-1 text-xs text-muted-foreground/80">{subtitle}</p>
      )}
    </div>
    <div className="space-y-4">{children}</div>
  </section>
)

const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

export default BlogForm

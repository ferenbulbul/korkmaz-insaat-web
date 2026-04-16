'use client'

import { useState, useRef, useEffect, type ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import {
  Upload, Loader2, Star, Trash2, GripVertical, ImageIcon,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import type { Project, ProjectImage } from '@/types/project'

interface ImageManagerProps {
  project: Project
}

const ImageManager = ({ project }: ImageManagerProps) => {
  const router = useRouter()
  const [images, setImages] = useState<ProjectImage[]>(project.images)
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(
    project.thumbnailUrl ?? null,
  )
  const [uploading, setUploading] = useState(false)
  const [dragId, setDragId] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  // Sync from parent when project changes
  useEffect(() => {
    setImages(project.images)
    setThumbnailUrl(project.thumbnailUrl ?? null)
  }, [project])

  const onFilesChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    setUploading(true)

    try {
      const newImages: ProjectImage[] = []
      for (const file of Array.from(files)) {
        const fd = new FormData()
        fd.append('file', file)
        fd.append('alt', project.title)
        const res = await fetch(`/api/admin/projects/${project.id}/images`, {
          method: 'POST',
          body: fd,
        })
        const data = await res.json()
        if (!res.ok) {
          toast.error(data?.error || `${file.name} yuklenemedi`)
          continue
        }
        newImages.push(data.image)
      }
      if (newImages.length > 0) {
        setImages((prev) => [...prev, ...newImages])
        // If no thumbnail was set, the backend sets the first upload as thumbnail
        if (!thumbnailUrl && newImages[0]) {
          setThumbnailUrl(newImages[0].url)
        }
        toast.success(`${newImages.length} gorsel yuklendi`)
        router.refresh()
      }
    } catch {
      toast.error('Yukleme hatasi')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const onDelete = async (imageId: string) => {
    if (!window.confirm('Bu gorseli silmek istediginize emin misiniz?')) return
    try {
      const res = await fetch(`/api/admin/images/${imageId}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        toast.error(data?.error || 'Silinemedi')
        return
      }
      const removed = images.find((i) => i.id === imageId)
      setImages((prev) => prev.filter((i) => i.id !== imageId))
      // If we deleted the thumbnail, clear it
      if (removed && removed.url === thumbnailUrl) {
        setThumbnailUrl(null)
        await fetch(`/api/admin/projects/${project.id}/thumbnail`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ thumbnailUrl: null }),
        })
      }
      toast.success('Gorsel silindi')
      router.refresh()
    } catch {
      toast.error('Baglanti hatasi')
    }
  }

  const onSetThumbnail = async (image: ProjectImage) => {
    setThumbnailUrl(image.url)
    try {
      const res = await fetch(`/api/admin/projects/${project.id}/thumbnail`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ thumbnailUrl: image.url }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        toast.error(data?.error || 'Kayit basarisiz')
        return
      }
      toast.success('Kapak gorseli olarak ayarlandi')
      router.refresh()
    } catch {
      toast.error('Baglanti hatasi')
    }
  }

  // Drag-and-drop reorder
  const onDragStart = (id: string) => setDragId(id)
  const onDragOver = (e: React.DragEvent) => e.preventDefault()
  const onDrop = async (targetId: string) => {
    if (!dragId || dragId === targetId) {
      setDragId(null)
      return
    }
    const dragIndex = images.findIndex((i) => i.id === dragId)
    const targetIndex = images.findIndex((i) => i.id === targetId)
    if (dragIndex === -1 || targetIndex === -1) return

    const reordered = [...images]
    const [moved] = reordered.splice(dragIndex, 1)
    reordered.splice(targetIndex, 0, moved)
    setImages(reordered)
    setDragId(null)

    try {
      await fetch(`/api/admin/projects/${project.id}/images`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderedIds: reordered.map((i) => i.id) }),
      })
      router.refresh()
    } catch {
      toast.error('Siralama kaydedilemedi')
    }
  }

  return (
    <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Gorseller
          </h3>
          <p className="mt-1 text-xs text-muted-foreground/80">
            Birden fazla gorsel yukleyebilirsiniz. Siralama icin surukleyin, kapak icin yildiza tiklayin.
          </p>
        </div>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-2 text-xs font-semibold text-white hover:bg-accent/90 disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Upload className="size-3.5" />
          )}
          Gorsel Yukle
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          multiple
          onChange={onFilesChange}
          className="hidden"
        />
      </div>

      {images.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-secondary/30 py-12 text-center">
          <ImageIcon className="mb-3 size-10 text-muted-foreground/40" />
          <p className="text-sm font-medium text-foreground">Henuz gorsel yok</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Projeyi yayinlamak icin en az bir gorsel yukleyin.
          </p>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 text-xs font-semibold text-white hover:bg-accent/90"
          >
            <Upload className="size-3.5" />
            Ilk Gorseli Yukle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {images.map((img) => {
            const isThumb = img.url === thumbnailUrl
            return (
              <div
                key={img.id}
                draggable
                onDragStart={() => onDragStart(img.id)}
                onDragOver={onDragOver}
                onDrop={() => onDrop(img.id)}
                className={cn(
                  'group relative aspect-square overflow-hidden rounded-lg border bg-secondary',
                  isThumb ? 'border-gold-500 ring-2 ring-gold-500/30' : 'border-border',
                  dragId === img.id && 'opacity-40',
                )}
              >
                {/* Native img — admin view, no optimization needed; bypasses next/image hostname allow-list */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.alt ?? project.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />

                {/* Drag handle */}
                <div className="absolute left-1.5 top-1.5 flex size-7 cursor-grab items-center justify-center rounded-md bg-black/40 text-white backdrop-blur opacity-0 transition group-hover:opacity-100">
                  <GripVertical className="size-3.5" />
                </div>

                {/* Actions */}
                <div className="absolute right-1.5 top-1.5 flex items-center gap-1 opacity-0 transition group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => onSetThumbnail(img)}
                    className={cn(
                      'flex size-7 items-center justify-center rounded-md backdrop-blur transition',
                      isThumb
                        ? 'bg-gold-500 text-white'
                        : 'bg-black/40 text-white hover:bg-gold-500',
                    )}
                    aria-label="Kapak olarak ayarla"
                    title="Kapak olarak ayarla"
                  >
                    <Star className={cn('size-3.5', isThumb && 'fill-white')} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(img.id)}
                    className="flex size-7 items-center justify-center rounded-md bg-black/40 text-white backdrop-blur transition hover:bg-red-600"
                    aria-label="Sil"
                    title="Sil"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>

                {/* Thumbnail badge */}
                {isThumb && (
                  <div className="absolute bottom-1.5 left-1.5 rounded-full bg-gold-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                    Kapak
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default ImageManager

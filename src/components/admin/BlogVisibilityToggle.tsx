'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface BlogVisibilityToggleProps {
  initialVisible: boolean
}

const BlogVisibilityToggle = ({ initialVisible }: BlogVisibilityToggleProps) => {
  const router = useRouter()
  const [visible, setVisible] = useState(initialVisible)
  const [saving, setSaving] = useState(false)

  const toggle = async () => {
    const next = !visible
    setSaving(true)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogVisible: next }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error ?? 'Ayar kaydedilemedi')
      }
      setVisible(next)
      toast.success(
        next
          ? 'Blog sitede tekrar gorunur oldu'
          : 'Blog siteden gizlendi',
      )
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Ayar kaydedilemedi')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground">
        {visible ? 'Blog sitede gorunuyor' : 'Blog siteden gizli'}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={visible}
        aria-label="Blogu sitede goster"
        disabled={saving}
        onClick={toggle}
        className={cn(
          'relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200',
          visible ? 'bg-accent' : 'bg-stone-300',
          saving && 'cursor-wait opacity-60',
        )}
      >
        <span
          className={cn(
            'absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow transition-transform duration-200',
            visible && 'translate-x-5',
          )}
        />
      </button>
    </div>
  )
}

export default BlogVisibilityToggle

'use client'

import { useRouter } from 'next/navigation'
import { Trash2, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface DeleteBlogButtonProps {
  postId: string
  postTitle: string
}

const DeleteBlogButton = ({ postId, postTitle }: DeleteBlogButtonProps) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onDelete = async () => {
    const confirmed = window.confirm(
      `"${postTitle}" yazisini silmek istediginize emin misiniz? Bu islem geri alinamaz.`,
    )
    if (!confirmed) return

    setLoading(true)
    try {
      const res = await fetch(`/api/admin/blog/${postId}`, {
        method: 'DELETE',
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        toast.error(data?.error || 'Silme basarisiz')
        return
      }
      toast.success('Yazi silindi')
      router.refresh()
    } catch {
      toast.error('Baglanti hatasi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={onDelete}
      disabled={loading}
      className="inline-flex size-9 items-center justify-center rounded-md border border-red-200 bg-white text-red-600 transition hover:bg-red-50 disabled:opacity-50"
      aria-label="Yaziyi sil"
    >
      {loading ? (
        <Loader2 className="size-3.5 animate-spin" />
      ) : (
        <Trash2 className="size-3.5" />
      )}
    </button>
  )
}

export default DeleteBlogButton

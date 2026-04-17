import Link from 'next/link'
import { Plus, Edit, ImageOff, Calendar, Tag } from 'lucide-react'
import { getAllBlogPostsForAdmin } from '@/services/blog'
import { BLOG_STATUS_LABELS } from '@/types/blog'
import AdminHeader from '@/components/admin/AdminHeader'
import DeleteBlogButton from '@/components/admin/DeleteBlogButton'

export const revalidate = 0

const AdminBlogPage = async () => {
  const posts = await getAllBlogPostsForAdmin()

  return (
    <>
      <AdminHeader title="Blog Yazilari" subtitle={`${posts.length} yazi`} backHref="/admin" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Tum blog yazilarini goruntuleyin, duzenleyin ve yonetin.
          </p>
          <Link
            href="/admin/yazilar/yeni"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent/90"
          >
            <Plus className="size-4" />
            Yeni Yazi
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-white p-16 text-center">
            <p className="text-lg font-semibold text-foreground">
              Henuz blog yazisi eklenmemis
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Ilk yazinizi eklemek icin butonu kullanin.
            </p>
            <Link
              href="/admin/yazilar/yeni"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent/90"
            >
              <Plus className="size-4" />
              Yeni Yazi Ekle
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="group overflow-hidden rounded-xl border border-border bg-white shadow-sm transition hover:shadow-md"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] bg-secondary">
                  {post.featuredImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center text-muted-foreground">
                      <ImageOff className="size-8 opacity-40" />
                    </div>
                  )}

                  {/* Status overlay */}
                  <div className="absolute left-3 top-3 flex items-center gap-1.5">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur ${
                      post.status === 'published'
                        ? 'bg-emerald-500/90 text-white'
                        : 'bg-white/90 text-foreground'
                    }`}>
                      {BLOG_STATUS_LABELS[post.status]}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3 p-4">
                  <div>
                    <h3 className="line-clamp-1 font-semibold text-foreground">
                      {post.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 border-t border-border pt-3 text-xs text-muted-foreground">
                    {post.publishedAt && (
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {new Date(post.publishedAt).toLocaleDateString('tr-TR')}
                      </span>
                    )}
                    {post.tags.length > 0 && (
                      <span className="flex items-center gap-1">
                        <Tag className="size-3" />
                        {post.tags.length} etiket
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <Link
                      href={`/admin/yazilar/${post.id}`}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border bg-white px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-secondary"
                    >
                      <Edit className="size-3.5" />
                      Duzenle
                    </Link>
                    <DeleteBlogButton
                      postId={post.id}
                      postTitle={post.title}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default AdminBlogPage

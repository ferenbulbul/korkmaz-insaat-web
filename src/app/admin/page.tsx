import Link from 'next/link'
import { Plus, Star, Edit, MapPin, Ruler, ImageOff } from 'lucide-react'
import { getAllProjectsForAdmin } from '@/services/projects'
import {
  PROJECT_CATEGORIES,
  PROJECT_STATUS_LABELS,
} from '@/types/project'
import AdminHeader from '@/components/admin/AdminHeader'
import DeleteProjectButton from '@/components/admin/DeleteProjectButton'

export const revalidate = 0

const AdminDashboardPage = async () => {
  const projects = await getAllProjectsForAdmin()

  return (
    <>
      <AdminHeader title="Projeler" subtitle={`${projects.length} proje`} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Tum projeleri goruntuleyin, duzenleyin ve yonetin.
          </p>
          <Link
            href="/admin/projeler/yeni"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent/90"
          >
            <Plus className="size-4" />
            Yeni Proje
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-white p-16 text-center">
            <p className="text-lg font-semibold text-foreground">
              Henuz proje eklenmemis
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Ilk projenizi eklemek icin sagdaki butonu kullanin.
            </p>
            <Link
              href="/admin/projeler/yeni"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent/90"
            >
              <Plus className="size-4" />
              Yeni Proje Ekle
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group overflow-hidden rounded-xl border border-border bg-white shadow-sm transition hover:shadow-md"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] bg-secondary">
                  {project.thumbnailUrl || project.images[0]?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.thumbnailUrl || project.images[0].url}
                      alt={project.title}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center text-muted-foreground">
                      <ImageOff className="size-8 opacity-40" />
                    </div>
                  )}

                  {/* Status + featured overlay */}
                  <div className="absolute left-3 top-3 flex items-center gap-1.5">
                    <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground backdrop-blur">
                      {PROJECT_STATUS_LABELS[project.status]}
                    </span>
                    {project.featured && (
                      <span className="flex items-center gap-1 rounded-full bg-gold-500/90 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur">
                        <Star className="size-3 fill-white" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3 p-4">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="line-clamp-1 font-semibold text-foreground">
                        {project.title}
                      </h3>
                      <span className="shrink-0 rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium uppercase text-muted-foreground">
                        {PROJECT_CATEGORIES[project.category]}
                      </span>
                    </div>
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3" /> {project.location}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 border-t border-border pt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Ruler className="size-3" />
                      {project.area.toLocaleString('tr-TR')} m²
                    </span>
                    <span>·</span>
                    <span>{project.images.length} gorsel</span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <Link
                      href={`/admin/projeler/${project.id}`}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border bg-white px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-secondary"
                    >
                      <Edit className="size-3.5" />
                      Duzenle
                    </Link>
                    <DeleteProjectButton
                      projectId={project.id}
                      projectTitle={project.title}
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

export default AdminDashboardPage

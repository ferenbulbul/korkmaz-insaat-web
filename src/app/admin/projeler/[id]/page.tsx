import { notFound } from 'next/navigation'
import AdminHeader from '@/components/admin/AdminHeader'
import ProjectForm from '@/components/admin/ProjectForm'
import ImageManager from '@/components/admin/ImageManager'
import { getProjectById } from '@/services/projects'

interface PageProps {
  params: Promise<{ id: string }>
}

export const revalidate = 0

const EditProjectPage = async ({ params }: PageProps) => {
  const { id } = await params
  const project = await getProjectById(id)

  if (!project) notFound()

  return (
    <>
      <AdminHeader
        title="Proje Duzenle"
        subtitle={project.title}
        backHref="/admin"
      />

      <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <ImageManager project={project} />
        <ProjectForm mode="edit" project={project} />
      </div>
    </>
  )
}

export default EditProjectPage

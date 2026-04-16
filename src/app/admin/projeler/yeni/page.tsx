import AdminHeader from '@/components/admin/AdminHeader'
import ProjectForm from '@/components/admin/ProjectForm'

const NewProjectPage = () => {
  return (
    <>
      <AdminHeader title="Yeni Proje" subtitle="Temel bilgileri girin" backHref="/admin" />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <ProjectForm mode="create" />
      </div>
    </>
  )
}

export default NewProjectPage

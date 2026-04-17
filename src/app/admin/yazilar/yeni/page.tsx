import AdminHeader from '@/components/admin/AdminHeader'
import BlogForm from '@/components/admin/BlogForm'

const NewBlogPostPage = () => {
  return (
    <>
      <AdminHeader title="Yeni Yazi" subtitle="Blog yazisi olusturun" backHref="/admin/yazilar" />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <BlogForm mode="create" />
      </div>
    </>
  )
}

export default NewBlogPostPage

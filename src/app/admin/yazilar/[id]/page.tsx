import { notFound } from 'next/navigation'
import AdminHeader from '@/components/admin/AdminHeader'
import BlogForm from '@/components/admin/BlogForm'
import { getBlogPostById } from '@/services/blog'

interface PageProps {
  params: Promise<{ id: string }>
}

export const revalidate = 0

const EditBlogPostPage = async ({ params }: PageProps) => {
  const { id } = await params
  const post = await getBlogPostById(id)

  if (!post) notFound()

  return (
    <>
      <AdminHeader
        title="Yazi Duzenle"
        subtitle={post.title}
        backHref="/admin/yazilar"
      />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <BlogForm mode="edit" post={post} />
      </div>
    </>
  )
}

export default EditBlogPostPage

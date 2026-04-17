import BlogCard from '@/components/shared/BlogCard'
import type { BlogPost } from '@/types/blog'

interface BlogListProps {
  posts: BlogPost[]
}

const BlogList = ({ posts }: BlogListProps) => {
  if (posts.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg font-semibold text-foreground">
          Henuz blog yazisi bulunmuyor
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Yakinda yeni icerikler eklenecek.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  )
}

export default BlogList

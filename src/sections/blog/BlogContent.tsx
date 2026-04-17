import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Tag, ArrowLeft } from 'lucide-react'
import Container from '@/components/layout/Container'
import type { BlogPost } from '@/types/blog'

interface BlogContentProps {
  post: BlogPost
}

const BlogContent = ({ post }: BlogContentProps) => {
  return (
    <article>
      {/* Hero image */}
      {post.featuredImage && (
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-secondary">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A09]/40 to-transparent" />
        </div>
      )}

      <Container>
        <div className="mx-auto max-w-3xl py-12 md:py-16">
          {/* Back link */}
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Blog&apos;a Don
          </Link>

          {/* Meta */}
          <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {post.publishedAt && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-4 text-gold-500" />
                {new Date(post.publishedAt).toLocaleDateString('tr-TR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>

          {/* Separator */}
          <div className="my-8 h-px bg-border" />

          {/* Content */}
          <div className="prose prose-lg prose-stone max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
            {post.content.split('\n').map((paragraph, i) => {
              const trimmed = paragraph.trim()
              if (!trimmed) return null

              // Simple markdown heading support
              if (trimmed.startsWith('### ')) {
                return <h3 key={i}>{trimmed.slice(4)}</h3>
              }
              if (trimmed.startsWith('## ')) {
                return <h2 key={i}>{trimmed.slice(3)}</h2>
              }
              if (trimmed.startsWith('# ')) {
                return <h1 key={i}>{trimmed.slice(2)}</h1>
              }
              if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                return (
                  <ul key={i}>
                    <li>{trimmed.slice(2)}</li>
                  </ul>
                )
              }

              return <p key={i}>{trimmed}</p>
            })}
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-12 border-t border-border pt-8">
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="size-4 text-muted-foreground" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </article>
  )
}

export default BlogContent

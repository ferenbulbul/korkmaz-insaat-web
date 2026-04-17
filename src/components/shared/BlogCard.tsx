import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Tag, ImageOff } from 'lucide-react'
import type { BlogPost } from '@/types/blog'

interface BlogCardProps {
  post: BlogPost
}

const BlogCard = ({ post }: BlogCardProps) => {
  const { slug, title, excerpt, featuredImage, publishedAt, tags } = post

  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="relative">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-secondary">
          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.05]"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-muted-foreground">
              <ImageOff className="size-10 opacity-40" />
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A09]/60 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />
        </div>

        {/* Content */}
        <div className="pt-5">
          {/* Date & tags */}
          <div className="flex items-center gap-3 text-[11px] font-medium text-muted-foreground">
            {publishedAt && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-3 text-gold-400" />
                {new Date(publishedAt).toLocaleDateString('tr-TR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            )}
            {tags.length > 0 && (
              <span className="inline-flex items-center gap-1">
                <Tag className="size-3 text-gold-400" />
                {tags.slice(0, 2).join(', ')}
              </span>
            )}
          </div>

          {/* Separator */}
          <div className="relative mt-3 h-px bg-border/60">
            <span className="absolute left-0 top-0 h-full w-12 bg-gold-500 transition-all duration-500 ease-out group-hover:w-full" />
          </div>

          {/* Title */}
          <h3 className="mt-4 font-display text-lg font-medium leading-tight tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent md:text-xl">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {excerpt}
          </p>

          {/* Read more */}
          <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Devamını Oku
            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </span>
        </div>
      </article>
    </Link>
  )
}

export default BlogCard

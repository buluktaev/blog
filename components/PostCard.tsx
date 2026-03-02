import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'

export function PostCard({ post }: { post: PostMeta }) {
  const date = new Date(post.pubDatetime).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-lg border border-[var(--border)] p-5 transition-all hover:border-[var(--accent)] hover:shadow-sm"
    >
      <h2 className="mb-1 text-base font-medium text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
        {post.title}
      </h2>
      <p className="mb-3 text-sm text-[var(--text-muted)] line-clamp-2">
        {post.description}
      </p>
      <div className="flex items-center gap-3">
        <span className="text-xs text-[var(--text-muted)]">{date}</span>
        {post.tags.slice(0, 2).map(tag => (
          <span
            key={tag}
            className="rounded-full bg-[var(--code-bg)] px-2 py-0.5 text-xs text-[var(--text-muted)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  )
}

import { getAllPosts } from '@/lib/posts'
import { PostCard } from '@/components/PostCard'

export default function Home() {
  const posts = getAllPosts()

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      {/* Hero */}
      <section className="mb-16">
        <h1 className="mb-3 text-3xl font-semibold tracking-tight text-[var(--text)]">
          Bulat
        </h1>
        <p className="text-lg text-[var(--text-muted)]">
          Писать о дизайне и AI-инструментах.
        </p>
      </section>

      {/* Post list */}
      <section>
        <h2 className="mb-6 text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">
          Записи
        </h2>
        <div className="flex flex-col gap-3">
          {posts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </main>
  )
}

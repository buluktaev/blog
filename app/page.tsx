import { getAllPosts } from '@/lib/posts'
import { PostCard } from '@/components/PostCard'

export default function Home() {
  const posts = getAllPosts()

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
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

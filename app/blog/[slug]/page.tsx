import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { TableOfContents } from '@/components/TableOfContents'
import { mdxComponents } from '@/components/MDXComponents'
import { AnimatedCard } from '@/components/demos/AnimatedCard'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post || post.draft) notFound()

  const date = new Date(post.pubDatetime).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      {/* Back link */}
      <Link
        href="/"
        className="mb-10 inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
      >
        ← Назад
      </Link>

      <div className="flex gap-16">
        {/* Main content */}
        <article className="min-w-0 flex-1">
          <header className="mb-10">
            <h1 className="mb-3 text-3xl font-semibold leading-tight tracking-tight text-[var(--text)]">
              {post.title}
            </h1>
            <p className="text-sm text-[var(--text-muted)]">{date}</p>
          </header>

          <div className="prose prose-neutral max-w-none dark:prose-invert">
            <MDXRemote
              source={post.content}
              components={{ ...mdxComponents, AnimatedCard }}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [
                      rehypePrettyCode,
                      {
                        theme: { dark: 'github-dark', light: 'github-light' },
                        keepBackground: false,
                      },
                    ],
                  ],
                },
              }}
            />
          </div>
        </article>

        {/* Sidebar */}
        <aside className="hidden w-52 shrink-0 lg:block">
          <div className="sticky top-24">
            <TableOfContents content={post.content} />
          </div>
        </aside>
      </div>
    </div>
  )
}

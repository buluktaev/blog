import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')

export type PostMeta = {
  slug: string
  title: string
  description: string
  pubDatetime: string
  author: string
  tags: string[]
  featured: boolean
  draft: boolean
}

export type Post = PostMeta & {
  content: string
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'))

  return files
    .map(filename => {
      const slug = filename.replace('.mdx', '')
      const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), 'utf-8')
      const { data } = matter(raw)

      return {
        slug: data.slug ?? slug,
        title: data.title ?? '',
        description: data.description ?? '',
        pubDatetime: data.pubDatetime ?? '',
        author: data.author ?? '',
        tags: data.tags ?? [],
        featured: data.featured ?? false,
        draft: data.draft ?? false,
      } as PostMeta
    })
    .filter(post => !post.draft)
    .sort((a, b) => new Date(b.pubDatetime).getTime() - new Date(a.pubDatetime).getTime())
}

export function getPostBySlug(slug: string): Post | null {
  const filepath = path.join(CONTENT_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filepath)) return null

  const raw = fs.readFileSync(filepath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug: data.slug ?? slug,
    title: data.title ?? '',
    description: data.description ?? '',
    pubDatetime: data.pubDatetime ?? '',
    author: data.author ?? '',
    tags: data.tags ?? [],
    featured: data.featured ?? false,
    draft: data.draft ?? false,
    content,
  }
}

# Next.js Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace Astro Paper with a custom Next.js 15 blog featuring MDX content, dark/light theme, sidebar TOC, and interactive Framer Motion demo components.

**Architecture:** Next.js 15 App Router + `next-mdx-remote` for MDX parsing + Tailwind CSS v4 for styling + `next-themes` for theming. All Astro files deleted, Next.js scaffolded in-place in the same `buluktaev/blog` repo, same Vercel deployment.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, next-mdx-remote, gray-matter, next-themes, Framer Motion, rehype-pretty-code, geist (fonts), next-sitemap

---

## Task 1: Clean up Astro files and scaffold Next.js

**Files:**
- Delete: `src/`, `astro.config.mjs`, `public/` (contents), `.astro/`, `tsconfig.json`
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `.gitignore` (update)

**Step 1: Save the one real blog post**

```bash
cp src/data/blog/kak-ya-vmeste-s-claude-code-zapustil-svoy-blog.md /tmp/post-backup.md
```

**Step 2: Delete all Astro files**

```bash
cd ~/Documents/GitHub/blog
rm -rf src/ astro.config.mjs .astro/ public/
rm -f tsconfig.json prettier.config.cjs .prettierrc* eslint.config.* postcss.config.*
```

**Step 3: Create `package.json`**

```json
{
  "name": "blog",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.3.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next-mdx-remote": "^5.0.0",
    "gray-matter": "^4.0.3",
    "next-themes": "^0.4.4",
    "framer-motion": "^12.0.0",
    "rehype-pretty-code": "^0.14.0",
    "shiki": "^3.0.0",
    "geist": "^1.3.0",
    "next-sitemap": "^4.2.3",
    "reading-time": "^1.5.0",
    "rehype-slug": "^6.0.0",
    "remark-gfm": "^4.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@types/gray-matter": "^4.0.0",
    "typescript": "^5.8.0",
    "@tailwindcss/typography": "^0.5.15",
    "tailwindcss": "^4.1.0",
    "@tailwindcss/postcss": "^4.1.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.5.0"
  }
}
```

**Step 4: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**Step 5: Create `next.config.ts`**

```ts
import type { NextConfig } from 'next'

const config: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
}

export default config
```

**Step 6: Create `postcss.config.mjs`**

```js
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
export default config
```

**Step 7: Install dependencies**

```bash
npm install
```

Expected: `node_modules/` created, no errors.

**Step 8: Commit**

```bash
git add -A
git commit -m "chore: replace Astro with Next.js 15 scaffold"
```

---

## Task 2: Create content directory with migrated post

**Files:**
- Create: `content/blog/kak-ya-vmeste-s-claude-code-zapustil-svoy-blog.mdx`

**Step 1: Create content directory**

```bash
mkdir -p content/blog
```

**Step 2: Copy the saved post and rename to .mdx**

```bash
cp /tmp/post-backup.md content/blog/kak-ya-vmeste-s-claude-code-zapustil-svoy-blog.mdx
```

**Step 3: Verify frontmatter is intact**

```bash
head -20 content/blog/kak-ya-vmeste-s-claude-code-zapustil-svoy-blog.mdx
```

Expected output:
```
---
author: Bulat
pubDatetime: 2026-03-02T12:00:00Z
title: Как я вместе с Claude Code запустил свой блог
slug: kak-ya-vmeste-s-claude-code-zapustil-svoy-blog
...
```

**Step 4: Commit**

```bash
git add content/
git commit -m "feat(content): migrate existing post to MDX"
```

---

## Task 3: Global CSS with theme variables and Tailwind

**Files:**
- Create: `app/globals.css`

**Step 1: Create `app/globals.css`**

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@layer base {
  :root {
    --bg: #fafafa;
    --text: #111113;
    --text-muted: #6b7280;
    --accent: #4f46e5;
    --border: #e5e7eb;
    --code-bg: #f4f4f5;
  }

  .dark {
    --bg: #111113;
    --text: #ededed;
    --text-muted: #6b7280;
    --accent: #818cf8;
    --border: #27272a;
    --code-bg: #18181b;
  }

  * {
    box-sizing: border-box;
  }

  body {
    background-color: var(--bg);
    color: var(--text);
    font-family: var(--font-google-sans), system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  code,
  pre {
    font-family: var(--font-geist-mono), monospace;
  }

  /* rehype-pretty-code overrides */
  pre {
    background-color: var(--code-bg) !important;
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    padding: 1rem;
    overflow-x: auto;
  }

  [data-highlighted-line] {
    background-color: rgba(79, 70, 229, 0.1);
  }
}
```

**Step 2: Commit**

```bash
git add app/globals.css
git commit -m "feat(styles): add global CSS with light/dark theme variables"
```

---

## Task 4: Root layout with fonts and ThemeProvider

**Files:**
- Create: `app/layout.tsx`
- Create: `components/Providers.tsx`

**Step 1: Create `components/Providers.tsx`**

This must be a Client Component because `next-themes` uses React context.

```tsx
'use client'

import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}
```

**Step 2: Create `app/layout.tsx`**

Google Sans is loaded via Google Fonts CSS. Geist Mono via the `geist` npm package.

```tsx
import type { Metadata } from 'next'
import { GeistMono } from 'geist/font/mono'
import { Providers } from '@/components/Providers'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Bulat', template: '%s | Bulat' },
  description: 'Писать о дизайне и AI-инструментах',
  metadataBase: new URL('https://blog-buluktaev.vercel.app'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={GeistMono.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

**Step 3: Add CSS variable for Google Sans in `app/globals.css`**

Add inside `:root` block (already created in Task 3):
```css
--font-google-sans: 'Google Sans', system-ui, sans-serif;
```

Add for geist mono, update body font-family reference to use CSS var, and add at top of file:
```css
body {
  font-family: 'Google Sans', system-ui, sans-serif;
}
```

**Step 4: Verify Next.js starts**

```bash
npm run dev
```

Expected: server starts at http://localhost:3000 (404 page is fine, no crash).

**Step 5: Commit**

```bash
git add app/layout.tsx components/Providers.tsx app/globals.css
git commit -m "feat(layout): root layout with Google Sans, Geist Mono, ThemeProvider"
```

---

## Task 5: ThemeToggle and Header components

**Files:**
- Create: `components/ThemeToggle.tsx`
- Create: `components/Header.tsx`

**Step 1: Create `components/ThemeToggle.tsx`**

```tsx
'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="h-8 w-8" />
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label="Переключить тему"
      className="flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors hover:bg-[var(--border)] focus:outline-none"
    >
      {resolvedTheme === 'dark' ? '☀' : '🌙'}
    </button>
  )
}
```

**Step 2: Create `components/Header.tsx`**

```tsx
import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--bg)]">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-sm font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors"
        >
          Bulat
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}
```

**Step 3: Add Header to `app/layout.tsx`**

Import and render above `{children}`:

```tsx
import { Header } from '@/components/Header'

// inside <body>:
<Providers>
  <Header />
  {children}
</Providers>
```

**Step 4: Check in browser**

Visit http://localhost:3000 — header should appear with name "Bulat" and theme toggle button.

**Step 5: Commit**

```bash
git add components/ThemeToggle.tsx components/Header.tsx app/layout.tsx
git commit -m "feat(components): Header with ThemeToggle"
```

---

## Task 6: Posts library — read MDX files from content/

**Files:**
- Create: `lib/posts.ts`

**Step 1: Create `lib/posts.ts`**

```ts
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
```

**Step 2: Commit**

```bash
git add lib/posts.ts
git commit -m "feat(lib): posts library with getAllPosts and getPostBySlug"
```

---

## Task 7: Home page — hero and post list

**Files:**
- Create: `app/page.tsx`
- Create: `components/PostCard.tsx`

**Step 1: Create `components/PostCard.tsx`**

```tsx
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
```

**Step 2: Create `app/page.tsx`**

```tsx
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
```

**Step 3: Check in browser**

Visit http://localhost:3000 — should see hero section and post card for "Как я вместе с Claude Code запустил свой блог".

**Step 4: Commit**

```bash
git add app/page.tsx components/PostCard.tsx
git commit -m "feat(pages): home page with hero and post list"
```

---

## Task 8: MDX custom components

**Files:**
- Create: `components/MDXComponents.tsx`
- Create: `mdx-components.tsx` (Next.js root-level)

**Step 1: Create `components/MDXComponents.tsx`**

```tsx
import type { ComponentPropsWithoutRef } from 'react'

type HeadingProps = ComponentPropsWithoutRef<'h2'>
type ParagraphProps = ComponentPropsWithoutRef<'p'>
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>
type PreProps = ComponentPropsWithoutRef<'pre'>
type CodeProps = ComponentPropsWithoutRef<'code'>
type AnchorProps = ComponentPropsWithoutRef<'a'>

export const mdxComponents = {
  h1: (props: HeadingProps) => (
    <h1 className="mb-4 mt-10 text-2xl font-semibold tracking-tight text-[var(--text)]" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2 className="mb-3 mt-8 text-xl font-semibold tracking-tight text-[var(--text)]" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <h3 className="mb-2 mt-6 text-base font-semibold text-[var(--text)]" {...props} />
  ),
  p: (props: ParagraphProps) => (
    <p className="mb-4 leading-7 text-[var(--text)]" {...props} />
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="my-6 rounded-r-lg border-l-4 border-[var(--accent)] bg-[var(--code-bg)] py-3 pl-5 pr-4 text-sm italic text-[var(--text-muted)]"
      {...props}
    />
  ),
  pre: (props: PreProps) => (
    <pre className="my-6 overflow-x-auto rounded-lg bg-[var(--code-bg)] p-4 text-sm" {...props} />
  ),
  code: (props: CodeProps) => {
    const isInline = !props.className
    if (isInline) {
      return (
        <code
          className="rounded bg-[var(--code-bg)] px-1.5 py-0.5 text-sm font-mono text-[var(--accent)]"
          {...props}
        />
      )
    }
    return <code {...props} />
  },
  a: (props: AnchorProps) => (
    <a
      className="text-[var(--accent)] underline underline-offset-2 hover:opacity-80 transition-opacity"
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul className="mb-4 ml-4 list-disc space-y-1 text-[var(--text)]" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol className="mb-4 ml-4 list-decimal space-y-1 text-[var(--text)]" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<'li'>) => (
    <li className="leading-7" {...props} />
  ),
  hr: () => <hr className="my-8 border-[var(--border)]" />,
}
```

**Step 2: Create root-level `mdx-components.tsx`**

Required by Next.js MDX infrastructure:

```tsx
import type { MDXComponents } from 'mdx/types'
import { mdxComponents } from '@/components/MDXComponents'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...mdxComponents, ...components }
}
```

**Step 3: Commit**

```bash
git add components/MDXComponents.tsx mdx-components.tsx
git commit -m "feat(components): MDX custom components"
```

---

## Task 9: TableOfContents sidebar component

**Files:**
- Create: `components/TableOfContents.tsx`

**Step 1: Create `components/TableOfContents.tsx`**

This parses headings from MDX content string (no DOM access needed — runs on server).

```tsx
type Heading = {
  id: string
  text: string
  level: number
}

function extractHeadings(content: string): Heading[] {
  const lines = content.split('\n')
  const headings: Heading[] = []

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)/)
    if (match) {
      const level = match[1].length
      const text = match[2].trim()
      const id = text
        .toLowerCase()
        .replace(/[^a-zа-яё0-9\s-]/gi, '')
        .trim()
        .replace(/\s+/g, '-')
      headings.push({ id, text, level })
    }
  }

  return headings
}

export function TableOfContents({ content }: { content: string }) {
  const headings = extractHeadings(content)

  if (headings.length === 0) return null

  return (
    <nav aria-label="Содержание">
      <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">
        Содержание
      </p>
      <ul className="space-y-1.5">
        {headings.map(h => (
          <li
            key={h.id}
            style={{ paddingLeft: h.level === 3 ? '0.75rem' : '0' }}
          >
            <a
              href={`#${h.id}`}
              className="block text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--accent)] leading-snug"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
```

**Step 2: Commit**

```bash
git add components/TableOfContents.tsx
git commit -m "feat(components): TableOfContents sidebar"
```

---

## Task 10: Individual post page with MDX rendering and sidebar

**Files:**
- Create: `app/blog/[slug]/page.tsx`

**Step 1: Create `app/blog/[slug]/page.tsx`**

```tsx
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
              components={mdxComponents}
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
```

**Step 2: Check in browser**

Visit http://localhost:3000/blog/kak-ya-vmeste-s-claude-code-zapustil-svoy-blog

Expected:
- Post title renders as `<h1>`
- Body text appears in correct font
- Code blocks are syntax-highlighted
- Sidebar TOC shows headings
- "← Назад" link works

**Step 3: Commit**

```bash
git add app/blog/
git commit -m "feat(pages): blog post page with MDX, sidebar TOC"
```

---

## Task 11: AnimatedCard demo component

**Files:**
- Create: `components/demos/AnimatedCard.tsx`

**Step 1: Create `components/demos/AnimatedCard.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'

type CardVariant = 'spring' | 'ease' | 'bounce'

const variants: Record<CardVariant, object> = {
  spring: { type: 'spring', stiffness: 400, damping: 17 },
  ease: { type: 'tween', ease: 'easeOut', duration: 0.2 },
  bounce: { type: 'spring', stiffness: 600, damping: 10 },
}

export function AnimatedCard({ variant = 'spring' }: { variant?: CardVariant }) {
  return (
    <div className="my-8 rounded-xl border border-[var(--border)] bg-[var(--code-bg)] p-6">
      <p className="mb-4 text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">
        Демо · {variant}
      </p>
      <div className="flex flex-wrap gap-4">
        {(['spring', 'ease', 'bounce'] as CardVariant[]).map(v => (
          <motion.div
            key={v}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={variants[v]}
            className="flex h-20 w-36 cursor-pointer items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg)] text-sm font-medium text-[var(--text)] shadow-sm select-none"
          >
            {v}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add components/demos/
git commit -m "feat(demos): AnimatedCard component with Framer Motion"
```

---

## Task 12: Add demo to existing post

**Files:**
- Modify: `content/blog/kak-ya-vmeste-s-claude-code-zapustil-svoy-blog.mdx`

**Step 1: Add demo import and usage to the post**

Open the post file. After the section `## Как это выглядит на практике` (after the blockquote prompt), add:

```mdx
import { AnimatedCard } from '@/components/demos/AnimatedCard'

<AnimatedCard variant="spring" />
```

The import should be placed at the top of the MDX file content (after the closing `---` of frontmatter), not inline. In `next-mdx-remote/rsc`, imports inside MDX are not supported — instead, components are passed via the `components` prop.

**Correct approach — pass AnimatedCard through components prop:**

In `app/blog/[slug]/page.tsx`, import AnimatedCard and add to components:

```tsx
import { AnimatedCard } from '@/components/demos/AnimatedCard'

// in the MDXRemote call:
components={{ ...mdxComponents, AnimatedCard }}
```

Then in the MDX file, just use the tag directly (no import needed):

```mdx
<AnimatedCard variant="spring" />
```

Add `<AnimatedCard variant="spring" />` after the blockquote in the post.

**Step 2: Verify in browser**

Visit the post page — animated card should appear with three hoverable cards.

**Step 3: Commit**

```bash
git add content/blog/kak-ya-vmeste-s-claude-code-zapustil-svoy-blog.mdx app/blog/
git commit -m "feat(content): add AnimatedCard demo to first post"
```

---

## Task 13: Sitemap and RSS

**Files:**
- Create: `next-sitemap.config.js`
- Create: `app/rss.xml/route.ts`

**Step 1: Create `next-sitemap.config.js`**

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://blog-buluktaev.vercel.app',
  generateRobotsTxt: true,
  outDir: './public',
}
```

**Step 2: Add postbuild script to `package.json`**

```json
"scripts": {
  "postbuild": "next-sitemap"
}
```

**Step 3: Create `app/rss.xml/route.ts`**

```ts
import { getAllPosts } from '@/lib/posts'

export async function GET() {
  const posts = getAllPosts()
  const baseUrl = 'https://blog-buluktaev.vercel.app'

  const items = posts
    .map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.pubDatetime).toUTCString()}</pubDate>
      <guid>${baseUrl}/blog/${post.slug}</guid>
    </item>`)
    .join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Bulat</title>
    <link>${baseUrl}</link>
    <description>Писать о дизайне и AI-инструментах</description>
    ${items}
  </channel>
</rss>`

  return new Response(rss, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
```

**Step 4: Commit**

```bash
git add next-sitemap.config.js app/rss.xml/ package.json
git commit -m "feat(seo): sitemap, robots.txt, RSS feed"
```

---

## Task 14: Build check and Vercel deploy

**Step 1: Run production build**

```bash
npm run build
```

Expected: build succeeds, no TypeScript errors, no "missing module" errors.

If build fails with TypeScript errors — fix them before proceeding.

**Step 2: Check built output**

```bash
ls .next/
```

Expected: `server/`, `static/`, `BUILD_ID` present.

**Step 3: Create `public/` directory (required by next-sitemap)**

```bash
mkdir -p public
```

**Step 4: Push to trigger Vercel deploy**

```bash
git add -A
git commit -m "chore: production build verified"
git push origin blog/kak-ya-vmeste-s-claude-code-zapustil-svoy-blog
```

**Step 5: Create PR and merge to main**

```bash
gh pr create --title "feat: migrate blog to Next.js 15" \
  --body "Replaces Astro Paper with custom Next.js 15 blog.

  - App Router + MDX via next-mdx-remote
  - Dark/light theme with next-themes
  - Google Sans + Geist Mono fonts
  - Sidebar TOC on post pages
  - AnimatedCard Framer Motion demo
  - RSS feed + sitemap"
```

Then: `gh pr merge --merge`

**Step 6: Verify Vercel deploy**

```bash
gh api repos/buluktaev/blog/deployments --jq '.[0].environment'
```

Wait ~60 seconds, then open https://blog-buluktaev.vercel.app

Expected: blog loads, post renders, theme toggle works.

---

## Verification Checklist

- [ ] `npm run dev` starts without errors
- [ ] Home page shows hero and post card
- [ ] Theme toggle switches dark/light
- [ ] `/blog/kak-ya-vmeste-s-claude-code-zapustil-svoy-blog` renders correctly
- [ ] Sidebar TOC visible on post page (desktop)
- [ ] AnimatedCard demo is interactive
- [ ] `npm run build` succeeds
- [ ] Vercel deploy live at blog-buluktaev.vercel.app

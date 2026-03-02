# Next.js Migration — Design Document

## Goal

Migrate `buluktaev/blog` from Astro Paper to a custom Next.js blog with MDX support,
interactive demo components, dark/light theme toggle, and sidebar navigation —
inspired by userinterface.wiki and benji.org.

## Approach

Next.js App Router + MDX + Framer Motion + Tailwind CSS, built from scratch (no external blog template).
Same repository (`buluktaev/blog`), same Vercel deployment.

---

## Architecture

```
buluktaev/blog/
├── app/
│   ├── layout.tsx           # Root layout: fonts, ThemeProvider, header
│   ├── page.tsx             # Home: hero + post list
│   ├── blog/
│   │   └── [slug]/
│   │       └── page.tsx     # Individual post page
│   └── globals.css          # CSS variables (light/dark themes)
├── content/
│   └── blog/
│       └── *.mdx            # Posts (migrated from src/data/blog/)
├── components/
│   ├── Header.tsx           # Nav: name + theme toggle
│   ├── PostCard.tsx         # Post preview card
│   ├── TableOfContents.tsx  # Sidebar TOC for articles
│   ├── ThemeToggle.tsx      # Light/dark switch
│   ├── MDXComponents.tsx    # Custom renderers: h1, blockquote, code
│   └── demos/               # Interactive demo components per article
│       ├── AnimatedCard.tsx
│       ├── ColorPicker.tsx
│       └── TypographyScale.tsx
├── lib/
│   └── posts.ts             # Read MDX files, parse frontmatter, sort
├── mdx-components.tsx       # Next.js MDX component map
└── next.config.ts           # MDX config
```

## Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Framework    | Next.js 15 (App Router)             |
| Content      | MDX via `next-mdx-remote`           |
| Frontmatter  | `gray-matter`                       |
| Animations   | Framer Motion                       |
| Styles       | Tailwind CSS v4                     |
| Theme        | `next-themes`                       |
| Fonts        | Google Sans (body/headings) + Geist Mono (code) |
| Syntax highlight | `rehype-pretty-code` + Shiki    |
| Sitemap/RSS  | `next-sitemap`                      |
| Deployment   | Vercel (unchanged)                  |

---

## Design System

### Typography

- **Headings + body:** Google Sans (`https://fonts.google.com/specimen/Google+Sans`)
- **Code blocks:** Geist Mono (via `geist` npm package)

### Colors (CSS variables)

```css
/* Light theme */
--bg: #fafafa;
--text: #111113;
--text-muted: #6b7280;
--accent: #4f46e5;
--border: #e5e7eb;
--code-bg: #f4f4f5;

/* Dark theme */
--bg: #111113;
--text: #ededed;
--text-muted: #6b7280;
--accent: #818cf8;
--border: #27272a;
--code-bg: #18181b;
```

### Layouts

**Home page:**
```
┌─────────────────────────────────┐
│  Bulat              [☀/🌙]      │
├─────────────────────────────────┤
│                                 │
│  Писать о дизайне               │
│  и AI-инструментах              │
│                                 │
├─────────────────────────────────┤
│  ● Post title                   │
│    Description excerpt          │
│    02 Mar 2026                  │
└─────────────────────────────────┘
```

**Post page:**
```
┌─────────────────────────────────┐
│  ← Назад              [☀/🌙]   │
├────────────────┬────────────────┤
│                │  Contents      │
│  # Title       │  · Section 1   │
│                │  · Section 2   │
│  Prose...      │                │
│                │                │
│  <LiveDemo />  │                │
│                │                │
└────────────────┴────────────────┘
```

---

## Content Migration

**Source:** `src/data/blog/*.md` (Astro Paper)
**Target:** `content/blog/*.mdx` (Next.js)

Frontmatter fields stay the same:
```yaml
author: Bulat
pubDatetime: 2026-03-02T12:00:00Z
title: ...
slug: ...
featured: true
draft: false
tags: [...]
description: ...
```

Action: copy `kak-ya-vmeste-s-claude-code-zapustil-svoy-blog.md` → `.mdx`,
delete all Astro Paper sample posts.

---

## Interactive Demos

MDX allows importing React components directly in article files:

```mdx
import { SpringDemo } from '@/components/demos/SpringDemo'

<SpringDemo />
```

**Starter demo components (built during migration):**
1. `AnimatedCard` — card with Framer Motion hover/tap
2. `ColorPicker` — interactive color scheme switcher
3. `TypographyScale` — font size/weight explorer

Each future article adds its own demo component to `components/demos/`.

---

## What's Out of Scope (MVP)

- Search (add when post count > 10)
- Comments
- Newsletter subscription
- Analytics (add later)

---

## Success Criteria

- [ ] Blog runs locally with `npm run dev`
- [ ] Existing post renders correctly at `/blog/kak-ya-vmeste-s-claude-code-zapustil-svoy-blog`
- [ ] Dark/light theme toggle works
- [ ] Sidebar TOC visible on post pages
- [ ] At least one demo component renders in a post
- [ ] Deploys to Vercel without errors
- [ ] Google PageSpeed / Lighthouse ≥ 95

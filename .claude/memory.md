# Blog (buluktaev/blog)

## Status
Active — Next.js 15 блог смёрджен в main, деплоится на Vercel.

## Description
Личный блог Булата (продуктовый дизайнер) о дизайне и AI-инструментах.
Next.js 15 App Router, MDX, Framer Motion демо. Деплой — Vercel (blog-buluktaev.vercel.app).
Контент создаётся через content-factory pipeline (`~/.claude/skills/content-factory/`).

## Content Factory
- Скилл: `~/.claude/skills/content-factory/` (cloned from serejaris/content-factory)
- Config: `config/author-bible.md`, `config/writing-guide.md` — заполнены
- **ВАЖНО:** `config/project.md` устарел — указывает `ssg: astro`, `content_path: src/data/blog/`
  Нужно обновить: `ssg: nextjs`, `content_path: content/blog/`
- Python: 3.9.6, fix applied — `from __future__ import annotations` в find_related_posts.py

## Architecture
- **Framework:** Next.js 15.5 App Router, TypeScript
- **Стилизация:** Tailwind CSS v4 + CSS-переменные (--bg, --text, --accent и др.)
- **Контент:** `content/blog/*.mdx` → `next-mdx-remote/rsc`
- **Темы:** `next-themes` (attribute="class", system default)
- **Шрифты:** Google Sans (via Google Fonts link) + Geist Mono (npm geist)
- **Код:** rehype-pretty-code + shiki, темы github-dark/github-light
- **SEO:** next-sitemap (postbuild), RSS `/rss.xml`, robots.txt
- **Деплой:** Vercel, репо buluktaev/blog, main ветка

## Key Files
- `app/layout.tsx` — корневой layout с Providers + Header
- `app/page.tsx` — главная: hero + список постов
- `app/blog/[slug]/page.tsx` — страница поста + MDX + TOC sidebar
- `lib/posts.ts` — getAllPosts() + getPostBySlug()
- `components/` — Header, ThemeToggle, PostCard, TableOfContents, MDXComponents
- `components/demos/AnimatedCard.tsx` — Framer Motion демо (client component)
- `content/blog/*.mdx` — посты

## Current State
- Last session: 2026-03-02
- Done: Полная миграция Astro Paper → Next.js 15, PR #3 смёрджен в main
- Uncommitted: нет (чисто)

## Unresolved Problems
- `~/.claude/skills/content-factory/config/project.md` устарел: `ssg: astro`, `content_path: src/data/blog/` → нужно обновить на `ssg: nextjs`, `content_path: content/blog/`
- Google Fonts (`Google+Sans`) — проверить правильное имя семейства в URL
- Vercel деплой после миграции — проверить вручную на blog-buluktaev.vercel.app

## Decisions Made
- [2026-03-02] Выбран next-mdx-remote/rsc вместо @next/mdx — поддержка сторонних MDX файлов без перекомпиляции
- [2026-03-02] AnimatedCard передаётся через components prop MDXRemote (не через import в MDX) — next-mdx-remote/rsc не поддерживает imports внутри MDX
- [2026-03-02] Убран @types/gray-matter из devDependencies — пакет не существует на npm, gray-matter поставляет собственные типы
- [2026-03-02] npm вместо pnpm — план миграции требовал npm, pnpm-lock.yaml оставлен как артефакт

## Next Steps
1. Обновить `~/.claude/skills/content-factory/config/project.md` — `ssg: nextjs`, `content_path: content/blog/`
2. Проверить деплой на blog-buluktaev.vercel.app (тема, TOC, AnimatedCard)
3. Написать второй пост через `/content-factory` (тема: как устроен скилл изнутри)
4. Проверить Google Fonts URL (`Google+Sans`)
5. Добавить OG-изображения для постов

## Session History
- [2026-03-02] Полная миграция Astro Paper → Next.js 15: 14 задач, 15 коммитов, PR #3 смёрджен
- [2026-03-02] Старт: установка content-factory, создание блога Astro Paper+Vercel, первый пост через 7-фазный пайплайн (PR #2 merged), обновление writing-guide.md, дизайн и план миграции

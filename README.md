# Sanan's Blog

Personal blog about design and AI tools. Built with Next.js 15, MDX, and deployed on Vercel.

**Live:** [blog-buluktaev.vercel.app](https://blog-buluktaev.vercel.app)

[Русская версия ниже](#русская-версия)

## Features

- MDX blog posts with syntax highlighting (Shiki)
- Light/dark theme with system preference detection
- Table of contents sidebar for long posts
- SEO: sitemap, robots.txt, RSS feed
- Reading time estimation
- Framer Motion interactive demos inside posts

## Quick Start

```bash
git clone https://github.com/buluktaev/blog.git
cd blog
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Adding a Post

Create a `.mdx` file in `content/blog/`:

```markdown
---
title: "Post title"
description: "Short description"
date: "2026-03-17"
tags: ["tag1", "tag2"]
---

Your content here.
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Content | MDX via next-mdx-remote/rsc |
| Styling | Tailwind CSS v4 + CSS variables |
| Fonts | Google Sans + Geist Mono |
| Code highlighting | rehype-pretty-code + Shiki |
| Theme | next-themes (class strategy) |
| Animations | Framer Motion |
| SEO | next-sitemap (postbuild) |
| Deploy | Vercel |

## Project Structure

```
blog/
├── app/
│   ├── layout.tsx          # Root layout, fonts, providers
│   ├── page.tsx            # Home: post list
│   └── blog/[slug]/
│       └── page.tsx        # Post page with MDX + TOC
├── components/
│   ├── Header.tsx
│   ├── PostCard.tsx
│   ├── TableOfContents.tsx
│   ├── ThemeToggle.tsx
│   ├── MDXComponents.tsx
│   └── demos/              # Interactive components for posts
├── content/blog/           # MDX posts
├── lib/posts.ts            # getAllPosts(), getPostBySlug()
└── public/
```

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build + sitemap generation |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

## License

MIT

---

# Русская версия

Личный блог о дизайне и AI-инструментах. Собран на Next.js 15, MDX, задеплоен на Vercel.

**Сайт:** [blog-buluktaev.vercel.app](https://blog-buluktaev.vercel.app)

## Возможности

- MDX-посты с подсветкой синтаксиса (Shiki)
- Светлая/тёмная тема с определением системных настроек
- Оглавление в сайдбаре для длинных постов
- SEO: sitemap, robots.txt, RSS-лента
- Оценка времени чтения
- Интерактивные Framer Motion демо внутри постов

## Быстрый старт

```bash
git clone https://github.com/buluktaev/blog.git
cd blog
npm install
npm run dev
```

Открыть [localhost:3000](http://localhost:3000).

## Добавление поста

Создать `.mdx` файл в `content/blog/`:

```markdown
---
title: "Заголовок поста"
description: "Краткое описание"
date: "2026-03-17"
tags: ["тег1", "тег2"]
---

Текст поста.
```

## Стек

| Слой | Технология |
|------|-----------|
| Фреймворк | Next.js 15 (App Router) |
| Язык | TypeScript |
| Контент | MDX через next-mdx-remote/rsc |
| Стилизация | Tailwind CSS v4 + CSS-переменные |
| Шрифты | Google Sans + Geist Mono |
| Подсветка кода | rehype-pretty-code + Shiki |
| Тема | next-themes (class strategy) |
| Анимации | Framer Motion |
| SEO | next-sitemap (postbuild) |
| Деплой | Vercel |

## Структура проекта

```
blog/
├── app/
│   ├── layout.tsx          # Корневой layout, шрифты, провайдеры
│   ├── page.tsx            # Главная: список постов
│   └── blog/[slug]/
│       └── page.tsx        # Страница поста с MDX + TOC
├── components/
│   ├── Header.tsx
│   ├── PostCard.tsx
│   ├── TableOfContents.tsx
│   ├── ThemeToggle.tsx
│   ├── MDXComponents.tsx
│   └── demos/              # Интерактивные компоненты для постов
├── content/blog/           # MDX-посты
├── lib/posts.ts            # getAllPosts(), getPostBySlug()
└── public/
```

## Команды

| Команда | Действие |
|---------|----------|
| `npm run dev` | Запуск dev-сервера на порту 3000 |
| `npm run build` | Продакшн-сборка + генерация sitemap |
| `npm run start` | Запуск продакшн-сборки |
| `npm run lint` | Запуск ESLint |

## Лицензия

MIT

# Observations - blog

## Index
| # | Date | Type | Summary | Files |
|---|------|------|---------|-------|
| 1 | 2026-03-02 | decision | next-mdx-remote/rsc вместо @next/mdx | app/blog/[slug]/page.tsx |
| 2 | 2026-03-02 | decision | AnimatedCard через components prop, не import в MDX | app/blog/[slug]/page.tsx |
| 3 | 2026-03-02 | discovery | @types/gray-matter не существует на npm | package.json |
| 4 | 2026-03-02 | feature | Миграция Astro Paper → Next.js 15 завершена | все файлы |
| 5 | 2026-03-02 | feature | Первый пост через content-factory (7 фаз) | content/blog/ |
| 6 | 2026-03-02 | bugfix | Python 3.9 несовместим с str|None в find_related_posts.py | scripts/ |
| 7 | 2026-03-02 | problem | content-factory project.md устарел после миграции | config/project.md |

## Details

### [1] 2026-03-02 | decision | next-mdx-remote/rsc вместо @next/mdx
**Before:** Astro с нативным MDX
**After:** next-mdx-remote/rsc для парсинга MDX на сервере
**Files:** app/blog/[slug]/page.tsx
**Why:** @next/mdx требует MDX файлы в app/ директории и перекомпиляцию; next-mdx-remote читает .mdx из content/ и парсит на лету, что лучше для контент-сайтов

### [2] 2026-03-02 | decision | AnimatedCard через components prop
**Before:** Попытка использовать import внутри MDX файла
**After:** AnimatedCard передаётся в `components={{ ...mdxComponents, AnimatedCard }}` в page.tsx
**Files:** app/blog/[slug]/page.tsx, content/blog/*.mdx
**Why:** next-mdx-remote/rsc не поддерживает ES-imports внутри MDX файлов — компоненты должны передаваться через prop

### [3] 2026-03-02 | discovery | @types/gray-matter не существует на npm
**Symptoms:** План включал @types/gray-matter в devDependencies
**Impact:** npm install упал бы с ошибкой 404
**Files:** package.json
**Why:** gray-matter v4 поставляет собственные TypeScript типы, отдельный @types пакет не нужен и не публиковался

### [4] 2026-03-02 | feature | Полная миграция Astro → Next.js 15
**Before:** Astro Paper 5.5.1 с src/, astro.config.ts
**After:** Next.js 15.5 App Router, Tailwind v4, next-mdx-remote, dark/light themes, Framer Motion demo
**Files:** весь репозиторий (128 изменённых файлов)
**Why:** Нужна была большая гибкость и возможность добавлять интерактивные React-компоненты в посты

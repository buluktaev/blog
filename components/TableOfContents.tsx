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

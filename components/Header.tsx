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
          Sanan
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}

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

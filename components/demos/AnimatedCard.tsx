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

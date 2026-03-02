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

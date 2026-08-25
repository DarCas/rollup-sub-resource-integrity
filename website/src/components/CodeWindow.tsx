import type { ReactNode } from 'react'
import { useCopy } from '../hooks/useCopy'
import { CheckIcon, CopyIcon } from './icons'

interface CodeWindowProps {
  title: string
  children: ReactNode
  copyText?: string
  ariaLabel?: string
}

export function CodeWindow({ title, children, copyText, ariaLabel }: CodeWindowProps) {
  const [copied, copy] = useCopy()
  const plain = copyText ?? extractText(children)

  return (
    <div className="code-window">
      <div className="code-window__bar">
        <span className="code-window__title" aria-hidden>
          <span className="code-window__title-dots">
            <span />
            <span />
            <span />
          </span>
          {title}
        </span>
        <button
          type="button"
          className={`copy-btn${copied ? ' is-copied' : ''}`}
          onClick={() => copy(plain)}
          aria-label={copied ? 'Copied to clipboard' : `Copy ${title} code`}
        >
          {copied ? <CheckIcon size={12} /> : <CopyIcon />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="code-window__pre">
        <pre>
          <code aria-label={ariaLabel}>{children}</code>
        </pre>
      </div>
    </div>
  )
}

function extractText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (node && typeof node === 'object' && 'props' in node) {
    return extractText((node as { props: { children?: ReactNode } }).props.children)
  }
  return ''
}

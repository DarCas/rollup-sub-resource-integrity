import type { ReactNode } from 'react'

function base(props: { size?: number; children: ReactNode; className?: string }) {
  return {
    width: props.size ?? 24,
    height: props.size ?? 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
    className: props.className,
  }
}

type IconProps = { size?: number; className?: string }

export function GitHubIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

export function HashIcon({ size, className }: IconProps) {
  return (
    <svg {...base({ size, children: null, className })}>
      <path d="M9 4 7 20M17 4l-2 16M4.5 9h16M3.5 15h16" />
    </svg>
  )
}

export function PluginIcon({ size, className }: IconProps) {
  return (
    <svg {...base({ size, children: null, className })}>
      <path d="M12 3v4m0 10v4M3 12h4m10 0h4" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  )
}

export function RefreshIcon({ size, className }: IconProps) {
  return (
    <svg {...base({ size, children: null, className })}>
      <path d="M20 11a8 8 0 0 0-14.9-3M4 13a8 8 0 0 0 14.9 3" />
      <path d="M4 4v4h4M20 20v-4h-4" />
    </svg>
  )
}

export function ShieldIcon({ size, className }: IconProps) {
  return (
    <svg {...base({ size, children: null, className })}>
      <path d="M12 3 4.5 6v5c0 4.6 3.2 8.2 7.5 10 4.3-1.8 7.5-5.4 7.5-10V6L12 3Z" />
      <path d="m9 11.5 2.2 2.2L15.5 9.5" />
    </svg>
  )
}

export function LockIcon({ size, className }: IconProps) {
  return (
    <svg {...base({ size, children: null, className })}>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  )
}

export function SlidersIcon({ size, className }: IconProps) {
  return (
    <svg {...base({ size, children: null, className })}>
      <path d="M4 8h10M18 8h2M4 16h4M12 16h8" />
      <circle cx="16" cy="8" r="2" />
      <circle cx="10" cy="16" r="2" />
    </svg>
  )
}

export function CheckIcon({ size = 16 }: IconProps) {
  return (
    <svg {...base({ size, children: null })}>
      <path
        d="m5 12.5 4.5 4.5L19 7"
        strokeWidth={2}
      />
    </svg>
  )
}

export function HeartIcon({ size = 16 }: IconProps) {
  return (
    <svg {...base({ size, children: null })}>
      <path d="M12 20.5C7 16.5 3.5 13.3 3.5 9.6 3.5 7 5.5 5 8 5c1.6 0 3.1.8 4 2.1C12.9 5.8 14.4 5 16 5c2.5 0 4.5 2 4.5 4.6 0 3.7-3.5 6.9-8.5 10.9Z" />
    </svg>
  )
}

export function XIcon({ size = 16 }: IconProps) {
  return (
    <svg {...base({ size, children: null })}>
      <path d="M6 6l12 12M18 6 6 18" strokeWidth={2} />
    </svg>
  )
}

export function ArrowRightIcon({ size = 14 }: IconProps) {
  return (
    <svg {...base({ size, children: null })}>
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </svg>
  )
}

export function CopyIcon({ size = 14 }: IconProps) {
  return (
    <svg {...base({ size, children: null })}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

export function ChevronDownIcon({ size = 14 }: IconProps) {
  return (
    <svg {...base({ size, children: null })}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function InfoIcon({ size = 16, className }: IconProps) {
  return (
    <svg {...base({ size, children: null, className })}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 16v-5" />
      <path d="M12 8h.01" />
    </svg>
  )
}

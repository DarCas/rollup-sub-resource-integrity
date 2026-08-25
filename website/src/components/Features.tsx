import type { CSSProperties } from 'react'
import {
  HashIcon,
  LockIcon,
  PluginIcon,
  RefreshIcon,
  ShieldIcon,
  SlidersIcon,
} from './icons'

const FEATURES = [
  {
    icon: <HashIcon size={24} />,
    title: 'Automatic hashing',
    text: 'Every bundled asset referenced by your HTML gets its SHA-384 hash computed at build time.',
  },
  {
    icon: <PluginIcon size={24} />,
    title: 'Rollup-native',
    text: 'A standard Rollup plugin that hooks into generateBundle — no extra build steps or wrappers.',
  },
  {
    icon: <RefreshIcon size={24} />,
    title: 'Zero manual maintenance',
    text: 'Hashes are recalculated on every build. They can never drift from the assets they describe.',
  },
  {
    icon: <ShieldIcon size={24} />,
    title: 'Production ready',
    text: 'Works with hashed filenames, code splitting and multi-page setups out of the box.',
  },
  {
    icon: <LockIcon size={24} />,
    title: 'Security focused',
    text: 'Adds crossorigin="anonymous" alongside integrity so the browser verification actually applies.',
  },
  {
    icon: <SlidersIcon size={24} />,
    title: 'Minimal configuration',
    text: "One import, one call. Choose sha256, sha384 or sha512 — the default is sha384.",
  },
]

export function Features() {
  return (
    <section className="section section--divided" id="features" aria-labelledby="features-title">
      <hr className="section-divider" />
      <div className="container" style={{ paddingTop: 'clamp(64px, 9vw, 112px)' }}>
        <div className="reveal section-head">
          <p className="eyebrow">Features</p>
          <h2 className="section-title" id="features-title">
            Built for modern Rollup builds.
          </h2>
        </div>

        <div className="features-grid">
          {FEATURES.map((feature, i) => (
            <article
              key={feature.title}
              className="feature-card reveal"
              style={{ '--reveal-delay': `${(i % 3) * 80}ms` } as CSSProperties}
            >
              <div className="feature-card__icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

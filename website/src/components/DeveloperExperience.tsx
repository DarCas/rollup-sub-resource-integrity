/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * MIT
 */

import type { CSSProperties } from 'react'

const MANUAL_STEPS = [
  'Build your assets',
  'Find every emitted file',
  'Calculate hashes by hand',
  'Update the HTML',
  'Keep hashes synchronized on every rebuild',
]

export function DeveloperExperience() {
  return (
    <section className="section section--sub" id="dx" aria-labelledby="dx-title">
      <div className="container">
        <div className="reveal section-head">
          <p className="eyebrow">Developer experience</p>
          <h2 className="section-title" id="dx-title">
            Security without the ceremony.
          </h2>
          <p className="section-lede">
            Add integrity verification to your build without introducing another complex workflow.
          </p>
        </div>

        <div className="dx-grid">
          <div className="dx-col reveal" aria-label="Manual workflow">
            <p className="dx-col__head">Manual workflow</p>
            <ul className="dx-steps">
              {MANUAL_STEPS.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>

          <div className="dx-col dx-col--plugin reveal" style={{ '--reveal-delay': '120ms' } as CSSProperties} aria-label="Rollup SRI workflow">
            <p className="dx-col__head">With Rollup SRI</p>
            <ul className="dx-steps">
              <li>Build your assets</li>
              <li className="dx-done">✓ Done — hashes injected automatically</li>
            </ul>
          </div>
        </div>

        <p className="dx-note reveal">
          The plugin removes repetitive security-related build work — permanently.
        </p>
      </div>
    </section>
  )
}

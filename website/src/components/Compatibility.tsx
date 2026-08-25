/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * MIT
 */

const COMPAT = [
  { label: 'Rollup', value: '^2 · ^3 · ^4' },
  { label: 'Vite', value: 'Supported' },
  { label: 'Node.js', value: '≥ 18' },
  { label: 'Runtime deps', value: 'None' },
]

export function Compatibility() {
  return (
    <section className="section section--tight section--sub" id="compatibility" aria-labelledby="compat-title">
      <div className="container">
        <div className="reveal section-head">
          <p className="eyebrow">Compatibility</p>
          <h2 className="section-title" id="compat-title">
            Fits into your existing Rollup workflow.
          </h2>
          <p className="section-lede">
            A single peer dependency on Rollup itself. Vite projects work too, since Vite uses
            Rollup for production builds.
          </p>
        </div>

        <dl
          className="compat-grid reveal"
          style={{ margin: 0 }}
        >
          {COMPAT.map((item) => (
            <div key={item.label} className="compat-card">
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

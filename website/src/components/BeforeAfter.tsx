/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * MIT
 */

import type { CSSProperties } from 'react'

export function BeforeAfter() {
  return (
    <section className="section section--sub" id="before-after" aria-labelledby="ba-title">
      <div className="container">
        <div className="reveal section-head">
          <p className="eyebrow">Before / After</p>
          <h2 className="section-title" id="ba-title">
            Zero manual hash management.
          </h2>
          <p className="section-lede">
            The same HTML file, before and after the plugin runs. No hand-edited hashes, no drift
            between builds.
          </p>
        </div>

        <div className="compare">
          <div className="compare__panel reveal">
            <p className="compare__label compare__label--without">✕ Without Rollup SRI</p>
            <div className="compare__body">
              <pre>
                <code aria-label="Script tag without integrity attributes">
                  <span className="tok-punct">{'<'}</span>
                  <span className="tok-tag">script</span>{' '}
                  <span className="tok-attr">type</span>
                  <span className="tok-punct">=</span>
                  <span className="tok-value">"module"</span>
                  {'\n      '}
                  <span className="tok-attr">src</span>
                  <span className="tok-punct">=</span>
                  <span className="tok-value">"/assets/index-abc123.js"</span>
                  <span className="tok-punct">{'\n'}</span>
                  <span className="tok-punct">{'>'}</span>
                  <span className="tok-punct">{'</'}</span>
                  <span className="tok-tag">script</span>
                  <span className="tok-punct">{'>'}</span>
                </code>
              </pre>
              <p className="status-pill status-pill--bad">
                ✕ Browser trusts the response blindly
              </p>
            </div>
          </div>

          <div className="compare__panel reveal" style={{ '--reveal-delay': '120ms' } as CSSProperties}>
            <p className="compare__label compare__label--with">✓ With Rollup SRI</p>
            <div className="compare__body">
              <pre>
                <code aria-label="Script tag with integrity and crossorigin attributes">
                  <span className="tok-punct">{'<'}</span>
                  <span className="tok-tag">script</span>{' '}
                  <span className="tok-attr">type</span>
                  <span className="tok-punct">=</span>
                  <span className="tok-value">"module"</span>
                  {'\n      '}
                  <span className="tok-attr">src</span>
                  <span className="tok-punct">=</span>
                  <span className="tok-value">"/assets/index-abc123.js"</span>
                  {'\n      '}
                  <span className="tok-attr tok-added hash-flash">integrity</span>
                  <span className="tok-punct tok-added">=</span>
                  <span className="tok-value tok-added">"sha384-V9kQ…"</span>
                  {'\n      '}
                  <span className="tok-attr tok-added">crossorigin</span>
                  <span className="tok-punct tok-added">=</span>
                  <span className="tok-value tok-added">"anonymous"</span>
                  <span className="tok-punct">{'\n'}</span>
                  <span className="tok-punct">{'>'}</span>
                  <span className="tok-punct">{'</'}</span>
                  <span className="tok-tag">script</span>
                  <span className="tok-punct">{'>'}</span>
                </code>
              </pre>
              <p className="status-pill status-pill--good">
                ✓ Hash added automatically at build time
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

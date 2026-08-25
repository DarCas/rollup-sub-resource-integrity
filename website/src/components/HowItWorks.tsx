/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * MIT
 */

import type { CSSProperties } from 'react'
import { ArrowRightIcon } from './icons'

const STEPS = [
  {
    num: '01',
    title: 'Build',
    text: 'Rollup builds your assets exactly as it normally would.',
  },
  {
    num: '02',
    title: 'Hash',
    text: 'The plugin reads each asset from the bundle and calculates its cryptographic hash.',
  },
  {
    num: '03',
    title: 'Inject',
    text: 'Every emitted HTML file receives the integrity attribute on its matching tags.',
  },
  {
    num: '04',
    title: 'Verify',
    text: "The browser verifies each resource against its hash before executing it.",
  },
]

export function HowItWorks() {
  return (
    <section className="section section--sub" id="how-it-works" aria-labelledby="hiw-title">
      <div className="container">
        <div className="reveal section-head">
          <p className="eyebrow">How it works</p>
          <h2 className="section-title" id="hiw-title">
            From build to integrity.
          </h2>
        </div>

        <ol className="timeline" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {STEPS.map((step, i) => (
            <li
              key={step.num}
              className="timeline__step reveal"
              style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
            >
              <span className="timeline__num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              {i < STEPS.length - 1 && (
                <span className="timeline__arrow" aria-hidden>
                  <ArrowRightIcon />
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

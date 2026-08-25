/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * MIT
 */

import type { CSSProperties } from 'react'
import { CodeWindow } from './CodeWindow'

const CHECKS = [
    'Asset generated',
    'Hash calculated',
    'Integrity attribute added',
    'Browser-ready',
]

export function GeneratedOutput() {
    return (
        <section className="section section--sub" id="output" aria-labelledby="output-title">
            <div className="container">
                <div className="reveal">
                    <p className="eyebrow">Generated output</p>
                    <h2 className="section-title" id="output-title">
                        Your build. With integrity built in.
                    </h2>
                </div>
                <div className="split reveal" style={{marginTop: 28}}>
                    <div>
                        <CodeWindow title="dist/index.html"
                                    copyText={`<script type="module" src="/assets/app-C8k92x.js" integrity="sha384-V9kQ3mZxL8fJd2WnHq7sTtRbYc1uEoPpAaXzCbBnMlKjHgFdSaWq" crossorigin="anonymous"></script>`}
                                    ariaLabel="Generated script tag with integrity attributes">
                            <span className="tok-punct">{'<'}</span>
                            <span className="tok-tag">script</span>{' '}
                            <span className="tok-attr">type</span>
                            <span className="tok-punct">=</span>
                            <span className="tok-value">"module"</span>
                            {'\n      '}
                            <span className="tok-attr">src</span>
                            <span className="tok-punct">=</span>
                            <span className="tok-value">"/assets/app-C8k92x.js"</span>
                            {'\n      '}
                            <span className="tok-attr">integrity</span>
                            <span className="tok-punct">=</span>
                            <span className="tok-value">"sha384-V9kQ…SaWq"</span>
                            {'\n      '}
                            <span className="tok-attr">crossorigin</span>
                            <span className="tok-punct">=</span>
                            <span className="tok-value">"anonymous"</span>
                            <span className="tok-punct">{'\n'}</span>
                            <span className="tok-punct">{'>'}</span>
                            <span className="tok-punct">{'</'}</span>
                            <span className="tok-tag">script</span>
                            <span className="tok-punct">{'>'}</span>
                        </CodeWindow>
                    </div>

                <ul
                    className="checklist reveal-group reveal"
                    style={{'--reveal-delay': '120ms'} as CSSProperties}
                    aria-label="What the plugin produces"
                >
                    {CHECKS.map((check) => (
                        <li key={check}>
              <span className="check-badge">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M1.5 6.5 4.5 9.5 10.5 2.5" stroke="currentColor" strokeWidth="1.8"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
                            {check}
                        </li>
                    ))}
                </ul>
            </div>
            </div>
        </section>
    )
}

/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * MIT
 */

import type {CSSProperties} from 'react'

export function Problem() {
    return (
        <section className="section" id="problem" aria-labelledby="problem-title">
            <div className="container split">
                <div className="reveal">
                    <p className="eyebrow">The problem</p>
                    <h2 className="section-title" id="problem-title">
                        Your assets deserve integrity verification.
                    </h2>
                    <div className="prose">
                        <p>
                            Every <code className="mono"
                                        style={{fontSize: '0.9em'}}>&lt;script&gt;</code> and{' '}
                            <code className="mono"
                                  style={{fontSize: '0.9em'}}>&lt;link&gt;</code> you ship is
                            fetched over the network and executed by the browser — without any
                            guarantee that the
                            file it receives is the file you built.
                        </p>
                        <p>
                            Subresource Integrity closes that gap: the browser refuses to run a
                            resource whose
                            content doesn't match the hash you published alongside it.
                        </p>
                    </div>
                </div>

                <div className="reveal" style={{'--reveal-delay': '120ms'} as CSSProperties}>
                    <div className="compare__panel">
                        <div className="compare__body">
                            <pre>
                                <code aria-label="HTML script tag without integrity attribute, then with integrity attributes">
                                    <span className="tok-cmt">{'// before'}</span>{'\n'}
                                    <span className="tok-punct">{'<'}</span>
                                    <span className="tok-tag">script</span>{' '}
                                    <span className="tok-attr">src</span>
                                    <span className="tok-punct">=</span>
                                    <span className="tok-value">"/assets/app.js"</span>
                                    <span className="tok-punct">{'>'}</span>
                                    <span className="tok-punct">{'</'}</span>
                                    <span className="tok-tag">script</span>
                                    <span className="tok-punct">{'>'}</span>
                                </code>
                            </pre>
                            <p className="status-pill status-pill--bad" style={{marginTop: 6}}>
                                x No integrity
                            </p>
                            <pre>
                                <code aria-label="HTML script tag without integrity attribute, then with integrity attributes">
                                    {'\n'}
                                    <span className="tok-cmt">{'// after'}</span>{'\n'}
                                    <span className="tok-punct">{'<'}</span>
                                    <span className="tok-tag">script</span>{' '}
                                    <span className="tok-attr">src</span>
                                    <span className="tok-punct">=</span>
                                    <span className="tok-value">"/assets/app.js"</span>
                                    {'\n        '}
                                    <span className="tok-attr tok-added">integrity</span>
                                    <span className="tok-punct tok-added">=</span>
                                    <span className="tok-value tok-added">"sha384-V9kQ…"</span>
                                    {'\n        '}
                                    <span className="tok-attr tok-added">crossorigin</span>
                                    <span className="tok-punct tok-added">=</span>
                                    <span className="tok-value tok-added">"anonymous"</span>
                                    {'\n'}
                                    <span className="tok-punct">{'>'}</span>
                                    <span className="tok-punct">{'</'}</span>
                                    <span className="tok-tag">script</span>
                                    <span className="tok-punct">{'>'}</span>
                                </code>
                            </pre>
                            <p className="status-pill status-pill--good" style={{marginTop: 6}}>
                                ✓ Integrity verified
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

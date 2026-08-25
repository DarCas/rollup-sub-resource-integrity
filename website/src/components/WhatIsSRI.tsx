/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * MIT
 */

export function WhatIsSRI() {
  return (
    <section className="section section--sub" id="what-is-sri" aria-labelledby="sri-title">
      <div className="container">
        <div className="reveal section-head">
          <p className="eyebrow">Background</p>
          <h2 className="section-title" id="sri-title">
            What is Subresource Integrity?
          </h2>
          <div className="prose" style={{ maxWidth: 720 }}>
            <p>
              Subresource Integrity (SRI) is a browser security feature that lets you pin a{' '}
              <strong>cryptographic hash</strong> to every resource you load. The hash travels in
              the <code className="mono" style={{ fontSize: '0.9em' }}>integrity</code> attribute of
              the tag; before executing a script or applying a stylesheet, the browser hashes what
              it downloaded and compares it with what you declared.
            </p>
            <p>
              If the two don't match — because the file was tampered with, corrupted, or served
              from an unexpected source — the browser blocks it. Nothing runs, nothing leaks.
            </p>
            <p>
              It is the standard defense against compromised CDNs and man-in-the-middle
              modifications of third-party code.{' '}
              <a
                className="inline-link"
                href="https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more on MDN
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

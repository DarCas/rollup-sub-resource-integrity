/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * MIT
 */

import { GitHubIcon } from './icons'
import { PayPalDonate } from './PayPalDonate'

const GITHUB_URL = 'https://github.com/DarCas/rollup-sub-resource-integrity'
const NPM_URL = 'https://www.npmjs.com/package/@darcas/rollup-sub-resource-integrity'

export function OpenSource() {
  return (
    <section className="section section--tight section--divided" id="open-source" aria-labelledby="os-title">
      <hr className="section-divider" />
      <div className="container" style={{ paddingTop: 'clamp(56px, 8vw, 88px)' }}>
        <div className="reveal section-head">
          <p className="eyebrow">Open source</p>
          <h2 className="section-title" id="os-title">
            Open source. Built for the ecosystem.
          </h2>
        </div>

        <div className="os-panel reveal">
          <div>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 460, marginBottom: 18 }}>
              The full source is public and MIT licensed. Issues, discussions and pull requests
              are welcome.
            </p>
            <div className="os-badges">
              <img
                src="https://img.shields.io/npm/v/@darcas/rollup-sub-resource-integrity?style=flat-square&label=npm"
                alt="npm version"
                loading="lazy"
              />
              <img
                src="https://img.shields.io/npm/dy/%40darcas%2Frollup-sub-resource-integrity?style=for-the-badge"
                alt="Downloads per year"
                loading="lazy"
              />
              <img
                src="https://img.shields.io/npm/last-update/%40darcas%2Frollup-sub-resource-integrity?style=for-the-badge"
                alt="MIT license"
                loading="lazy"
              />
            </div>
          </div>

          <div className="os-actions">
            <a
              className="btn btn--secondary"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon size={16} />
              View on GitHub
            </a>
            <PayPalDonate />
          </div>
        </div>
      </div>
    </section>
  )
}

export { NPM_URL }

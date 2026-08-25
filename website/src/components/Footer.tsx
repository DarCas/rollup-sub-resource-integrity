/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * MIT
 */

import { LogoMark } from './Navbar'
import { NPM_URL } from './OpenSource'
import { PayPalDonate } from './PayPalDonate'

const GITHUB_URL = 'https://github.com/DarCas/rollup-sub-resource-integrity'
const START_YEAR = 2026

function getYearRange() {
  const current = new Date().getFullYear()
  return current > START_YEAR ? `${START_YEAR}-${current}` : `${START_YEAR}`
}

declare const __APP_VERSION__: string

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <p className="footer__brand" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <LogoMark />
              Rollup SRI
            </p>
            <p className="footer__tagline">
              Open source tooling for secure web builds.
            </p>
          </div>

          <div className="footer__nav">
            <ul className="footer__links" aria-label="Footer links">
              <li>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href={NPM_URL} target="_blank" rel="noopener noreferrer">
                  npm
                </a>
              </li>
              <li>
                <a href="#usage">Documentation</a>
              </li>
            </ul>
            <PayPalDonate />
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {getYearRange()} Dario Casertano. MIT License.
          </span>
          <span>
            Made by{' '}
            <a href="https://casertano.name" target="_blank">
              Dario Casertano
            </a>
          </span>
          <span className="footer__version">Version {__APP_VERSION__}</span>
        </div>
      </div>
    </footer>
  )
}

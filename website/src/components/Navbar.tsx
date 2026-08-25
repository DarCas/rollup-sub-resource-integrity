/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * MIT
 */

import { useEffect, useState } from 'react'
import { GitHubIcon } from './icons'
import { PayPalDonate } from './PayPalDonate'

const LINKS = [
    {href: '#features', label: 'Features'},
    {href: '#usage', label: 'Usage'},
    {href: '#security', label: 'Security'},
    {href: '#open-source', label: 'Open Source'},
]

const GITHUB_URL = 'https://github.com/DarCas/rollup-sub-resource-integrity'

export function LogoMark() {
    return (
        <svg
            className="nav__brand-mark"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
        >
            <path
                d="M12 2.5 4.5 5.5v5.6c0 4.6 3.1 8 7.5 10.4 4.4-2.4 7.5-5.8 7.5-10.4V5.5L12 2.5Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
            <path
                d="M9 11.5h1.2l1-1.8 1.6 4 1-2.2H15"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.9"
            />
        </svg>
    )
}

export function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8)
        onScroll()
        window.addEventListener('scroll', onScroll, {passive: true})
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const closeMenu = () => setMenuOpen(false)

    return (
        <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
            <div className="container nav__inner">
                <a href="#top" className="nav__brand" aria-label="Rollup SRI — home">
                    <LogoMark/>
                    Rollup SRI
                </a>

                <nav aria-label="Main navigation">
                    <ul className="nav__links">
                        {LINKS.map((link) => (
                            <li key={link.href}>
                                <a className="nav__link" href={link.href}>
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="nav__cta-group">
                    <a className="btn btn--primary" href="#usage">
                        Get Started
                    </a>

                    <PayPalDonate className="btn btn--donate nav__donate"/>

                    <a
                        className="nav__gh-icon"
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub repository"
                    >
                        <GitHubIcon/>
                    </a>
                </div>

                <button
                    type="button"
                    className="nav__burger"
                    aria-expanded={menuOpen}
                    aria-controls="mobile-menu"
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
                        {menuOpen ? <path d="M6 6l12 12M18 6 6 18"/> :
                            <path d="M4 7h16M4 12h16M4 17h16"/>}
                    </svg>
                </button>
            </div>

            <nav
                id="mobile-menu"
                className={`nav__mobile${menuOpen ? ' nav__mobile--open' : ''}`}
                aria-label="Mobile navigation"
                aria-hidden={!menuOpen}
                inert={!menuOpen}
                onClick={closeMenu}
            >
                {LINKS.map((link) => (
                    <a key={link.href} href={link.href}>
                        {link.label}
                    </a>
                ))}
                <span className="nav__mobile-actions">
                    <a href="#usage" className="btn btn--primary">Get Started</a>

                    <PayPalDonate className="btn btn--donate"/>

                    <a
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--secondary"
                    >
                        <GitHubIcon size={18}/>
                        View on GitHub
                    </a>
                </span>
            </nav>
        </header>
    )
}

/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * MIT
 */

import {useState} from 'react'
import {CodeWindow} from './CodeWindow'
import {InfoIcon} from './icons'

const INSTALLERS = {
    npm: 'npm i -D @darcas/rollup-sub-resource-integrity',
    yarn: 'yarn add @darcas/rollup-sub-resource-integrity --dev',
} as const

type Installer = keyof typeof INSTALLERS

export function Usage() {
    const [installer, setInstaller] = useState<Installer>('npm')

    return (
        <section className="section section--divided" id="usage" aria-labelledby="usage-title">
            <hr className="section-divider"/>
            <div className="container" style={{paddingTop: 'clamp(64px, 9vw, 112px)'}}>
                <div className="reveal section-head">
                    <p className="eyebrow">Usage</p>
                    <h2 className="section-title" id="usage-title">
                        Add it to your Rollup build.
                    </h2>
                    <p className="section-lede">
                        Import the plugin and add it to your plugin list. That's the entire
                        configuration.
                    </p>
                </div>

                <div className="reveal">
                    <div
                        className="usage-tabs"
                        role="tablist"
                        aria-label="Package manager"
                    >
                        {(Object.keys(INSTALLERS) as Installer[]).map((key) => (
                            <button
                                key={key}
                                type="button"
                                role="tab"
                                id={`tab-${key}`}
                                aria-selected={installer === key}
                                aria-controls={`panel-${key}`}
                                className="usage-tab"
                                onClick={() => setInstaller(key)}
                            >
                                {key}
                            </button>
                        ))}
                    </div>

                    <div
                        role="tabpanel"
                        id={`panel-${installer}`}
                        aria-labelledby={`tab-${installer}`}
                    >
                        <CodeWindow title="terminal">
                            <span className="tok-punct">$&nbsp;</span>
                            {INSTALLERS[installer]}
                        </CodeWindow>
                    </div>

                    <div style={{height: 24}} aria-hidden/>

                    <CodeWindow title="vite.config.mts"
                                copyText={`import { defineConfig } from 'vite'\nimport SubResourceIntegrity from '@darcas/rollup-sub-resource-integrity'\n\nexport default defineConfig({\n  plugins: [\n    SubResourceIntegrity(),\n  ],\n})`}
                                ariaLabel="Vite configuration using Rollup Subresource Integrity plugin">
                        <span className="tok-kw">import</span>
                        <span className="tok-plain">{' { defineConfig } '}</span>
                        <span className="tok-kw">from</span>
                        <span className="tok-str"> 'vite'</span>
                        {'\n'}
                        <span className="tok-kw">import</span>
                        <span className="tok-plain"> SubResourceIntegrity </span>
                        <span className="tok-kw">from</span>
                        <span className="tok-str"> '@darcas/rollup-sub-resource-integrity'</span>
                        {'\n\n'}
                        <span className="tok-kw">export default</span>
                        <span className="tok-fn"> defineConfig</span>
                        <span className="tok-punct">({'{'}</span>
                        {'\n'}
                        <span className="tok-punct">{'  plugins: ['}</span>
                        {'\n'}
                        {'    '}
                        <span className="tok-fn">SubResourceIntegrity</span>
                        <span className="tok-punct">(),</span>
                        {'\n'}
                        <span className="tok-punct">{'  ],'}</span>
                        {'\n'}
                        <span className="tok-punct">{'}'})</span>
                    </CodeWindow>

<p className="usage-note reveal" style={{marginTop: 18}}>
  <InfoIcon className="usage-note__icon" />
  <span>
    By default the plugin uses <code>sha384</code>. Pass <code>'sha256'</code> or{' '}
    <code>'sha512'</code> to choose a different algorithm.
  </span>
</p>
                </div>
            </div>
        </section>
    )
}

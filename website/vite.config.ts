/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * MIT
 */

import SubResourceIntegrity from "@darcas/rollup-sub-resource-integrity";
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'))
const pluginPkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf-8'))

const InjectSoftwareVersion = () => ( {
    name: 'inject-software-version',
    transformIndexHtml(html: string): string {
        return html.replace(
            /("softwareVersion"\s*:\s*")([^"]*)(")/,
            `$1${pluginPkg.version}$3`,
        )
    },
} )

/**
 * Updates `<lastmod>` in the built sitemap.xml with the build date,
 * so every deployment reports a fresh modification timestamp.
 */
function SitemapLastmod(): Plugin {
    return {
        name: 'sitemap-lastmod',
        closeBundle() {
            const file = resolve('dist', 'sitemap.xml')
            const today = new Date().toISOString().slice(0, 10)
            let xml = readFileSync(file, 'utf-8')
            if (/<lastmod>/.test(xml)) {
                xml = xml.replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${today}</lastmod>`)
            } else {
                xml = xml.replace('</loc>', `</loc>\n    <lastmod>${today}</lastmod>`)
            }
            writeFileSync(file, xml)
        },
    }
}

export default defineConfig({
    define: {
        __APP_VERSION__: JSON.stringify(pkg.version),
    },
    plugins: [
        react(),
        SubResourceIntegrity(),
        SitemapLastmod(),
        InjectSoftwareVersion(),
    ],
})

/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * MIT
 */

import SubResourceIntegrity from "@darcas/rollup-sub-resource-integrity";
import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'))
const pluginPkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf-8'))

const injectSoftwareVersion = () => ( {
    name: 'inject-software-version',
    transformIndexHtml(html: string): string {
        return html.replace(
            /("softwareVersion"\s*:\s*")([^"]*)(")/,
            `$1${pluginPkg.version}$3`,
        )
    },
} )

export default defineConfig({
    define: {
        __APP_VERSION__: JSON.stringify(pkg.version),
    },
    plugins: [
        react(),
        SubResourceIntegrity(),
        injectSoftwareVersion(),
    ],
})

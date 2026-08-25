/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * MIT
 *
 * Prerenders the React app into static HTML for SEO/crawlers.
 * Runs AFTER `vite build`: loads the built index.html and injects the
 * server-rendered markup of <App /> into #root. The React tree is SSR-safe
 * (all browser APIs live inside useEffect; only main.tsx touches document),
 * so crawling/LLM clients see full content instead of an empty #root.
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { createServer } from 'vite'

const outDir = resolve('dist')
const indexPath = resolve(outDir, 'index.html')

const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'error',
})

try {
    const { default: App } = await vite.ssrLoadModule('/src/App.tsx')
    const appHtml = renderToString(createElement(App))

    const html = readFileSync(indexPath, 'utf-8')
    const injected = html.replace(
        /<div id="root">\s*<\/div>/,
        `<div id="root">${appHtml}</div>`,
    )

    if (!injected.includes(appHtml)) {
        throw new Error('Could not find <div id="root"></div> in dist/index.html')
    }

    writeFileSync(indexPath, injected)
    process.stdout.write(`Prerendered ${Buffer.byteLength(appHtml, 'utf8')} bytes of HTML into ${indexPath}\n`)
} finally {
    await vite.close()
}
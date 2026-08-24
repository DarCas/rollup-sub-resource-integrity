import { createHash } from 'node:crypto'
import { mkdtemp, readFile, rm, writeFile, mkdir } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import type { Plugin } from 'vite'
import { build } from 'vite'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import SubResourceIntegrity from '../src/index'

describe('SubResourceIntegrity (Vite integration)', () => {
    let projectDir: string

    beforeAll(async () => {
        projectDir = await mkdtemp(join(tmpdir(), 'sri-plugin-'))
        await mkdir(join(projectDir, 'src'), { recursive: true })

        await writeFile(join(projectDir, 'index.html'), `<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="/src/style.css">
  </head>
  <body>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>`)
        await writeFile(join(projectDir, 'src', 'main.js'), 'import "./style.css"\nconsole.log("hello")\n')
        await writeFile(join(projectDir, 'src', 'style.css'), 'body{background:#000}\n')

        await build({
            root: projectDir,
            logLevel: 'silent',
            plugins: [SubResourceIntegrity()],
            build: {
                outDir: 'dist',
                emptyOutDir: true,
                minify: false,
            },
        })
    }, 30_000)

    afterAll(async () => {
        await rm(projectDir, { recursive: true, force: true })
    })

    it('emits HTML with correct integrity attributes for script and stylesheet', async () => {
        const html = await readFile(join(projectDir, 'dist', 'index.html'), 'utf-8')
        const scriptMatch = /<script[^>]*src="([^"]+)"[^>]*integrity="sha384-([^"]+)"/.exec(html)
        const linkMatch = /<link[^>]*href="([^"]+\.css)"[^>]*integrity="sha384-([^"]+)"/.exec(html)

        expect(scriptMatch).not.toBeNull()
        expect(linkMatch).not.toBeNull()

        for (const [, uri, digest] of [scriptMatch!, linkMatch!]) {
            const content = await readFile(join(projectDir, 'dist', uri.replace(/^\//, '')))
            const expected = createHash('sha384').update(content).digest('base64')

            expect(digest).toBe(expected)
        }

        expect(html.match(/crossorigin="anonymous"/g)?.length).toBe(2)
    })
})

describe('SubResourceIntegrity (post-generateBundle chunk mutation)', () => {
    let projectDir: string

    beforeAll(async () => {
        projectDir = await mkdtemp(join(tmpdir(), 'sri-plugin-mutation-'))
        await mkdir(join(projectDir, 'src'), { recursive: true })

        await writeFile(join(projectDir, 'index.html'), `<!doctype html>
<html>
  <body>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>`)
        await writeFile(join(projectDir, 'src', 'main.js'), 'console.log("hello")\n')

        /**
         * Simulates pipelines (e.g. Vite 8 / Rolldown) that mutate chunks
         * after the integrity pass has computed its digests.
         */
        const mutateChunksAfterSri = (): Plugin => ({
            apply: 'build',
            enforce: 'post',
            generateBundle: (_options, bundle) => {
                for (const file of Object.values(bundle)) {
                    if (file.type === 'chunk') {
                        file.code += '\n/* mutated after hashing */\n'
                    }
                }
            },
            name: 'mutate-chunks-after-sri',
        })

        await build({
            root: projectDir,
            logLevel: 'silent',
            plugins: [
                SubResourceIntegrity(),
                mutateChunksAfterSri(),
            ],
            build: {
                outDir: 'dist',
                emptyOutDir: true,
                minify: false,
            },
        })
    }, 30_000)

    afterAll(async () => {
        await rm(projectDir, { recursive: true, force: true })
    })

    it('reconciles integrity attributes with the final emitted files', async () => {
        const html = await readFile(join(projectDir, 'dist', 'index.html'), 'utf-8')
        const scriptMatch = /<script[^>]*src="([^"]+)"[^>]*integrity="sha384-([^"]+)"/.exec(html)

        expect(scriptMatch).not.toBeNull()

        const [ , uri, digest ] = scriptMatch!
        const content = await readFile(join(projectDir, 'dist', uri.replace(/^\//, '')))
        const expected = createHash('sha384').update(content).digest('base64')

        expect(digest).toBe(expected)
    })
})

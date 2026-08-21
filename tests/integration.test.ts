import { createHash } from 'node:crypto'
import { mkdtemp, readFile, rm, writeFile, mkdir } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
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

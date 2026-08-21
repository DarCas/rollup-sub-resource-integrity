import { createHash } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import type { NormalizedOutputOptions, OutputAsset, OutputBundle, OutputChunk, OutputOptions } from 'rollup'
import type { Plugin } from 'vite'
import SubResourceIntegrity from '../src/index'

type Algorithm = 'sha256' | 'sha384' | 'sha512'

const integrityOf = (content: string | Uint8Array, algorithm: Algorithm = 'sha384'): string =>
    `${algorithm}-${createHash(algorithm).update(content).digest('base64')}`

function callGenerateBundle(plugin: Plugin, options: OutputOptions, bundle: OutputBundle): void {
    const hook = plugin.generateBundle!
    const handler = typeof hook === 'function' ? hook : hook.handler

    handler.call({} as never, options as NormalizedOutputOptions, bundle, true)
}

const chunk = (code: string): OutputChunk => ({
    type: 'chunk',
    code,
    dynamicImports: [],
    exports: [],
    facadeModuleId: null,
    fileName: '',
    implicitlyLoadedBefore: [],
    imports: [],
    importedBindings: {},
    isDynamicEntry: false,
    isEntry: false,
    isImplicitEntry: false,
    moduleIds: [],
    name: '',
    referencedFiles: [],
    sourcemapFileName: null,
    viteMetadata: { importedCss: [], importedAssets: [] },
} as unknown as OutputChunk)

const asset = (source: string | Uint8Array): OutputAsset => ({
    type: 'asset',
    source,
    fileName: '',
    name: undefined,
    needsCodeReference: false,
    originalFileName: null,
} as unknown as OutputAsset)

function run(html: string, bundle: Record<string, OutputChunk | OutputAsset>, htmlName = 'index.html'): string {
    const fullBundle = { ...bundle, [htmlName]: asset(html) } as OutputBundle
    const plugin = SubResourceIntegrity()

    callGenerateBundle(plugin, { dir: 'dist' }, fullBundle)

    return (fullBundle[htmlName] as OutputAsset).source as string
}

describe('SubResourceIntegrity', () => {
    it('adds integrity and crossorigin to a root-relative script', () => {
        const html = run(
            '<html><body><script type="module" src="/assets/main.js"></script></body></html>',
            { 'assets/main.js': chunk('console.log("main")') },
        )

        expect(html).toContain(`integrity="${integrityOf('console.log("main")')}"`)
        expect(html).toContain('crossorigin="anonymous"')
    })

    it('hashes the chunk code, not the file name', () => {
        const code = 'export const x = 42;'
        const html = run('<script src="/assets/x.js"></script>', { 'assets/x.js': chunk(code) })

        expect(html).toContain(`sha384-${createHash('sha384').update(code).digest('base64')}`)
    })

    it('handles stylesheet links backed by assets', () => {
        const css = 'body{color:red}'
        const html = run(
            '<link rel="stylesheet" href="/assets/style.css">',
            { 'assets/style.css': asset(css) },
        )

        expect(html).toContain(`integrity="${integrityOf(css)}"`)
    })

    it('handles preload and modulepreload links', () => {
        const js = 'var a=1'
        const html = run(
            '<link rel="preload" href="/assets/a.js"><link rel="modulepreload" href="/assets/b.js">',
            { 'assets/a.js': chunk(js), 'assets/b.js': chunk(js) },
        )

        expect(html.match(/integrity=/g)).toHaveLength(2)
    })

    it('skips external URLs', () => {
        for (const uri of ['https://cdn.example.com/x.js', '//cdn.example.com/x.js', 'data:text/javascript,x']) {
            const html = run(`<script src="${uri}"></script>`, {})

            expect(html).not.toContain('integrity=')
            expect(html).not.toContain('crossorigin=')
        }
    })

    it('skips resources missing from the bundle', () => {
        const html = run('<script src="/assets/missing.js"></script>', {})

        expect(html).not.toContain('integrity=')
    })

    it('leaves non-eligible links untouched', () => {
        const html = run(
            '<link rel="icon" href="/favicon.ico"><a href="/about">About</a>',
            { 'favicon.ico': asset('ico') },
        )

        expect(html).not.toContain('integrity=')
    })

    it('overwrites an existing integrity attribute', () => {
        const html = run(
            '<script src="/assets/main.js" integrity="sha384-stale"></script>',
            { 'assets/main.js': chunk('fresh') },
        )

        expect(html).toContain(`integrity="${integrityOf('fresh')}"`)
        expect(html).not.toContain('stale')
    })

    it('does not duplicate an existing crossorigin attribute', () => {
        const html = run(
            '<script src="/assets/main.js" crossorigin="use-credentials"></script>',
            { 'assets/main.js': chunk('x') },
        )

        expect(html.match(/crossorigin=/g)).toHaveLength(1)
        expect(html).toContain('crossorigin="use-credentials"')
    })

    it('resolves relative URIs against the HTML location', () => {
        const html = run(
            '<script src="./main.js"></script><script src="../shared/util.js"></script>',
            { 'sub/main.js': chunk('a'), 'shared/util.js': chunk('b') },
            'sub/page.html',
        )

        expect(html).toContain(`integrity="${integrityOf('a')}"`)
        expect(html).toContain(`integrity="${integrityOf('b')}"`)
    })

    it('strips query strings and hashes from URIs', () => {
        const html = run(
            '<script src="/assets/main.js?v=1#top"></script>',
            { 'assets/main.js': chunk('q') },
        )

        expect(html).toContain(`integrity="${integrityOf('q')}"`)
    })

    it('supports sha256 and sha512 algorithms', () => {
        for (const algorithm of ['sha256', 'sha512'] as Algorithm[]) {
            const plugin = SubResourceIntegrity(algorithm)
            const bundle = {
                'index.html': asset('<script src="/assets/main.js"></script>'),
                'assets/main.js': chunk('algo'),
            } as OutputBundle

            callGenerateBundle(plugin, {}, bundle)

            expect((bundle['index.html'] as OutputAsset).source).toContain(`integrity="${integrityOf('algo', algorithm)}"`)
        }
    })

    it('preserves self-closing link tags', () => {
        const html = run(
            '<link rel="stylesheet" href="/assets/style.css" />',
            { 'assets/style.css': asset('css') },
        )

        expect(html).toMatch(/<link[^>]*integrity="[^"]+"[^>]*\/>/)
    })

    it('leaves HTML without eligible tags unchanged', () => {
        const html = '<html><head><title>Solo</title></head><body><p>Ciao</p></body></html>'

        expect(run(html, {})).toBe(html)
    })
})

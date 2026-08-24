/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2024-2026 Casertano Dario – All rights reserved.
 * MIT
 */

import { createHash } from 'node:crypto'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { posix, relative, resolve } from 'node:path'
import type { OutputAsset, OutputBundle, OutputChunk, OutputOptions } from 'rollup'
import type { Plugin, ResolvedConfig } from 'vite'

type Algorithm = 'sha256' | 'sha384' | 'sha512'

const TAG_PATTERN_SOURCE = '<(script|link)\\b((?:[^>"\']|"[^"]*"|\'[^\']*\')*)>'
const EXTERNAL_URI_PATTERN = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i
const ELIGIBLE_LINK_RELS = new Set(['stylesheet', 'preload', 'modulepreload'])

function getAttribute(tag: string, name: string): string | null {
    const match = new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i').exec(tag)

    return match ? ( match[ 1 ] ?? match[ 2 ] ) : null
}

function hasAttribute(tag: string, name: string): boolean {
    return new RegExp(`\\b${name}(?=\\s|=|/?>|$)`, 'i').test(tag)
}

function setAttribute(tag: string, name: string, value: string): string {
    const pattern = new RegExp(`\\b${name}\\s*=\\s*(?:"[^"]*"|'[^']*')`, 'i')

    if (pattern.test(tag)) {
        return tag.replace(pattern, `${name}="${value}"`)
    }

    return tag.endsWith('/>')
        ? `${tag.slice(0, -2).trimEnd()} ${name}="${value}" />`
        : `${tag.slice(0, -1).trimEnd()} ${name}="${value}">`
}

function resolveUri(htmlPath: string, uri: string): string {
    const clean = uri.replace(/[?#].*$/, '')

    return clean.startsWith('/')
        ? posix.normalize(clean.slice(1))
        : posix.normalize(posix.join(posix.dirname(htmlPath), clean))
}

function getBundleSource(bundle: OutputBundle, fileName: string): string | Uint8Array | null {
    const file: OutputAsset | OutputChunk | undefined = bundle[ fileName ]

    if (!file) {
        return null
    }

    return file.type === 'chunk' ? file.code : file.source
}

export default function SubResourceIntegrity(algorithm: Algorithm = 'sha384'): Plugin {
    const hash = (content: string | Uint8Array): string => createHash(algorithm)
        .update(content)
        .digest('base64')

    let outDir = ''

    /**
     * Computes the corrected `integrity` attribute for a single tag by hashing
     * the file that was actually emitted to disk.
     *
     * Returns `null` when the tag must be left untouched (external URI,
     * ineligible `rel`, missing target).
     *
     * @param tagName Lowercase tag name (`script` or `link`).
     * @param attributes Raw attribute segment of the tag.
     * @param relativePath Path of the HTML file relative to `outDir` (posix separators).
     */
    const digestFromDisk = async (tagName: string, attributes: string, relativePath: string): Promise<string | null> => {
        const name = tagName.toLowerCase()
        const uri = getAttribute(attributes, name === 'script' ? 'src' : 'href')

        if (!uri || EXTERNAL_URI_PATTERN.test(uri)) {
            return null
        }

        if (name === 'link') {
            const rel = ( getAttribute(attributes, 'rel') ?? '' )
                .toLowerCase()
                .split(/\s+/)

            if (!rel.some(value => ELIGIBLE_LINK_RELS.has(value))) {
                return null
            }
        }

        try {
            const source = await readFile(resolve(outDir, resolveUri(relativePath, uri)))

            return `${algorithm}-${hash(source)}`
        } catch {
            return null
        }
    }

    /**
     * Rewrites the `integrity` attributes of an HTML document by recomputing
     * every digest from the files that were actually emitted to disk.
     *
     * This is necessary because some pipelines (e.g. Vite 8 / Rolldown) may
     * mutate chunks after the `generateBundle` hook has run, invalidating
     * any digest computed in memory.
     *
     * @param absolutePath Absolute path of the HTML file on disk.
     * @param relativePath Path of the HTML file relative to `outDir` (posix separators).
     */
    const reconcileHtmlFromDisk = async (absolutePath: string, relativePath: string): Promise<void> => {
        const html = await readFile(absolutePath, 'utf-8')
        const digests = new Map<string, string>()

        for (const [, tagName, attributes] of html.matchAll(new RegExp(TAG_PATTERN_SOURCE, 'gi'))) {
            const digest = await digestFromDisk(tagName, attributes, relativePath)

            if (digest !== null) {
                digests.set(`<${tagName}${attributes}`, digest)
            }
        }

        if (digests.size === 0) {
            return
        }

        const resolved = html.replace(new RegExp(TAG_PATTERN_SOURCE, 'gi'), (tag: string, tagName: string, attributes: string) => {
            const digest = digests.get(`<${tagName}${attributes}`)

            if (!digest) {
                return tag
            }

            let result = setAttribute(tag, 'integrity', digest)

            if (!hasAttribute(tag, 'crossorigin')) {
                result = setAttribute(result, 'crossorigin', 'anonymous')
            }

            return result
        })

        if (resolved !== html) {
            await writeFile(absolutePath, resolved)
        }
    }

    return {
        apply: 'build',
        closeBundle: async (): Promise<void> => {
            if (!outDir) {
                return
            }

            const entries = await readdir(outDir, {
                recursive: true,
                withFileTypes: true,
            })

            for (const entry of entries) {
                if (!entry.isFile() || ( !entry.name.endsWith('.html') && !entry.name.endsWith('.htm') )) {
                    continue
                }

                const absolutePath = resolve(entry.parentPath ?? entry.path, entry.name)

                await reconcileHtmlFromDisk(absolutePath, posix.join(...relative(outDir, absolutePath).split(/[\\/]/)))
            }
        },
        configResolved: (config: ResolvedConfig): void => {
            outDir = resolve(config.root, config.build.outDir)
        },
        enforce: 'post',
        generateBundle: (_: OutputOptions, bundle: OutputBundle): void => {
            for (const fileName of Object.keys(bundle)) {
                if (!fileName.endsWith('.html') && !fileName.endsWith('.htm')) {
                    continue
                }

                const asset = bundle[ fileName ] as OutputAsset
                const html = typeof asset.source === 'string'
                    ? asset.source
                    : new TextDecoder().decode(asset.source)

                asset.source = html.replace(new RegExp(TAG_PATTERN_SOURCE, 'gi'), (tag: string, tagName: string, attributes: string) => {
                    const name = tagName.toLowerCase()
                    const uri = getAttribute(attributes, name === 'script' ? 'src' : 'href')

                    if (!uri || EXTERNAL_URI_PATTERN.test(uri)) {
                        return tag
                    }

                    if (name === 'link') {
                        const rel = ( getAttribute(attributes, 'rel') ?? '' )
                            .toLowerCase()
                            .split(/\s+/)

                        if (!rel.some(value => ELIGIBLE_LINK_RELS.has(value))) {
                            return tag
                        }
                    }

                    const source = getBundleSource(bundle, resolveUri(fileName, uri))

                    if (source === null) {
                        return tag
                    }

                    let result = setAttribute(tag, 'integrity', `${algorithm}-${hash(source)}`)

                    if (!hasAttribute(tag, 'crossorigin')) {
                        result = setAttribute(result, 'crossorigin', 'anonymous')
                    }

                    return result
                })
            }
        },
        name: 'rollup-sub-resource-integrity',
    }
}

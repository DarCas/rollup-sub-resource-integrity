/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2024-2026 Casertano Dario – All rights reserved.
 * MIT
 */

import { createHash } from 'node:crypto'
import { posix } from 'node:path'
import type { OutputAsset, OutputBundle, OutputChunk, OutputOptions } from 'rollup'
import type { Plugin } from 'vite'

type Algorithm = 'sha256' | 'sha384' | 'sha512'

const TAG_PATTERN_SOURCE = '<(script|link)\\b((?:[^>"\']|"[^"]*"|\'[^\']*\')*)>'
const EXTERNAL_URI_PATTERN = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i
const ELIGIBLE_LINK_RELS = new Set(['stylesheet', 'preload', 'modulepreload'])

function getAttribute(tag: string, name: string): string | null {
    const match = new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i').exec(tag)

    return match ? ( match[ 1 ] ?? match[ 2 ] ) : null
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

    return {
        apply: 'build',
        enforce: 'post',
        generateBundle: (options: OutputOptions, bundle: OutputBundle): void => {
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

                    if (!getAttribute(attributes, 'crossorigin')) {
                        result = setAttribute(result, 'crossorigin', 'anonymous')
                    }

                    return result
                })
            }
        },
        name: 'rollup-sub-resource-integrity',
    }
}

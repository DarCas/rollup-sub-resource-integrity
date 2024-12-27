/**
 * @author      Dario Casertano <dario@casertano.name>
 * @copyright   Copyright (c) 2024 Casertano Dario – All rights reserved.
 * @license     MIT
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity
 */

import { load } from "cheerio";
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import type { OutputAsset, OutputOptions } from "rollup";

export default function SubResourceIntegrity(algorithm: "sha256" | "sha384" | "sha512" = "sha384") {
    const hashing = (buffer: Buffer | string): string => {
        const hash = createHash(algorithm)
        hash.update(buffer)

        return hash.digest('base64')
    }

    return {
        apply: "build",
        enforce: "post",
        name: "rollup-sub-resource-integrity",
        writeBundle: (options: OutputOptions, bundle: {
            [ fileName: string ]: OutputAsset
        }): void => {
            if (bundle[ 'index.html' ]) {
                const html = readFileSync(`${options.dir}/index.html`, 'utf-8')
                const $ = load(html)

                const elements = $('script[src], link[rel="stylesheet"], link[rel="preload"], link[rel="modulepreload"]')

                for (const element of elements) {
                    const _this = $(element)
                    const uri = _this.attr('href') || _this.attr('src')

                    if (uri && bundle[ uri.substring(1) ]) {
                        const source = readFileSync(`${options.dir}/${bundle[ uri.substring(1) ].fileName}`)

                        _this.attr('integrity', [algorithm, hashing(source)].join('-'))
                    }
                }

                writeFileSync(`${options.dir}/index.html`, $.html(), 'utf-8')
            }
        },
    }
}

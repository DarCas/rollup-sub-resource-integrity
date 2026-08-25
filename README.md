# SubResourceIntegrity

![NPM Last Update](https://img.shields.io/npm/last-update/%40darcas%2Frollup-sub-resource-integrity?style=for-the-badge)
![NPM Version](https://img.shields.io/npm/v/%40darcas%2Frollup-sub-resource-integrity?style=for-the-badge)
![NPM Downloads](https://img.shields.io/npm/dy/%40darcas%2Frollup-sub-resource-integrity?style=for-the-badge)

![NPM License](https://img.shields.io/npm/l/%40darcas%2Frollup-sub-resource-integrity?style=for-the-badge)

[![Buy me a coffee](https://img.shields.io/badge/buy_me_a_coffee-%E2%9D%A4%EF%B8%8F-FEEBE7?style=for-the-badge&labelColor=FF0000)](https://www.paypal.com/donate/?hosted_button_id=YZQDE3TEYDBWA)

`SubResourceIntegrity` is a zero-dependency Rollup plugin that adds Subresource Integrity (SRI)
attributes to your HTML files. SRI helps ensure the integrity of your external resources (e.g.,
scripts and stylesheets) by allowing browsers to verify that the fetched files are delivered without
unexpected manipulation.

## Features

- Zero runtime dependencies (since v2.0.0).
- Automatically calculates integrity hashes for resources `*.htm` and `*.html`.
- Supports multiple hashing algorithms (`sha256`, `sha384`, `sha512`).
- Integrates seamlessly into the Rollup build process.

## Installation

To use this plugin, install it via npm:

```bash
npm i -D @darcas/rollup-sub-resource-integrity
```

Or, if you're using yarn:

```bash
yarn add @darcas/rollup-sub-resource-integrity --dev
```

> **Note:** Since v2 the plugin has zero runtime dependencies — upgrading from v1 requires no code
> changes.

## Migrating from v1 to v2

No code changes are required: the plugin API and its usage stay identical.

What changed under the hood:

- **Zero runtime dependencies.** `cheerio` has been removed; installing the plugin no longer pulls
  in any package.
- **In-memory processing.** The hook moved from `writeBundle` (read/write from disk) to
  `generateBundle`, hashing resources directly from the bundle output.
- **`crossorigin="anonymous"` is added automatically** to every tag that receives an `integrity`
  attribute when missing, as browsers ignore SRI on cross-origin resources without it.
- **Node.js >= 18** is now required.

## Usage

In your `vite.config.mts` just add:

```ts
import SubResourceIntegrity from '@darcas/rollup-sub-resource-integrity';
import {defineConfig} from 'vite';

export default defineConfig({
    //..
    plugins: [
        //..
        SubResourceIntegrity(),
        //..
    ],
    //..
});
```

## How It Works

1. During the `generateBundle` phase, the plugin scans the emitted HTML assets in the bundle.
2. It looks for resource tags (`<script src>` and `<link rel="stylesheet|preload|modulepreload">`)
   whose URI matches a file in the same bundle.
3. For each match:
    - The content is taken from the in-memory bundle (no disk access) and hashed using the specified
      algorithm.
    - An `integrity` attribute is added to the tag.
    - A `crossorigin="anonymous"` attribute is added when missing, as browsers ignore `integrity` on
      cross-origin resources without it.
4. External URIs (`http(s):`, protocol-relative, `data:`) and resources missing from the bundle are
   silently skipped.

Zero runtime dependencies: HTML rewriting uses a targeted regex instead of a DOM parser.

## Configuration

The plugin accepts an optional parameter to specify the hashing algorithm. The default is `sha384`.

### Supported Algorithms

- `sha256`
- `sha384` (default)
- `sha512`

### Example

Using a custom algorithm:

```javascript
SubResourceIntegrity('sha512');
```

## Contributing

If you'd like to contribute to the project, feel free to fork it and create a pull request. Please
ensure that your changes are well-tested and properly documented.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.

---

Made with ❤️ by [Dario Casertano (DarCas)](https://casertano.name).

# SubResourceIntegrity

![NPM Last Update](https://img.shields.io/npm/last-update/%40darcas%2Frollup-sub-resource-integrity)
![NPM Version](https://img.shields.io/npm/v/%40darcas%2Frollup-sub-resource-integrity)
![NPM Downloads](https://img.shields.io/npm/dw/%40darcas%2Frollup-sub-resource-integrity)
![NPM License](https://img.shields.io/npm/l/%40darcas%2Frollup-sub-resource-integrity)

`SubResourceIntegrity` is a Rollup plugin that adds Subresource Integrity (SRI) attributes to your HTML files. SRI helps ensure the integrity of your external resources (e.g., scripts and stylesheets) by allowing browsers to verify that the fetched files are delivered without unexpected manipulation.

## Features

- Automatically calculates integrity hashes for resources `*.htm`. and `*.html`.
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

## Usage

In your `vite.config.mts` just add:

```ts
import SubResourceIntegrity from '@darcas/rollup-sub-resource-integrity';
import { defineConfig } from 'vite';

export default defineConfig({
    //..
    plugins: [
        //..
        SubResourceIntegrity('sha384'),
        //..
    ],
    //..
});
```

## How It Works

1. During the `writeBundle` phase, the plugin reads the HTML files in the output directory.
2. It scans for resource tags (`<script>` and `<link>` elements) with `src` or `href` attributes.
3. For each resource:
    - The file content is read and hashed using the specified algorithm.
    - An `integrity` attribute is added to the corresponding HTML element.
4. The updated HTML file is saved back to the output directory.

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

If you'd like to contribute to the project, feel free to fork it and create a pull request. Please ensure that your changes are well-tested and properly documented.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [Dario Casertano (DarCas)](https://github.com/DarCas).

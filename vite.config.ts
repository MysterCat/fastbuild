import process from 'node:process'

import { defineConfig } from 'vite-plus'

export default defineConfig({
  staged: {
    '*': ['vp check --fix', 'eslint --fix'],
  },
  lint: {
    ignorePatterns: ['types/**'],
  },
  fmt: {
    singleQuote: true,
    semi: false,
    sortPackageJson: false,
    linebreak: 'unix',
    arrowParens: 'avoid',
    ignorePatterns: ['types/**'],
  },
  pack: {
    entry: 'src/extension.ts',
    outDir: 'out',
    copy: [
      'node_modules/.pnpm/@commitlint+config-validator@21.0.1/node_modules/@commitlint/config-validator/lib/commitlint.schema.json',
    ],
    platform: 'node',
    format: 'es',
    sourcemap: process.env.BUILD_MODE === 'watch',
    minify: process.env.BUILD_MODE === 'package',
    deps: {
      onlyBundle: false,
      neverBundle: ['vscode'],
    },
  },
})

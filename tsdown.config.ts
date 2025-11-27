import path from 'node:path'
import process from 'node:process'

import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/extension.ts'],
  outDir: 'out',
  platform: 'node',
  sourcemap: true,
  outputOptions: {
    dir: path.resolve(import.meta.dirname, 'out'),
    format: 'es',
    preserveModules: true,
    preserveModulesRoot: 'src',
    inlineDynamicImports: false,
    entryFileNames(chunkInfo) {
      const filePath = path.resolve(chunkInfo.facadeModuleId!)
      const rootPath = path.resolve(process.cwd(), 'src')
      if (filePath.startsWith(rootPath)) {
        return `${filePath.replace(path.resolve(process.cwd(), 'src'), '').replace(/^\\|\.[^/.]+$/g, '')}.js`
      }
      return '[name].js'
    },
  },
  external: ['vscode', 'typescript'],
})

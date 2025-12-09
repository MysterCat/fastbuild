import type { Config } from 'release-it'
import type { PluginOptions } from './tools'

import { readFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'

import { assign } from 'radashi'

import commitlint from './commitlint.config'

/** 包名 */
const packageName = process.env.npm_package_name
/** 当前工作目录 */
const current = path.join(process.cwd())
/** 根目录 */
const root = path.join(import.meta.dirname)
/** 根目录 package.json */
const packageJsonPath = path.join(root, 'package.json')
/** 主包的名称 */
const { name } = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
/** 标签名称 */
const tagName = packageName === name ? `\${version}` : `${packageName}@\${version}`
/** 相对路径 */
const relative = path.relative(root, current)

export default assign({
  git: {
    tagName,
    commitMessage: `🔧 chore(release): 🔖${tagName}`,
  },
  npm: { publish: false },
  plugins: {
    './tools/index.js': {
      parserOpts: {
        headerPattern: /^(?:\p{Extended_Pictographic}\s+)?(\w*)(?:\((.*)\))?!?:\s(.*)$/u,
        breakingHeaderPattern: /^(?:\p{Extended_Pictographic}\s)?(\w*)(?:\((.*)\))?!:\s(.*)$/u,
      },
      preset: {
        name: 'conventionalcommits',
        types: Object.entries(commitlint.prompt?.questions?.type?.enum ?? {}).map(([key, value]) => ({ type: key, section: `${value.emoji} ${value.title}`.trim() })),
      },
      EOL: '\n',
      cwd: root,
      ignoreRecommendedBump: true,
      strictSemVer: true,
      infile: 'CHANGELOG.md',
      header: '# 更新日志',
      context: { isPatch: true },
      gitRawCommitsOpts: relative
        ? {
            path: relative,
            /** 当前版本 */
            from: process.env.npm_package_version,
          }
        : void 0,
    } as PluginOptions,
  },
} satisfies Config, {})

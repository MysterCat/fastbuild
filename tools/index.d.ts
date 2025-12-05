import type { GetCommitsParams, GetSemverTagsParams } from '@conventional-changelog/git-client'
import type { Context, Options } from 'conventional-changelog-writer'
import type { ParserStreamOptions } from 'conventional-commits-parser'
import type { Bumper } from 'conventional-recommended-bump'

export interface PluginOptions {
  /** ---------- 通用配置 ---------- */
  preset?: {
    name: 'angular' | 'atom' | 'codemirror' | 'ember' | 'eslint' | 'express' | 'jquery' | 'jscs'
  } | {
    name: 'conventionalcommits'
    types: {
      type: string
      scope?: string
      section?: string | undefined
      hidden?: boolean | undefined
    }[]
  }
  /**
   * @description 设置换行符
   * @default os.EOL
   */
  EOL?: '\n' | '\r\n'
  /**
   * @description git工作目录
   * @default process.cwd
   */
  cwd?: string

  /** ---------- Bump ---------- */
  /**
   * @description 上下文对象，传递给模板和函数调用
   */
  commitsOpts?: GetCommitsParams
  /**
   * @description 获取 semver 标签的参数
   */
  tagOpts?: GetSemverTagsParams | string
  /**
   * @description 自定义 bump 类型
   */
  whatBump?: false | Parameters<Bumper['bump']>[0]
  /**
   * @description 使用 true 可以忽略推荐的版本更新
   * @default false
   */
  ignoreRecommendedBump?: boolean
  /**
   * @description 使用 true 可以强制严格的 semver
   * @default false
   */
  strictSemVer?: boolean

  /** ---------- Changelog ---------- */
  /**
   * @description 设置 changelog 写入的文件名。如果文件不存在则创建并写入完整历史。
   * @description 未设置时，changelog 仅用于如 GitHub Releases 的发布说明。
   * @description 设置为 false 可禁用 changelog 写入（仅推荐下个版本号）。
   * @default undefined
   */
  infile?: string | false
  /**
   * @description 设置 changelog 的标题
   * @default '# Changelog'
   */
  header?: string
  context?: Context
  gitRawCommitsOpts?: GetCommitsParams
  parserOpts?: ParserStreamOptions
  writerOpts?: Options
}

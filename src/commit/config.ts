import type { RuleField } from '@commitlint/types'

import type { CommandConfig } from '../utils'

import { workspace } from 'vscode'

import { extendedName } from '../utils'

export type CommitType = RuleField | 'gitmoji' | 'breaking' | 'issues'

interface CommitConfig extends CommandConfig {
  /** 提交步骤 */
  step: Record<string, CommitType[]>
  /** 是否更新 gitmoji */
  updateGitmoji: boolean
  /** 作用域可选项 */
  scopes: string[]
  setScopes(value: string[]): void
}

/** 提交消息工具配置 */
export const commitConfig: CommitConfig = {
  key: 'commit',
  step: {
    default: ['type', 'scope', 'gitmoji', 'subject'],
    Angluar: ['type', 'scope', 'gitmoji', 'subject', 'body', 'footer'],
    all: ['type', 'scope', 'gitmoji', 'subject', 'body', 'breaking', 'issues'],
  },
  updateGitmoji: false,
  scopes: [],
  setScopes(value: string[]) {
    this.scopes = value
    workspace.getConfiguration(`${extendedName}.${this.key}`).update('scopes', value)
  },
}

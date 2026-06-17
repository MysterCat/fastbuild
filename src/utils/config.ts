import { workspace } from 'vscode'

import { quickCommandConfig } from '@/quick-command'
import { extendedName } from './constants'

export interface CommandConfig {
  /** 命令键 */
  key: string
}

/** 设置配置 */
function setConfig(config: CommandConfig) {
  const { key } = config
  Object.keys(config).forEach((v) => {
    const k = v as keyof CommandConfig
    if (k !== 'key') {
      config[k] = workspace
        .getConfiguration(`${extendedName}.${key}`)
        .get(`${v.replace(/([a-z])([A-Z])/g, '$1.$2').toLowerCase()}`, config[k])
    }
  })
}

/** 初始化配置 */
export function initConfig(...config: CommandConfig[]) {
  config.forEach(setConfig)
  workspace.onDidChangeConfiguration((e) => {
    if (e.affectsConfiguration(quickCommandConfig.key)) {
      setConfig(quickCommandConfig)
    }
  })
  return config
}

/** 更新配置 */
export function updateConfig<T extends CommandConfig>(config: T, key: keyof T, value?: string) {
  return workspace.getConfiguration(`${extendedName}.${config.key}`).update(key.toString(), value)
}

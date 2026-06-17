import type { CommandConfig } from '@/utils'

interface QuickCommandConfig extends CommandConfig {
  /** 配置 */
  config: Record<string, string>
  /** 最大构建数量 */
  maxNumber: number
}

/** 快速构建工具配置 */
export const quickCommandConfig: QuickCommandConfig = {
  key: 'quick-command',
  config: {},
  maxNumber: 1,
}

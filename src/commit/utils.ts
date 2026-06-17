import type { QualifiedConfig, RuleConfigSeverity } from '@commitlint/types'
import type { LintOptions } from '@commitlint/types/lib/lint'

import type { SelectItem } from '@/vscode'

import lint from '@commitlint/lint'
import dayjs from 'dayjs'
import { pick } from 'radashi'
import { extensions, Uri, workspace } from 'vscode'

import { extensionRoot, recursive } from '@/utils'
import { createInputBox, createSelect, vscodeButton } from '@/vscode'
import { commitConfig } from './config'

export interface Gitmoji {
  emoji: string
  entity: string
  code: string
  description: string
  name: string
  semver: string | null
}

/**
 * 读取gitmoji配置
 * @param fileName 文件名
 * @returns gitmoji配置
 */
export async function readGitmoji(fileName: 'gitmojis.zh.json' | 'gitmojis.json') {
  /** 获取配置 */
  const fileData = await workspace.fs.readFile(Uri.joinPath(extensionRoot, `public/${fileName}`))
  /** 解析内容 */
  const content = new TextDecoder('utf-8').decode(fileData)

  return JSON.parse(content) as { gitmojis: Gitmoji[], lastTime: string }
}

/** gitmoji配置文件数据 */
interface GitmojisFileData {
  gitmojis: Gitmoji[]
  lastTime: string
}

/** 获取gitmoji配置 */
export async function getGitmojis() {
  let fileData: GitmojisFileData = {
    gitmojis: [],
    lastTime: '',
  }

  /** 是否使用中文 */
  const zh
    = !commitConfig.updateGitmoji && extensions.getExtension('MS-CEINTL.vscode-language-pack-zh-hans')

  if (zh) {
    fileData = await readGitmoji('gitmojis.zh.json')
  }
  else {
    fileData = await readGitmoji('gitmojis.json')

    if (dayjs().isAfter(dayjs(fileData.lastTime).add(1, 'month'))) {
      fileData = await fetch('https://gitmoji.dev/api/gitmojis', { method: 'GET' }).then(
        res => res.json() as Promise<GitmojisFileData>,
      )

      fileData.lastTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

      await workspace.fs.writeFile(
        Uri.joinPath(extensionRoot, `public/gitmojis.json`),
        new TextEncoder().encode(`${JSON.stringify(fileData, null, 2)}\n`),
      )
    }
  }

  return fileData.gitmojis
}

type StepResult = Record<string, string> & {
  /** 步骤名称 */
  step: string
  /** 提交信息 */
  header?: string
  /** 提交类型 */
  type?: string
  /** 提交范围 */
  scope?: string
  /** 提交gitmoji */
  gitmoji?: string
  /** 提交主题 */
  subject?: string
  /** 提交主体 */
  body?: string
  /** 提交脚注 */
  footer?: string
  /** 重大变更 */
  breaking?: string
  /** 问题 */
  issues?: string
  /** 新增列表 */
  addList?: string
}

/** 基础处理函数 */
function baseHandler(
  stepResult: StepResult,
  stepName: string,
  step: string[],
  stepNumber: number,
  commitlintConfig?: QualifiedConfig,
  items?: SelectItem<string>[],
) {
  return {
    step: stepNumber + 1,
    totalSteps: step.length,
    ignoreFocusOut: true,
    buttons: [
      stepNumber === -1 ? vscodeButton.none : vscodeButton.left,
      stepNumber === step.length - 1 ? vscodeButton.confirm : vscodeButton.right,
    ],
    value: items ? void 0 : stepResult[stepName],
    /** 过滤规则 */
    get rules() {
      if (!commitlintConfig) {
        return {}
      }

      return pick(commitlintConfig.rules, (_, k) => {
        const value = k.toString()
        if (stepName === 'header') {
          return (
            value.startsWith('header')
            || value.startsWith('type')
            || value.startsWith('scope')
            || value.startsWith('subject')
          )
        }
        if (stepName === 'subject') {
          return value.startsWith('subject')
        }
        if (stepName === 'body') {
          return value.startsWith('body')
        }
        if (stepName === 'footer') {
          return (
            value.startsWith('footer')
            || ['breaking-change-exclamation-mark', 'references-empty', 'trailer-exists'].includes(
              value,
            )
          )
        }
        if (stepName === 'breaking') {
          return value.startsWith('footer') || ['breaking-change-exclamation-mark'].includes(value)
        }
        if (stepName === 'issues') {
          return (
            value.startsWith('footer') || ['references-empty', 'trailer-exists'].includes(value)
          )
        }

        return false
      })
    },
    /** 解析器选项 */
    get parserOpts() {
      if (!commitlintConfig) {
        return {}
      }

      return commitlintConfig.parserPreset?.parserOpts as LintOptions['parserOpts']
    },
    async validate(v: string) {
      let value = v

      if (!commitlintConfig) {
        return
      }

      const rules = this.rules
      const parserOpts = this.parserOpts

      if (
        stepName === 'header'
        && parserOpts?.headerPattern?.test
        && !parserOpts.headerPattern.test(value)
      ) {
        return 'header format is invalid'
      }
      if (stepName === 'subject') {
        /** type(scope): subject */
        value = `${stepResult.type}: ${v}`
      }
      if (stepName === 'body') {
        /**
         * type(scope): subject
         *
         * body
         */
        value = `${stepResult.type}: ${stepResult.subject}\n\n${v}`
      }
      if (stepName === 'footer') {
        /**
         * type(scope): subject
         *
         * body
         *
         * footer
         */
        value = `${stepResult.type}: ${stepResult.subject}\n\n${stepResult.body}\n\n${v}`
      }
      if (stepName === 'breaking') {
        /**
         * type(scope): subject
         *
         * body
         *
         * breaking
         */
        value = `${stepResult.type}: ${stepResult.subject}\n\n${stepResult.body}\n\n${v}`
      }
      if (stepName === 'issues' && value && !/^\d+$/.test(value)) {
        return 'issues format is invalid'
      }
      if (stepName === 'issues') {
        /**
         * type(scope): subject
         *
         * body
         *
         * issues
         */
        value = `${stepResult.type}: ${stepResult.subject}\n\n${stepResult.body}\n\n${v}`
      }

      const outcome = await lint(value, rules, {
        defaultIgnores: commitlintConfig.defaultIgnores,
        helpUrl: commitlintConfig.helpUrl,
        ignores: commitlintConfig.ignores,
        parserOpts,
        plugins: commitlintConfig.plugins,
      })

      if (outcome.errors.length > 0) {
        return outcome.errors.at(0)?.message
      }

      return void 0
    },
    items,
    get activeItems() {
      return items?.flatMap(item => (item.label === stepResult[stepName] ? [item.label] : []))
    },
  }
}

const stepHandlers = {
  step(stepResult: StepResult, step: string[], stepNumber: number) {
    const items: SelectItem<string>[] = Object.entries(commitConfig.step).map(
      ([label, list]) =>
        ({
          label,
          value: label,
          description: label === stepResult.step ? '上次使用' : void 0,
          detail: list.join(', '),
        }) satisfies SelectItem<string>,
    )
    const baseConfig = baseHandler(stepResult, 'step', step, stepNumber, void 0, items)

    return createSelect({
      ...baseConfig,
      title: '请选择步骤名称',
      placeholder: '请选择步骤名称',
      items,
    })
  },
  header(
    stepResult: StepResult,
    step: string[],
    stepNumber: number,
    commitlintConfig: QualifiedConfig,
  ) {
    const baseConfig = baseHandler(stepResult, 'header', step, stepNumber, commitlintConfig)

    return createInputBox({
      ...baseConfig,
      title: '请输入提交头',
      placeholder: commitlintConfig.prompt?.questions?.header?.description ?? '请输入提交头',
    })
  },
  type(
    stepResult: StepResult,
    step: string[],
    stepNumber: number,
    commitlintConfig: QualifiedConfig,
  ) {
    /** 是否在提交头中显示类型emoji */
    const emojiInHeader = commitlintConfig.prompt?.questions?.type?.emojiInHeader
    const items: SelectItem<string>[] = Object.entries(
      commitlintConfig.prompt?.questions?.type?.enum ?? [],
    ).map(
      ([k, v]) =>
        ({
          label: emojiInHeader && v.emoji ? `${v.emoji} ${k}` : k,
          get value() {
            return this.label
          },
          description: v.title,
          detail: v.description,
        }) satisfies SelectItem<string>,
    )

    const baseConfig = baseHandler(stepResult, 'type', step, stepNumber, commitlintConfig, items)

    return createSelect({
      ...baseConfig,
      title: '请选择提交类型',
      placeholder: commitlintConfig.prompt?.questions?.type?.description ?? '请选择提交类型',
      items,
    })
  },
  async scope(
    stepResult: StepResult,
    step: string[],
    stepNumber: number,
    commitlintConfig: QualifiedConfig,
  ) {
    const items: SelectItem<string>[] = [
      {
        label: '无',
        value: '',
        detail: '无作用域。',
        description: void 0,
        alwaysShow: true,
      },
      ...commitConfig.scopes.map(label => ({
        label,
        value: label,
        detail: '从工作区配置文件中加载。',
        description: void 0,
      })),
      ...(() => {
        const [level, condition, value] = commitlintConfig?.rules?.['scope-enum'] ?? []
        if (
          level === (2 as RuleConfigSeverity.Error)
          && condition === 'always'
          && Array.isArray(value)
        ) {
          return value.map(label => ({
            label,
            value: label,
            detail: '从 commitlint 配置文件中加载。',
            description: void 0,
          }))
        }

        return []
      })(),
      {
        label: '新作用域',
        value: 'newScope',
        detail: '创建新作用域。（可以在工作区的 `settings.json` 中管理）',
        description: void 0,
        alwaysShow: true,
      },
      {
        label: '新作用域（仅用一次）',
        value: 'onceScope',
        detail: '使用新作用域。（不会加入工作区的 `settings.json`）',
        description: void 0,
        alwaysShow: true,
      },
    ]

    const baseConfig = baseHandler(stepResult, 'scope', step, stepNumber, commitlintConfig, items)

    const result = await createSelect({
      ...baseConfig,
      title: '请选择提交范围',
      placeholder: commitlintConfig.prompt?.questions?.scope?.description ?? '请选择提交范围',
      items,
      canAdd: true,
      addCheck(item) {
        return item.value === 'newScope' || item.value === 'onceScope'
      },
    })

    if (result?.value === 'newScope') {
      stepResult.addList = 'scope'
    }
    if (result?.value) {
      return result.custom
    }
    else {
      return result?.custom
    }
  },
  async gitmoji(
    stepResult: StepResult,
    step: string[],
    stepNumber: number,
    commitlintConfig: QualifiedConfig,
  ) {
    const gitmojis = await getGitmojis()
    const items: SelectItem<string>[] = [
      {
        label: '无',
        value: '',
        detail: '无 gitmoji。',
        alwaysShow: true,
      },
      ...gitmojis.map((item) => {
        return {
          label: item.emoji,
          value: item.emoji,
          description: item.description,
          detail: item.code,
        }
      }),
    ]

    const baseConfig = baseHandler(stepResult, 'gitmoji', step, stepNumber, commitlintConfig, items)

    return createSelect({
      ...baseConfig,
      title: '请选择Gitmoji',
      placeholder: '请选择Gitmoji',
      items,
    })
  },
  subject(
    stepResult: StepResult,
    step: string[],
    stepNumber: number,
    commitlintConfig: QualifiedConfig,
  ) {
    const baseConfig = baseHandler(stepResult, 'subject', step, stepNumber, commitlintConfig)

    return createInputBox({
      ...baseConfig,
      title: '请输入提交主题',
      placeholder: commitlintConfig.prompt?.questions?.subject?.description ?? '请输入提交主题',
    })
  },
  body(
    stepResult: StepResult,
    step: string[],
    stepNumber: number,
    commitlintConfig: QualifiedConfig,
  ) {
    const baseConfig = baseHandler(stepResult, 'body', step, stepNumber, commitlintConfig)

    return createInputBox({
      ...baseConfig,
      title: '请输入提交主体',
      placeholder: commitlintConfig.prompt?.questions?.body?.description ?? '请输入提交主体',
      canMultiline: true,
    })
  },
  footer(
    stepResult: StepResult,
    step: string[],
    stepNumber: number,
    commitlintConfig: QualifiedConfig,
  ) {
    const baseConfig = baseHandler(stepResult, 'footer', step, stepNumber, commitlintConfig)

    return createInputBox({
      ...baseConfig,
      title: '请输入提交脚注',
      placeholder: commitlintConfig.prompt?.questions?.footer?.description ?? '请输入提交脚注',
      canMultiline: true,
    })
  },
  breaking(
    stepResult: StepResult,
    step: string[],
    stepNumber: number,
    commitlintConfig: QualifiedConfig,
  ) {
    const baseConfig = baseHandler(stepResult, 'breaking', step, stepNumber, commitlintConfig)

    return createInputBox({
      ...baseConfig,
      title: '请输入重大变更',
      placeholder: commitlintConfig.prompt?.questions?.breaking?.description ?? '请输入重大变更',
      canMultiline: true,
    })
  },
  issues(
    stepResult: StepResult,
    step: string[],
    stepNumber: number,
    commitlintConfig: QualifiedConfig,
  ) {
    const baseConfig = baseHandler(stepResult, 'issues', step, stepNumber, commitlintConfig)

    return createInputBox({
      ...baseConfig,
      title: '请输入关联问题',
      placeholder: commitlintConfig.prompt?.questions?.issues?.description ?? '请输入关联问题',
      canMultiline: true,
    })
  },
}

const defaultStepResult = {
  step: 'default',
  header: '',
  type: '',
  scope: '',
  gitmoji: '',
  subject: '',
  body: '',
  footer: '',
  breaking: '',
  issues: '',
  addList: '',
}

/** 执行步骤递归 */
export const runStep = recursive(
  async (
    self,
    commitlintConfig: QualifiedConfig,
    initResult: StepResult,
    stepNumber: number = -1,
  ): Promise<StepResult | void> => {
    const stepResult: StepResult = {
      ...defaultStepResult,
      ...initResult,
    }

    /** 获取步骤列表 */
    const stepList = commitConfig.step[stepResult.step] ?? []
    /** 初始化步骤配置 */
    const stepConfig = {
      header:
        stepList.includes('header')
        && (!stepList.includes('type')
          || !stepList.includes('scope')
          || !stepList.includes('gitmoji')
          || !stepList.includes('subject')),
      type: stepList.includes('type'),
      scope: stepList.includes('scope'),
      gitmoji: stepList.includes('gitmoji'),
      subject: stepList.includes('subject'),
      body: stepList.includes('body'),
      footer:
        stepList.includes('footer')
        && (!stepList.includes('breaking') || !stepList.includes('issues')),
      breaking: stepList.includes('breaking'),
      issues: stepList.includes('issues'),
    }
    /** 将执行的步骤列表 */
    const step = Object.keys(pick(stepConfig, v => v))
    /** 如果步骤已完成 */
    if (stepNumber >= step.length) {
      return stepResult
    }

    /** 获取步骤名称 */
    const stepName = (stepNumber === -1 ? 'step' : step[stepNumber]) as keyof typeof stepHandlers

    /** 获取步骤处理函数 */
    const handler = stepHandlers[stepName]

    /** 步骤值 */
    const value = await handler(stepResult, step, stepNumber, commitlintConfig)

    if (value === void 0) {
      return
    }
    if (value === vscodeButton.left) {
      return self(commitlintConfig, stepResult, stepNumber - 1)
    }

    /** 更新步骤结果 */
    stepResult[stepName] = value as string

    return self(commitlintConfig, stepResult, stepNumber + 1)
  },
)

import type { InputBoxValidationMessage, QuickInputButton } from 'vscode'

import { window } from 'vscode'

import { vscodeButton } from './vscodeButton'

export interface BaseOption {
  /** 标题 */
  title?: string
  /** 当前步骤 */
  step?: number
  /** 总步骤数 */
  totalSteps?: number
  /** 是否启用 */
  enabled?: boolean
  /** 是否繁忙 */
  busy?: boolean
  /** 是否忽略焦点外 */
  ignoreFocusOut?: boolean
}

export interface InputOption extends BaseOption {
  /** 输入值 */
  value?: string
  /** 可以换行 */
  canMultiline?: boolean
  /** 输入值选择范围 */
  valueSelection?: [number, number]
  /** 提示信息 */
  prompt?: string
  /** 占位符 */
  placeholder?: string
  /** 是否密码 */
  password?: boolean
  /** 按钮 */
  buttons?: readonly QuickInputButton[]
  /** 验证输入 */
  validate?(
    value: string,
  ):
    | string
    | InputBoxValidationMessage
    | undefined
    | null
    | Thenable<string | InputBoxValidationMessage | undefined | null>
}

/**
 * 创建输入框
 * @param options 输入框选项
 */
export function createInputBox(
  options: InputOption & {
    buttons?: undefined
  },
): Thenable<string | undefined>
/**
 * 创建输入框(带按钮)
 * @param options 输入框选项
 */
export function createInputBox<T extends string | QuickInputButton>(
  options: InputOption,
): Thenable<T | undefined>
export function createInputBox(
  options: InputOption,
): Thenable<string | QuickInputButton | undefined> {
  return new Promise((resolve) => {
    const input = window.createInputBox()
    input.title = options.title
    input.step = options.step
    input.totalSteps = options.totalSteps
    input.enabled = options.enabled ?? true
    input.busy = options.busy ?? false
    input.ignoreFocusOut = options.ignoreFocusOut ?? false

    input.value = options.value ?? ''
    input.valueSelection = options.valueSelection
    input.prompt = options.prompt
    input.placeholder = options.placeholder
    input.password = options.password ?? false
    input.buttons = options.buttons ?? []

    /** 返回输入值 */
    let value: string | QuickInputButton | undefined = input.value
    /** 多行输入值 */
    const multilineValue: string[] = []
    /** 是否取消输入 */
    let cancel = true

    input.onDidChangeValue(async (v) => {
      input.busy = true
      const result = await options.validate?.(v)
      input.busy = false
      input.validationMessage = result ?? void 0
      value = result ? void 0 : v
    })

    input.onDidTriggerButton(async (button) => {
      if (
        [vscodeButton.right, vscodeButton.confirm].includes(button)
        && input.validationMessage === void 0
      ) {
        const result = await options.validate?.(input.value)
        input.validationMessage = result ?? void 0
        value = input.value
      }
      else if (button === vscodeButton.left) {
        value = button
        input.validationMessage = void 0
      }

      cancel = false
      if (!input.validationMessage) {
        input.hide()
      }
    })

    input.onDidAccept(async () => {
      const result = await options.validate?.(input.value)
      input.validationMessage = result ?? void 0
      cancel = false
      if (!input.validationMessage) {
        value = input.value
        input.hide()
      }
    })

    input.onDidHide(async () => {
      if (cancel) {
        value = void 0
      }
      if (typeof value === 'string' && options.canMultiline) {
        multilineValue.push(value)
        const needLine = await window.showQuickPick(['否', '是'], {
          title: '换行输入',
          placeHolder: '是否继续输入?',
        })
        if (needLine === '是') {
          input.value = ''
          input.title = `${options.title}（${multilineValue.length + 1}行）`
          input.show()
          return
        }
        else {
          value = multilineValue.join('\n')
        }
      }
      resolve(value)
      input.dispose()
    })

    input.show()
  })
}

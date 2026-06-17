import type { QuickInputButton, QuickPickItem } from 'vscode'

import type { BaseOption } from './createInputBox'

import { window } from 'vscode'

import { createInputBox } from './createInputBox'
import { vscodeButton } from './vscodeButton'

interface BaseSelectOption<T = any> extends BaseOption {
  /** 选择值 */
  value?: string
  /** 占位符 */
  placeholder?: string
  /** 提示信息 */
  prompt?: string
  /** 是否可以添加 */
  canAdd?: boolean
  /** 自定义添加检查 */
  addCheck?(item: SelectItem<T>): boolean
  /** 按钮 */
  buttons?: readonly QuickInputButton[]
  /** 是否可以多选 */
  canSelectMany?: boolean
  /** 是否匹配描述 */
  matchOnDescription?: boolean
  /** 是否匹配详细 */
  matchOnDetail?: boolean
  /** 是否保持滚动位置 */
  keepScrollPosition?: boolean
  /** 选择项 */
  items: readonly (string | SelectItem<T>)[]
  /** 活动选择项 */
  activeItems?: readonly string[]
  /** 选中项 */
  selectedItems?: readonly string[]
}

export type SelectOption<T = any> = BaseSelectOption<T>
  & (
    | { canAdd?: false, canSelectMany?: false }
    | { canAdd: true, canSelectMany?: false }
    | { canAdd?: false, canSelectMany: true }
  )

export type SelectItem<T = undefined> = QuickPickItem
  & ([T] extends [undefined]
    ? {
        /** 选择值 */
        value?: T
      }
    : {
        /** 选择值 */
        value: T
      })

/** 是否是字符串数组选择项 */
type ArrayResult<T extends SelectOption> = T extends SelectOption & { items: readonly string[] }
  ? string
  : T extends SelectOption & { items: readonly { value: infer R }[] }
    ? R
    : string
/** 选择结果 */
type SelectResult<T extends SelectOption> = T extends { canSelectMany: true }
  ? T extends SelectOption & { buttons?: never[] }
    ? ArrayResult<T>[]
    : ArrayResult<T>[] | QuickInputButton
  : T extends SelectOption & { canAdd: true }
    ? T extends SelectOption & { buttons?: never[] }
      ? {
          value?: ArrayResult<T>
          custom: string | ArrayResult<T>
        }
      : {
          value?: ArrayResult<T>
          custom: string | ArrayResult<T> | QuickInputButton
        }
    : T extends SelectOption & { buttons?: never[] }
      ? ArrayResult<T>
      : ArrayResult<T> | QuickInputButton

/**
 * 创建选择框
 * @param options 选择框选项
 */
export function createSelect<T extends SelectOption>(
  options: T,
): Thenable<SelectResult<T> | undefined>
export function createSelect<T = any>(
  options: SelectOption<T>,
): Thenable<
  T | T[] | QuickInputButton | { value?: T, custom: string | QuickInputButton } | undefined
> {
  return new Promise((resolve) => {
    const select = window.createQuickPick<SelectItem<T>>()
    select.title = options.title
    select.step = options.step
    select.totalSteps = options.totalSteps
    select.enabled = options.enabled ?? true
    select.busy = options.busy ?? false
    select.ignoreFocusOut = options.ignoreFocusOut ?? false

    const custom = Symbol('custom')
    const items = [...options.items]
    if (!options.canSelectMany && options.canAdd && !options.addCheck) {
      items.push({
        label: '自定义选项',
        description: '允许自定义输入选项',
        value: custom as T,
      })
    }
    select.items = items.map((item) => {
      if (typeof item === 'string') {
        return {
          label: item,
          value: item as T,
        }
      }
      if (item.value === void 0) {
        item.value = item.label as T
      }
      return item
    })
    select.value = options.value ?? ''
    select.placeholder = options.placeholder
    select.prompt = options.prompt
    select.buttons = options.buttons ?? []
    select.canSelectMany = options.canSelectMany ?? false
    select.matchOnDescription = options.matchOnDescription ?? false
    select.matchOnDetail = options.matchOnDetail ?? false
    select.keepScrollPosition = options.keepScrollPosition ?? false
    const activeItems = new Set(options.activeItems)
    select.activeItems = activeItems.size
      ? select.items.filter(item => activeItems.has(item.label))
      : select.items.slice(0, 1)
    const selectedItems = new Set(options.selectedItems)
    select.selectedItems = select.items.filter(item => selectedItems.has(item.label))

    /** 选择值 */
    let value:
      | T
      | T[]
      | QuickInputButton
      | { value?: T, custom: string | QuickInputButton }
      | undefined = void 0
    /** 是否取消选择 */
    let cancel = true

    const setValue = (selectedItems: readonly SelectItem<T>[]) => {
      let items: readonly SelectItem<T>[]
      if (selectedItems.length) {
        items = selectedItems
      }
      else {
        items = select.activeItems
      }
      if (select.canSelectMany) {
        value = items.map(item => item.value!)
      }
      else {
        value = items.at(0)?.value
      }
    }

    select.onDidChangeSelection(setValue)

    select.onDidTriggerButton(async (button) => {
      if ([vscodeButton.right, vscodeButton.confirm].includes(button)) {
        setValue(select.selectedItems)
      }
      else if (button === vscodeButton.left) {
        value = button
      }

      cancel = false
      select.hide()
    })

    select.onDidAccept(() => {
      cancel = false
      setValue(select.selectedItems)
      select.hide()
    })

    select.onDidHide(async () => {
      if (cancel) {
        value = void 0
      }
      const selectedItem = select.selectedItems.at(0)
      if (
        !select.canSelectMany
        && options.canAdd
        && selectedItem
        && (selectedItem.value === custom || options.addCheck?.(selectedItem))
      ) {
        const text = await createInputBox({
          title: '请输入要添加的值',
          placeholder: '请输入要添加的值',
          step: select.step,
          totalSteps: select.totalSteps,
          enabled: select.enabled,
          busy: select.busy,
          ignoreFocusOut: select.ignoreFocusOut,
          prompt: select.prompt,
          buttons: select.buttons,
        })
        if (text === void 0) {
          value = text
        }
        else {
          value = {
            value: selectedItem.value as T,
            custom: text!,
          }
        }
      }
      else if (options.canAdd && !options.canSelectMany) {
        value = {
          custom: value as string | QuickInputButton,
        }
      }
      resolve(value)
      select.dispose()
    })

    select.show()
  })
}

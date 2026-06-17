import type { QuickInputButton } from 'vscode'

import { QuickInputButtons, ThemeIcon } from 'vscode'

/** vscode按钮对象 */
export const vscodeButton: Record<
  'none' | 'left' | 'right' | 'cancel' | 'confirm',
  QuickInputButton
> = {
  none: {
    iconPath: new ThemeIcon('none'),
  },
  left: QuickInputButtons.Back,
  right: {
    iconPath: new ThemeIcon('arrow-right'),
    tooltip: '下一步',
  },
  cancel: {
    iconPath: new ThemeIcon('close'),
    tooltip: '取消',
  },
  confirm: {
    iconPath: new ThemeIcon('check'),
    tooltip: '确认',
  },
}

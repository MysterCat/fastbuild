import type { ExtensionContext } from 'vscode'

import { commands } from 'vscode'

import { quickCommand } from './quick-command'
import { extendedName } from './utils'

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand(`${extendedName}.quick-command`, quickCommand),
  )
}

export function deactivate() {}

import type { ExtensionContext } from 'vscode'

import { commands } from 'vscode'

import { commit } from './commit'
import { quickCommand } from './quick-command'
import { extendedName } from './utils'

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand(`${extendedName}.quick-command`, quickCommand),
    commands.registerCommand(`${extendedName}.commit`, commit),
  )
}

export function deactivate() {}

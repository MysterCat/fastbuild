import { displayName, name, publisher } from 'root/package.json'

import { extensions, Uri } from 'vscode'

import { createLog } from '@/vscode'

/** 扩展名称 */
export const extendedName = name

/** 日志 */
export const logs = createLog(displayName)

/** 扩展根目录 */
export const extensionRoot = Uri.file(
  extensions.getExtension(`${publisher}.${name}`)!.extensionPath,
)

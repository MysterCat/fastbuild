import type { Disposable, TabInputText, TextDocument } from 'vscode'

import { Buffer } from 'node:buffer'

import { languages, Uri, window, workspace } from 'vscode'

import { extendedName, extensionRoot } from '@/utils'

/** 是否正在等待用户确认 */
let waiting = false
/** 询问用户是否要执行当前命令 */
async function askCommand(doc: TextDocument) {
  if (waiting) {
    return null
  }
  waiting = true
  /** 询问用户是否要执行当前命令 */
  const result = await window.showInformationMessage(
    '是否要执行当前命令？',
    { modal: true },
    '执行命令',
    '继续编辑',
  )
  waiting = false
  if (result === '执行命令') {
    return doc.getText()
  }
  if (result === '继续编辑') {
    return null
  }

  return void 0
}

/**
 * 创建缓存的shell脚本
 * @param fileName 脚本文件名
 * @param data 缓存文件内容
 */
export async function createCacheShell(fileName: string, data: string) {
  /** 创建临时文件 */
  const uri = Uri.joinPath(extensionRoot, `.${extendedName}`, fileName)
  /** 写入文件 */
  await workspace.fs.writeFile(uri, Buffer.from(data))
  /** 打开文件 */
  const doc = await languages.setTextDocumentLanguage(
    await workspace.openTextDocument(uri),
    'shellscript',
  )
  /** 显示文件 */
  await window.showTextDocument(doc)
  /** 保存文件 */
  await doc.save()

  /** 注册事件监听 */
  const disposables: Disposable[] = []

  return new Promise<string | void>((resolve) => {
    askCommand(doc).then((text) => {
      if (text !== null) {
        resolve(text)
        disposables.forEach(d => d.dispose())
      }
    })
    disposables.push(
      /** 监听文件保存事件 */
      workspace.onDidSaveTextDocument(async (e) => {
        if (e.uri.path === uri.path) {
          const text = await askCommand(doc)
          if (text !== null) {
            resolve(text)
            disposables.forEach(d => d.dispose())
          }
        }
      }),
      /** 监听文件关闭事件 */
      window.tabGroups.onDidChangeTabs((tab) => {
        if (tab.closed.some(v => v.label === fileName)) {
          resolve(void 0)
          disposables.forEach(d => d.dispose())
        }
      }),
    )
  }).finally(async () => {
    const tab = window.tabGroups.activeTabGroup.activeTab
    const input = tab?.input as TabInputText
    if (input.uri.fsPath === doc.uri.fsPath) {
      /** 关闭文件 */
      await window.tabGroups.close(tab!)
    }
    /** 删除文件 */
    await workspace.fs.delete(doc.uri)
  })
}

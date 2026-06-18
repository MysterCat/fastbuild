import type { LintOptions } from '@commitlint/types'

import type { GitExtension } from 'types/git'

import type { SourceControl } from 'vscode'

import commitlintLoad from '@commitlint/load'
import { loadConfig } from '@commitlint/load/lib/utils/load-config'
import { commands, extensions, Position, Uri, window, workspace } from 'vscode'

import { extensionRoot, initConfig, logs, readConfig, updateConfig, writeConfig } from '@/utils'
import { commitConfig } from './config'
import { runStep } from './utils'

export async function commit(source: SourceControl) {
  initConfig(commitConfig)

  /** 获取工作区 */
  const gitUri = source.rootUri!

  /** 获取 git 扩展 */
  const vscodeGit = extensions.getExtension<GitExtension>('vscode.git')
  /** 获取仓库 */
  const repository = vscodeGit?.isActive
    ? (await vscodeGit.activate()).getAPI(1).getRepository(gitUri)
    : null

  if (!repository) {
    logs.warn(`仓库不存在`)
    return
  }

  if (
    repository.state.indexChanges.length === 0
    && repository.state.workingTreeChanges.length === 0
  ) {
    logs.warn(`没有变更`)
    return
  }

  /** 获取默认配置 */
  let commitlintConfig = await commitlintLoad({}, { cwd: extensionRoot.fsPath })
  if (await loadConfig(gitUri.fsPath)) {
    /** 获取工作区配置 */
    commitlintConfig = await commitlintLoad({}, { cwd: gitUri.fsPath })
  }

  /** 获取默认步骤 */
  const defaultStep = await readConfig('defaultStep', gitUri.path)

  /** 初始化结果 */
  const result = await runStep(commitlintConfig, {
    step: defaultStep,
  })

  if (!result) {
    logs.warn(`取消执行步骤`)
    return
  }

  let { header, type, scope, gitmoji, subject, body, footer, breaking, issues, addList } = result

  /** 提交信息 */
  const messageList: string[] = []

  const parserOpts = commitlintConfig.parserPreset?.parserOpts as LintOptions['parserOpts']

  /** 如果有提交头 */
  if (header) {
    messageList.push(header)
  }
  else {
    /** 如果没有范围，范围为空字符串 */
    scope = scope ? `(${scope})` : ''
    messageList.push(`${type}${scope}: ${gitmoji}${subject}`)
  }

  /** 如果有提交内容 */
  if (body) {
    messageList.push('', body)
  }

  /** 如果有提交脚注 */
  if (footer) {
    messageList.push('', footer)
  }
  else if (breaking || issues) {
    messageList.push('')

    /** 如果有重大变更 */
    if (breaking) {
      /** 重大变更关键词 */
      const noteKeyword = parserOpts?.noteKeywords?.[0].toString() ?? 'BREAKING CHANGE'

      messageList.push(`${noteKeyword}: ${breaking}`)
    }
    /** 如果有关闭的issue */
    if (issues) {
      /** 关闭的issue关键词 */
      const issuePrefix = parserOpts?.issuePrefixes?.at(0)?.toString() ?? '#'
      /** 关闭的issue */
      const issuesList = issues.split('\n').map(item => `${issuePrefix}${item.trim()}`)
      /** 关闭的issue字符串 */
      const fix = issuesList.join(', ')

      messageList.push(`ISSUES CLOSED: ${fix}`)
    }
  }

  /** 提交信息 */
  const message = messageList.join('\n')

  if (addList && scope) {
    commitConfig.scopes.push(scope)
    /** 更新范围 */
    await updateConfig(commitConfig, 'scopes', commitConfig.scopes)
  }

  /** 如果没有变更，全部添加 */
  if (repository.state.indexChanges.length === 0) {
    await commands.executeCommand('git.stageAll')
  }

  if (commitConfig.push) {
    /** 设置提交信息 */
    source.inputBox.value = ''

    /** 提交信息文件位置 */
    const commitUri = Uri.joinPath(gitUri, '.git', 'COMMIT_EDITMSG')

    /** 监听提交信息文件打开 */
    const disposable = window.tabGroups.onDidChangeTabs(async (e) => {
      for (const tab of e.opened) {
        /** 提交信息文件 */
        const input = tab.input as { uri: Uri }
        /** 如果是提交信息文件 */
        if (input.uri.fsPath === commitUri.fsPath) {
          /** 打开提交信息文件 */
          const doc = await workspace.openTextDocument(commitUri)
          const editor = await window.showTextDocument(doc)
          /** 编辑提交信息文件 */
          await editor.edit((editBuilder) => {
            const text = doc.getText()
            if (!text.startsWith(message)) {
              editBuilder.insert(new Position(0, 0), message)
            }
          })
          /** 保存提交信息文件 */
          await doc.save()
        }
      }
    })

    /** 提交 */
    await commands.executeCommand('git.commit')

    /** 取消监听 */
    disposable.dispose()
  }
  else {
    /** 设置提交信息 */
    source.inputBox.value = message
  }

  /** 如果没有提交 */
  if (repository.state.indexChanges.length > 0) {
    source.inputBox.value = message
  }
  else {
    logs.info(`提交信息:`)
    logs.append(message)
  }

  /** 设置默认步骤 */
  writeConfig('steps', result.step, gitUri.path)
}

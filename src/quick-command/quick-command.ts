import type { GitExtension } from 'types/git'

import type { Uri } from 'vscode'

import type { SelectItem } from '@/vscode'

import { execSync } from 'node:child_process'
import { EOL } from 'node:os'
import path from 'node:path'

import { extensions, FileType, window, workspace } from 'vscode'

import { getOSType, initConfig, logs, readConfig, writeConfig } from '@/utils'
import { createCacheShell, createInputBox, createSelect } from '@/vscode'
import { quickCommandConfig } from './config'

export async function quickCommand(resource: Uri) {
  initConfig(quickCommandConfig)

  /** 匹配资源 */
  const workspaceFolder = workspace.getWorkspaceFolder(resource)!

  /** 获取 git 扩展 */
  const vscodeGit = extensions.getExtension<GitExtension>('vscode.git')
  /** 获取仓库 */
  const repository = vscodeGit?.isActive
    ? (await vscodeGit.activate()).getAPI(1).getRepository(resource)
    : null
  /** 获取路径状态 */
  const stat = await workspace.fs.stat(resource)

  /** 获取配置 */
  const commands = Object.entries(quickCommandConfig.config)
    .filter(([, value]) => {
      /** 如果命令需要仓库，判断是否有仓库存在 */
      if (value.includes(`$branch`) || value.includes(`$commit`)) {
        return !!repository
      }

      /** 如果命令需要文件路径，判断当前路径是否是文件 */
      if (value.includes(`$file`)) {
        return stat.type === FileType.File
      }
      return true
    })
    .map(
      ([detail, label]) =>
        ({
          label,
          detail,
        }) satisfies SelectItem,
    )

  if (commands.length === 0) {
    logs.warn('未配置快速命令')
    return
  }

  /** 选择要执行的命令 */
  const command = await createSelect({
    title: '选择要执行的命令',
    placeholder: '请选择要执行的命令',
    ignoreFocusOut: true,
    matchOnDescription: true,
    items: commands,
  })

  if (command === void 0) {
    logs.warn('未选择快速命令')
    return
  }

  const OSType = getOSType()
  const profiles = workspace.getConfiguration(`terminal.integrated.profiles.${OSType}`)

  const shellList = Object.keys(profiles).filter(
    key => !['has', 'get', 'update', 'inspect'].includes(key),
  )

  const defaultShell = await readConfig('defaultShell', command)

  /** 选择终端 */
  const shellName = await createSelect({
    title: '选择终端',
    placeholder: '选择终端',
    get activeItems() {
      return shellList.filter(key => key === defaultShell)
    },
    ignoreFocusOut: true,
    matchOnDescription: true,
    items: shellList,
  })

  if (shellName === void 0) {
    logs.warn('未选择终端')
    return
  }

  let shellPath = profiles.get<string | string[]>(`${shellName}.path`)

  if (Array.isArray(shellPath)) {
    const shellPathList = shellPath
    shellPath = shellPathList.at(-1)
  }
  else if (profiles.get<string>(`${shellName}.source`)) {
    if (OSType === 'windows' && shellName === 'Git Bash') {
      shellPath = path.join(execSync(`where git`, {}).toString().trim(), '../../bin/bash.exe')
    }
    else {
      const shellPathList = execSync(`${OSType === 'windows' ? 'where' : 'which'} ${shellName}`, {})
        .toString()
        .trim()
        .split(EOL)
      shellPath = shellPathList.at(-1)
    }
  }

  if (shellPath === void 0) {
    logs.warn('未找到终端路径')
    return
  }

  /** 获取所有以快速命令开头的终端 */
  const list = window.terminals.filter(v => /^快速命令(?:-\d+)?$/.test(v.name))
  /** 获取当前下标 */
  const index = list.length
  /** 如果已经存在默认终端, 则附带下标 */
  let name = `快速命令${index ? `-${index}` : ''}`
  /** 如果超出限制 */
  if (index >= quickCommandConfig.maxNumber) {
    name = '快速命令'
    /** 清空所有终端 */
    list.forEach((v) => {
      v.dispose()
    })
  }

  /** 拆分命令 */
  const commandList = command.split(
    /(?<!\\)\$(path|file|dir|(?:custom|branch)(?:<(?:(?!>).)*>)?|commit)/,
  )

  /** 替换参数 */
  for (const [i, v] of Object.entries(commandList)) {
    let value: string | undefined = void 0

    /** 如果是路径 */
    if (v === 'path') {
      value = resource.fsPath
    }
    /** 如果是文件 */ else if (v === 'file' && stat.type === 1) {
      value = resource.fsPath
    }
    /** 如果是文件夹 */ else if (v === 'dir') {
      value = stat.type === 2 ? resource.fsPath : path.dirname(resource.fsPath)
    }
    /** 如果是自定义 */ else if (v.startsWith('custom')) {
      /** 获取自定义 */
      const custom = await createInputBox({
        title: '请输入自定义',
        placeholder: '请输入自定义',
        prompt: `${commandList.toSpliced(Number(i), 1, `{${v}}`).join('')}\n`,
        value: v.slice(7, -1),
        ignoreFocusOut: true,
      })
      /** 如果未获取到值, 则取消 */
      if (custom === void 0) {
        logs.warn('取消执行命令')
        return
      }
      value = custom
    }
    /** 如果是分支 */ else if (v.startsWith('branch') || v === 'commit') {
      value = v.slice(7, -1)
      /** 获取分支 */
      const branches = await repository!.getBranches({ remote: true })

      if (branches.length > 1) {
        const options = Object.values(branches).map(
          item =>
            ({
              label: item.name!,
              description: item.remote ?? '本地分支',
            }) satisfies SelectItem,
        )
        const branch = await createSelect({
          title: '请选择分支',
          placeholder: '请选择分支',
          get activeItems() {
            const head = repository!.state.HEAD?.name
            const item = options.find(i => i.label === head)
            return item ? [item.label] : []
          },
          ignoreFocusOut: true,
          matchOnDescription: true,
          items: options,
        })
        if (branch === void 0) {
          logs.warn('取消执行命令')
          return
        }
        value = branch
      }
      else {
        value = branches[0].name
      }
      /** 如果是提交 */
      if (v === 'commit') {
        const stdout = execSync(
          `git log ${value} --pretty=format:"%H<|>%B<|>%P<|>%ad<|>%an<|>%ae<|>%cd<;>"`,
          { cwd: repository!.rootUri.fsPath, encoding: 'utf-8' },
        ).toString()

        const commits = stdout.split('<;>\n').map((line) => {
          const [hash, message, parents, authorDate, authorName, authorEmail, commitDate]
            = line.split('<|>')

          const messageList = message.split('\n')

          return {
            hash,
            subject: messageList[0],
            message: message.trim(),
            parents: parents.split(' '),
            authorDate,
            authorName,
            authorEmail,
            commitDate,
          }
        })

        if (commits.length > 1) {
          const options = Object.values(commits).map(
            item =>
              ({
                label: item.hash!,
                description: item.subject,
                detail: item.message,
              }) satisfies SelectItem,
          )
          const commit = await createSelect({
            title: '请选择提交',
            placeholder: '请选择提交',
            get activeItems() {
              const commit = repository!.state.HEAD?.commit
              const item = options.find(i => i.label === commit)
              return item ? [item.label] : []
            },
            ignoreFocusOut: true,
            matchOnDescription: true,
            items: options,
          })
          if (commit === void 0) {
            logs.warn('取消执行命令')
            return
          }
          value = commit
        }
        else {
          value = commits[0].hash
        }
      }
    }
    else {
      value = v
    }

    if (value === void 0) {
      logs.warn(commandList.join('---'))
      logs.warn('命令执行失败, 取消执行命令')
      return
    }
    /** 替换 */
    commandList[Number(i)] = value
  }

  /** 要执行的命令 */
  const commandText = await createCacheShell('command', commandList.join(' '))
  if (commandText === void 0) {
    logs.warn('取消执行命令')
    return
  }
  /** 创建终端 */
  const pw = window.createTerminal({
    name,
    shellPath,
    isTransient: true,
    cwd: workspaceFolder.uri,
  })
  /** 显示终端 */
  pw.show()
  /** 发送命令 */
  pw.sendText(commandText)
  /** 设置默认shell */
  writeConfig('defaultShell', shellName, command)
}

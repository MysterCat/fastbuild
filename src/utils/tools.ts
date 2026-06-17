import { Buffer } from 'node:buffer'
import process from 'node:process'

import { tryit } from 'radashi'
import { Uri, workspace } from 'vscode'

import { extendedName, extensionRoot } from './constants'

type Tail<T> = T extends (self: any, ...args: infer A) => infer R ? (...args: A) => R : never
/**
 * 递归
 * @description 语法糖（JS 风格递归）
 */
export function recursive<Args extends any[], R>(
  callback: (self: (...args: Args) => R, ...args: Parameters<typeof self>) => R,
): Tail<typeof callback> {
  const fn: Tail<typeof callback> = (...args) => callback(fn, ...args)
  return fn
}

type OS_TYPE = 'windows' | 'osx' | 'linux'
/**
 * 获取当前操作系统类型
 */
export function getOSType(): OS_TYPE {
  const platform = process.platform

  switch (platform) {
    case 'win32':
      return 'windows'
    case 'darwin':
      return 'osx'
    case 'linux':
      return 'linux'
    default:
      return 'windows'
  }
}

/**
 * 读取配置文件
 * @param fileName 配置文件路径
 * @returns 配置值
 */
export async function readConfig<T = object>(fileName: string): Promise<T>
/**
 * 读取配置文件中的指定键值对
 * @param fileName 配置文件路径
 * @param key 键名
 * @returns 配置值
 */
export async function readConfig<T = string>(fileName: string, key: string): Promise<T>
/**
 * 读取配置文件中的指定键值对
 * @param fileName 配置文件路径
 * @param key 键名
 * @param defaultValue 默认值
 * @returns 配置值对的值
 */
export function readConfig<T = string>(fileName: string, key: string, defaultValue?: T): T
export async function readConfig<T = string | object>(
  fileName: string,
  key?: string,
  defaultValue?: T,
): Promise<T> {
  /** 读取文件内容 */
  const [, result] = await tryit(async () =>
    (
      await workspace.fs.readFile(Uri.joinPath(extensionRoot, `.${extendedName}`, fileName))
    ).toString(),
  )()
  /** 解析文件内容 */
  const data = result ? JSON.parse(result) : {}
  /** 检查是否为字符串 */
  if (key) {
    return data[key] ?? defaultValue
  }
  return data ?? defaultValue
}

/**
 * 写入配置文件
 * @param fileName 配置文件路径
 * @param value 值
 */
export async function writeConfig<T = object>(fileName: string, value: T): Promise<void>
/**
 * 写入配置文件中的指定键值对
 * @param fileName 配置文件路径
 * @param value 值
 * @param key 键名
 */
export async function writeConfig<T = string>(
  fileName: string,
  value: T,
  key: string,
): Promise<void>
export async function writeConfig<T = string | object>(
  fileName: string,
  value: T,
  key?: string,
): Promise<void> {
  const data = await readConfig<Record<string, any>>(fileName)

  if (key) {
    data[key] = value
  }
  else {
    for (const key in value) {
      data[key] = value[key]
    }
  }

  /** 写入文件内容 */
  workspace.fs.writeFile(
    Uri.joinPath(extensionRoot, `.${extendedName}`, fileName),
    Buffer.from(JSON.stringify(data, null, 2)),
  )
}

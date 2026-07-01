import type { UserConfig } from '@commitlint/types'
import type { CommitType } from 'conventional-changelog-conventionalcommits'

import createPreset from 'conventional-changelog-conventionalcommits'

/** 类型枚举 */
export const types: CommitType[] = [
  {
    type: 'feat',
    section: '✨ 新增功能',
    effect: 'bump',
  },
  {
    type: 'fix',
    section: '🐛 修复问题',
    effect: 'bump',
  },
  {
    type: 'docs',
    section: '📃 文档更新',
    effect: 'changelog',
  },
  {
    type: 'style',
    section: '🌈 格式调整',
    effect: 'changelog',
  },
  {
    type: 'refactor',
    section: '♻️ 代码重构',
    effect: 'changelog',
  },
  {
    type: 'perf',
    section: '🚀 性能优化',
    effect: 'bump',
  },
  {
    type: 'test',
    section: '🧪 测试变更',
    effect: 'changelog',
  },
  {
    type: 'build',
    section: '📦 构建变更',
    effect: 'changelog',
  },
  {
    type: 'ci',
    section: '⚙️ 持续集成',
    effect: 'changelog',
  },
  {
    type: 'chore',
    section: '🔧 其他变更',
    effect: 'changelog',
  },
  {
    type: 'revert',
    section: '⏪ 回滚提交',
    effect: 'bump',
  },
]

const typeEnum = {
  feat: {
    description: 'A new feature',
    title: 'Features',
    emoji: '✨',
  },
  fix: {
    description: 'A bug fix',
    title: 'Bug Fixes',
    emoji: '🐛',
  },
  docs: {
    description: 'Documentation only changes',
    title: 'Documentation',
    emoji: '📚',
  },
  style: {
    description:
      'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
    title: 'Styles',
    emoji: '💎',
  },
  refactor: {
    description: 'A code change that neither fixes a bug nor adds a feature',
    title: 'Code Refactoring',
    emoji: '📦',
  },
  perf: {
    description: 'A code change that improves performance',
    title: 'Performance Improvements',
    emoji: '🚀',
  },
  test: {
    description: 'Adding missing tests or correcting existing tests',
    title: 'Tests',
    emoji: '🚨',
  },
  build: {
    description:
      'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
    title: 'Builds',
    emoji: '🛠',
  },
  ci: {
    description:
      'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
    title: 'Continuous Integrations',
    emoji: '⚙️',
  },
  chore: {
    description: 'Other changes that don\'t modify src or test files',
    title: 'Chores',
    emoji: '♻️',
  },
  revert: {
    description: 'Reverts a previous commit',
    title: 'Reverts',
    emoji: '🗑',
  },
}

/** 创建 Emoji 解析器 */
function createEmojiParser() {
  /** 解析选项 */
  const parserOpts = {
    headerPattern:
      /^(?:\p{Extended_Pictographic}(?:\uFE0F|\uFE0E)?\s+)?(\w*)(?:\((.*)\))?!?:\s(.*)$/u,
    breakingHeaderPattern:
      /^(?:\p{Extended_Pictographic}(?:\uFE0F|\uFE0E)?\s)?(\w*)(?:\((.*)\))?!:\s(.*)$/u,
  }

  /** 创建 conventional Commits 配置 */
  const conventionalcommits = createPreset({
    types,
  })

  return {
    ...conventionalcommits,
    parserOpts,
    recommendedBumpOpts: { parserOpts },
    conventionalChangelog: { parserOpts },
  }
}

export default {
  parserPreset: createEmojiParser(),
  rules: {
    'header-max-length': [2, 'always', 120],
    'header-trim': [2, 'always'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 120],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 120],
  },
  prompt: {
    questions: {
      header: {
        description:
          '请输入提交头[必填](格式: (:gitmoji: ?)<type>(<scope>): (:gitmoji:?)<subject>)',
      },
      type: {
        description: '选择你要提交的变更类型:',
        emojiInHeader: true,
        enum: Object.fromEntries(
          types.map(({ type, section }) => {
            const [emoji, title] = section?.split(' ') ?? []
            return [
              type,
              {
                emoji,
                title,
                description: typeEnum[type as keyof typeof typeEnum].description,
              },
            ]
          }),
        ),
      },
      scope: {
        description: '变更的范围[可选]（例如组件或文件名）',
      },
      subject: {
        description: '变更的简短描述[必填]',
      },
      body: {
        description: '变更的详细描述[可选]',
      },
      isBreaking: {
        description: '是否有重大变更？[可选]',
      },
      breakingBody: {
        description: '重大变更提交需要包含变更描述。请输入变更描述的详细信息[可选]',
      },
      breaking: {
        description: '重大变更的描述[可选]',
      },
      isIssueAffected: {
        description: '是否有影响已打开问题的变更？',
      },
      issuesBody: {
        description: '如果有影响已打开问题的变更，提交需要包含变更描述。请输入变更描述的详细信息',
      },
      issues: {
        description: '添加影响已打开问题的变更引用（例如 "fix #123", "re #123".）',
      },
    },
  },
} satisfies UserConfig

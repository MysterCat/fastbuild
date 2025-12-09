import type { UserConfig } from '@commitlint/types'

export default {
  parserPreset: {
    name: 'conventionalcommits',
    parserOpts: {
      headerPattern: /^(?:\p{Extended_Pictographic}\s+)?(\w*)(?:\((.*)\))?!?:\s(.*)$/u,
      breakingHeaderPattern: /^(?:\p{Extended_Pictographic}\s)?(\w*)(?:\((.*)\))?!:\s(.*)$/u,
    },
  },
  rules: {
    'header-max-length': [2, 'always', 120],
    'header-trim': [2, 'always'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert'],
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
        description: '请输入提交头[必填](格式: (:gitmoji: ?)<type>(<scope>): (:gitmoji:?)<subject>)',
      },
      type: {
        description: '选择你要提交的变更类型:',
        emojiInHeader: true,
        enum: {
          feat: {
            description: '新增功能',
            title: '新增功能',
            emoji: '✨',
          },
          fix: {
            description: '修复 bug',
            title: '修复 bug',
            emoji: '🐛',
          },
          docs: {
            description: '文档变更',
            title: '文档变更',
            emoji: '📃',
          },
          style: {
            description: '代码格式变更，不影响代码含义（空格、格式化、缺少分号等）',
            title: '代码格式变更',
            emoji: '🌈',
          },
          refactor: {
            description: '代码变更，既不修复 bug 也不新增功能',
            title: '代码重构',
            emoji: '♻️',
          },
          perf: {
            description: '性能优化',
            title: '性能优化',
            emoji: '🚀',
          },
          test: {
            description: '添加缺失的测试或修正现有的测试',
            title: '测试',
            emoji: '🚨',
          },
          build: {
            description: '构建系统或外部依赖项的变更（例如 scopes: gulp, broccoli, npm）',
            title: '构建系统变更',
            emoji: '📦',
          },
          ci: {
            description:
              'CI 配置文件或脚本的变更（例如 scopes: Travis, Circle, BrowserStack, SauceLabs）',
            title: 'CI 配置变更',
            emoji: '⚙️',
          },
          chore: {
            description: '其他不修改 src 或 test 文件的变更',
            title: '其他变更',
            emoji: '🔧',
          },
          revert: {
            description: '回滚之前的提交',
            title: '回滚提交',
            emoji: '⏪',
          },
        },
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

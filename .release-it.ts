import type { Config } from 'release-it'

import commitlint, { types } from './commitlint.config'

interface Context {
  noteGroups?: {
    title: string
    notes?: { text: string }[]
  }[]
}

export default {
  git: {
    commitMessage: `🔧 chore(release): 🔖\${version}`,
  },
  npm: {
    publish: false,
    publishPackageManager: 'pnpm',
  },
  plugins: {
    '@release-it/conventional-changelog': {
      parserOpts: commitlint.parserPreset.parserOpts,
      preset: {
        name: 'conventionalcommits',
        types,
      },
      header: '# 更新日志',
      infile: 'CHANGELOG.md',
      strictSemVer: true,
      ignoreRecommendedBump: true,
      writerOpts: {
        commitsSort: 'date',
        finalizeContext(context: Context) {
          for (const noteGroup of context.noteGroups ?? []) {
            noteGroup.title = '💥 重大变更'
            for (const note of noteGroup.notes ?? []) {
              note.text = note.text.split('\n').join('\n  ')
            }
          }

          return context
        },
      },
    },
  },
} satisfies Config

import type { Options } from 'conventional-changelog-writer'
import type { Config } from 'release-it'

import commitlint from './commitlint.config'

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
        name: commitlint.parserPreset.name,
        types: Object.entries(commitlint.prompt?.questions?.type?.enum ?? {}).map(
          ([key, value]) => ({ type: key, section: `${value.emoji} ${value.title}`.trim() }),
        ),
      },
      header: '# 更新日志',
      infile: 'CHANGELOG.md',
      strictSemVer: true,
      ignoreRecommendedBump: true,
      writerOpts: {
        finalizeContext(context) {
          for (const noteGroup of context.noteGroups ?? []) {
            noteGroup.title = '💥 重大变更'
            for (const note of noteGroup.notes ?? []) {
              note.text = note.text.split('\n').join('\n  ')
            }
          }

          return context
        },
      } satisfies Options,
    },
  },
} satisfies Config

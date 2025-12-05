import antfu from '@antfu/eslint-config'

/** antfu配置 */
export default antfu(
  {
    formatters: true,
    typescript: true,
    pnpm: false,
    rules: {
      'style/linebreak-style': ['error', 'unix'],
    },
  },
)

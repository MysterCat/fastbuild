import antfu from '@antfu/eslint-config'

/** antfu配置 */
export default antfu({
  formatters: true,
  pnpm: true,
  test: true,
  rules: {
    'style/linebreak-style': ['error', 'unix'],
    'ts/method-signature-style': ['error', 'method'],
  },
})

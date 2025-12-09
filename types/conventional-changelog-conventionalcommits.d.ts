declare module 'conventional-changelog-conventionalcommits' {
  export default function createPreset(): Promise<import('@commitlint/types').ParserPreset>
}

export function mapToShikiLanguage(language: string): string {
  switch (language) {
    case 'cjs':
    case 'mjs':
      return 'javascript'
    case 'cts':
    case 'mts':
      return 'typescript'
    default:
      return language
  }
}

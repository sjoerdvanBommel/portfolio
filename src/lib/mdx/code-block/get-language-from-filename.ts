export function getLanguageFromFilename(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase()

  switch (extension) {
    case 'js':
      return 'javascript'
    case 'ts':
      return 'typescript'
    case 'jsx':
      return 'jsx'
    case 'tsx':
      return 'tsx'
    case 'css':
      return 'css'
    case 'html':
      return 'html'
    case 'json':
      return 'json'
    case 'md':
      return 'markdown'
    case 'sh':
      return 'bash'
    default:
      return 'plaintext'
  }
}

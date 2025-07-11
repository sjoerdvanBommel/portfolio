export function getExtensionFromFilename(fileName: string): string {
  return fileName.split('.').pop()?.toLowerCase() ?? ''
}

export function getLanguageFromFilename(fileName: string): string {
  const extension = getExtensionFromFilename(fileName)

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
    case 'ansi':
      return 'ansi'
    default:
      return 'plaintext'
  }
}

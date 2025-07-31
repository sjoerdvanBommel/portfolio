import { FileStructure } from './types'

export function findFirstFileWithContent(fileList: FileStructure[]): FileStructure | null {
  for (const file of fileList) {
    if (typeof file.content === 'string') {
      return file
    }
    if (Array.isArray(file.content)) {
      const found = findFirstFileWithContent(file.content)
      if (found) return found
    }
  }
  return null
}

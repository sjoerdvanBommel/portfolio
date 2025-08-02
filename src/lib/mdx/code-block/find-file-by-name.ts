import { FileStructure } from './types'

export function findFileByName(fileList: FileStructure[], name: string): FileStructure | null {
  // Split the name by slashes to handle path-based file names
  const pathParts = name.split('/').filter((part) => part.length > 0)

  if (pathParts.length === 0) {
    return null
  }

  if (pathParts.length === 1) {
    for (const file of fileList) {
      if (file.name === pathParts[0] && typeof file.content === 'string') {
        return file
      }
    }
  }

  // For multi-part paths, traverse the directory structure
  return findFileByPath(fileList, pathParts)
}

function findFileByPath(fileList: FileStructure[], pathParts: string[]): FileStructure | null {
  const [currentPart, ...remainingParts] = pathParts

  for (const file of fileList) {
    if (file.name === currentPart) {
      // If this is the last part and it's a file, return it
      if (remainingParts.length === 0 && typeof file.content === 'string') {
        return file
      }

      // If there are remaining parts and this is a directory, continue traversing
      if (remainingParts.length > 0 && Array.isArray(file.content)) {
        const found = findFileByPath(file.content, remainingParts)
        if (found) return found
      }
    }
  }

  return null
}

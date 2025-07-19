import { FileStructure } from './types'

/**
 * Generic function that recursively traverses a FileStructure array
 * @param files - Array of FileStructure objects to traverse
 * @param callback - Function to call for each file, receives the file and its path
 * @param path - Current path in the file tree (used internally for recursion)
 */
export function traverseFiles<T = void>(
  files: FileStructure[],
  callback: (file: FileStructure, path: string[]) => T,
  path: string[] = [],
): T[] {
  const results: T[] = []

  for (const file of files) {
    const currentPath = [...path, file.name]
    const result = callback(file, currentPath)
    results.push(result)

    // Recursively traverse if content is an array of files
    if (Array.isArray(file.content)) {
      const nestedResults = traverseFiles(file.content, callback, currentPath)
      results.push(...nestedResults)
    }
  }

  return results
}

/**
 * Alternative version that doesn't return values, just executes the callback
 * @param files - Array of FileStructure objects to traverse
 * @param callback - Function to call for each file, receives the file and its path
 * @param path - Current path in the file tree (used internally for recursion)
 */
export function forEachFile(
  files: FileStructure[],
  callback: (file: FileStructure & { content: string }, path: string[]) => void,
): void {
  // @ts-expect-error - We know that the callback will be called with a file that has a content property
  internalForEachFile(files, callback, [])
}

function internalForEachFile(
  files: FileStructure[],
  callback: (file: FileStructure, path: string[]) => void,
  path: string[] = [],
): void {
  for (const file of files) {
    const currentPath = [...path, file.name]

    // Recursively traverse if content is an array of files
    if (Array.isArray(file.content)) {
      internalForEachFile(file.content, callback, currentPath)
    } else {
      callback(file, currentPath)
    }
  }
}

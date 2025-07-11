import { FileSystemTree } from '@webcontainer/api'

/**
 * Strips markers from code and removes lines as specified by [!code --] markers
 *
 * Examples:
 * // [!code --] - removes the current line plus the next line
 * // [!code --:3] - removes the current line plus the next 3 lines
 * // [!code ++] - keeps the line (just removes the marker)
 */
export function stripMarkers(code: string): string {
  const lines = code.split('\n')
  const result: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Check for [!code --] marker
    const removeMatch = line.match(/\/\/\s*\[!code\s*--(?::(\d+))?\]/)

    if (removeMatch) {
      // Get the number of additional lines to remove (default 1)
      const additionalLines = parseInt(removeMatch[1] || '1', 10)
      // Skip the marker line and the next N lines
      i += additionalLines
      continue
    }

    // Check for [!code ++] marker - just remove the marker, keep the line
    const addMatch = line.match(/\/\/\s*\[!code\s*\+\+\]/)
    if (addMatch) {
      // Remove the marker but keep the rest of the line
      const cleanLine = line.replace(/\/\/\s*\[!code\s*\+\+\]/, '').trim()
      if (cleanLine) {
        result.push(cleanLine)
      }
      continue
    }

    // Check for other markers like [!code focus:1] - just remove them
    const otherMarkerMatch = line.match(/\/\/\s*\[!code\s+\w+[^\]]*\]/)
    if (otherMarkerMatch) {
      // Remove the marker but keep the rest of the line
      const cleanLine = line.replace(/\/\/\s*\[!code\s+\w+[^\]]*\]/, '').trim()
      if (cleanLine) {
        result.push(cleanLine)
      }
      continue
    }

    // Regular line - keep it
    result.push(line)
  }

  return result.join('\n')
}

export function stripMarkersRecursively(files: FileSystemTree) {
  Object.values(files).forEach((file) => {
    if ('file' in file) {
      if ('symlink' in file.file) {
        return
      }
      file.file.contents = stripMarkers(file.file.contents as string)
    } else if ('directory' in file) {
      stripMarkersRecursively(file.directory)
    }
  })
}

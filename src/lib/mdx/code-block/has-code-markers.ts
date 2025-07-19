import { ADD_MARKER_PATTERN, OTHER_MARKER_PATTERN, REMOVE_MARKER_PATTERN } from './constants'

/**
 * Detects if a file has been modified by checking for [!code --] and [!code ++] markers
 * These markers indicate that the file content has been altered from its original state
 */
export function hasCodeMarkers(content: string): boolean {
  const lines = content.split('\n')

  for (const line of lines) {
    // Check for [!code --] marker
    if (line.match(REMOVE_MARKER_PATTERN)) {
      return true
    }

    // Check for [!code ++] marker
    if (line.match(ADD_MARKER_PATTERN)) {
      return true
    }

    // Check for other [!code ...] markers
    if (line.match(OTHER_MARKER_PATTERN)) {
      return true
    }
  }

  return false
}

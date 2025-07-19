/**
 * Regex patterns for detecting [!code markers in code
 */

/** Pattern for [!code --] markers (with optional line count) */
export const REMOVE_MARKER_PATTERN = /\/\/\s*\[!code\s*--(?::(\d+))?\]/

/** Pattern for [!code ++] markers */
export const ADD_MARKER_PATTERN = /\/\/\s*\[!code\s*\+\+(?::(\d+))?\]/

/** Pattern for other [!code ...] markers (like [!code focus:1]) */
export const OTHER_MARKER_PATTERN = /\/\/\s*\[!code\s+\w+[^\]]*\]/

/** Pattern to match any [!code ...] marker */
export const ANY_CODE_MARKER_PATTERN = /\/\/\s*\[!code\s+[^\]]*\]/

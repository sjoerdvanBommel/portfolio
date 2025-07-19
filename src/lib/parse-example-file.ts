export type Metadata = {
  isModified?: boolean
}

export interface MetadataInfo {
  metadata: string
  content: string
}

/**
 * Parses a JSON file that may contain custom metadata at the top.
 *
 * Expected format:
 * { "metadataProperty": "value" }
 * -----
 * <actual content>
 */
export function parseExampleFile(content: string) {
  return {
    metadata: getMetadata(content),
    content: getContent(content),
  }
}

export function parseMetadataJson(content: string): MetadataInfo {
  const lines = content.split('\n')
  const result: MetadataInfo = {
    metadata: '',
    content: '',
  }

  let currentLine = 0

  const separatorIndex = lines.findIndex((line) => line.trim() === '-----')

  if (separatorIndex !== -1) {
    // Parse everything before the separator as metadata
    const metadataLines = lines.slice(0, separatorIndex)
    result.metadata = metadataLines.join('\n').trim()
    currentLine = separatorIndex + 1
  }

  result.content = lines.slice(currentLine).join('\n').trim()

  return result
}

/**
 * Parses a file and returns only the actual content,
 * stripping off any metadata.
 */
export function getContent(content: string): string {
  const parsed = parseMetadataJson(content)
  return parsed.content
}

/**
 * Parses a JSON file and returns only the metadata object.
 */
export function getMetadata(content: string): Metadata {
  const parsed = parseMetadataJson(content)
  if (!parsed.metadata) {
    return {}
  }

  return JSON.parse(parsed.metadata)
}

/**
 * Validates if a string contains metadata format.
 */
export function hasMetadata(content: string): boolean {
  const lines = content.split('\n')

  // Check if any line contains exactly 5 dashes
  return lines.some((line) => line.trim() === '-----')
}

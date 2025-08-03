import { DirectoryNode, FileSystemTree } from '@webcontainer/api'
import fs from 'fs'
import path from 'path'
import { parseExampleFile } from '../parse-example-file'
import { getExtensionFromFilename } from './code-block/get-language-from-filename'
import { hasCodeMarkers } from './code-block/has-code-markers'
import { highlightCode } from './code-block/shiki-server'
import { FileStructure } from './code-block/types'

export async function readExampleFiles(post: string, example: string): Promise<FileStructure[]> {
  const dirPath = path.join(process.cwd(), `/src/content/${post}/examples/${example}`)

  if (!fs.existsSync(dirPath)) {
    return []
  }

  return await readDirectoryRecursive(dirPath, post, example)
}

async function readDirectoryRecursive(
  dirPath: string,
  post: string,
  example: string,
  basePath: string = '',
): Promise<FileStructure[]> {
  const items = fs.readdirSync(dirPath)
  const result: FileStructure[] = []

  for (const item of items) {
    if (item === 'output.ansi') continue

    const fullPath = path.join(dirPath, item)
    const relativePath = path.join(basePath, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      // Recursively read directory contents
      const children = await readDirectoryRecursive(fullPath, post, example, relativePath)

      result.push({
        name: item,
        fullPath: relativePath,
        content: children,
        metadata: { modifiedType: 'unmodified' },
        isDirectory: true,
      })
    } else {
      // Read file
      const fileStructure = await readExampleFile(post, example, relativePath)
      if (fileStructure) {
        result.push(fileStructure)
      }
    }
  }

  return result
}

export async function readExampleFile(post: string, example: string, filename: string) {
  const dirPath = path.join(process.cwd(), `/src/content/${post}/examples/${example}`)
  const filePath = path.join(dirPath, filename)
  try {
    const unmodifiedContent = toColoredString(fs.readFileSync(filePath, 'utf-8'))
    const { content, metadata } = parseExampleFile(unmodifiedContent)

    metadata.modifiedType ??= hasCodeMarkers(content) ? 'modified' : 'unmodified'

    const language = getExtensionFromFilename(filename)
    const highlightedHtml = await highlightCode(content, language)

    return {
      name: filename.split('/').pop()!,
      fullPath: filename,
      content,
      highlightedHtml,
      metadata,
    }
  } catch {
    return undefined
  }
}

/**
 * Converts a flat file path into a nested FileSystemTree structure
 */
function pathToFileSystemTree(filePath: string, content: string): FileSystemTree {
  const parts = filePath.split('/')
  const fileName = parts.pop()!

  const current: FileSystemTree = {}
  let pointer: FileSystemTree = current

  // Create nested directory structure
  for (const part of parts) {
    pointer[part] = { directory: {} }
    const dirNode = pointer[part] as DirectoryNode
    pointer = dirNode.directory
  }

  // Add the file at the end
  pointer[fileName] = { file: { contents: content } }

  return current
}

/**
 * Merges multiple FileSystemTree objects into one
 */
function mergeFileSystemTrees(trees: FileSystemTree[]): FileSystemTree {
  const result: FileSystemTree = {}

  for (const tree of trees) {
    for (const [key, value] of Object.entries(tree)) {
      if (result[key]) {
        // If key exists, merge the structures
        if ('directory' in value && 'directory' in result[key]) {
          const existingDir = result[key] as DirectoryNode
          const newDir = value as DirectoryNode
          existingDir.directory = { ...existingDir.directory, ...newDir.directory }
        } else if ('file' in value) {
          result[key] = value // File takes precedence
        }
      } else {
        result[key] = value
      }
    }
  }

  return result
}

export function readAllPostExampleFiles(post: string): FileSystemTree {
  const examplesDir = path.join(process.cwd(), `/src/content/${post}/examples`)

  if (!fs.existsSync(examplesDir)) {
    return {}
  }

  const fileSystemTrees: FileSystemTree[] = []

  function readDirectory(dirPath: string, basePath: string = '') {
    const items = fs.readdirSync(dirPath)

    for (const item of items) {
      if (item === 'output.ansi') continue
      const fullPath = path.join(dirPath, item)
      const relativePath = path.join(basePath, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        readDirectory(fullPath, relativePath)
      } else {
        const content = toColoredString(fs.readFileSync(fullPath, 'utf-8'))
        const tree = pathToFileSystemTree(relativePath, content)
        fileSystemTrees.push(tree)
      }
    }
  }

  readDirectory(examplesDir)
  return mergeFileSystemTrees(fileSystemTrees)
}

function toColoredString(str: string) {
  return str.replace(/\\u([0-9a-fA-F]{4})/g, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16))
  })
}

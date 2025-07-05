import { DirectoryNode, FileSystemTree } from '@webcontainer/api'
import fs from 'fs'
import path from 'path'

export interface ExampleFile {
  name: string
  content: string
}

export function readExampleFiles(example: string): ExampleFile[] {
  const dirPath = path.join(process.cwd(), `/src/content/${example}`)
  const files = fs.readdirSync(dirPath, 'utf-8').map((filename) => ({
    name: filename.replace(/^\d+-/, ''),
    content: toColoredString(fs.readFileSync(path.join(dirPath, filename), 'utf-8')),
  }))
  return files
}

export function readExampleFile(example: string, filename: string): ExampleFile | undefined {
  const files = readExampleFiles(example)
  const file = files.find((file) => file.name === filename)
  return file
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

export function readExampleFilesRecursively(example: string): FileSystemTree {
  const examplesDir = path.join(process.cwd(), `/src/content/${example}/examples`)

  if (!fs.existsSync(examplesDir)) {
    return {}
  }

  const fileSystemTrees: FileSystemTree[] = []

  function readDirectory(dirPath: string, basePath: string = '') {
    const items = fs.readdirSync(dirPath)

    for (const item of items) {
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

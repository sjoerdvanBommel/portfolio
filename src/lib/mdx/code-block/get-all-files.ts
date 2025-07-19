import { FileStructure } from './types'

export function getAllFiles(
  fileList: FileStructure[],
  basePath = '',
): Array<FileStructure & { fullPath: string }> {
  let result: Array<FileStructure & { fullPath: string }> = []
  for (const file of fileList) {
    if (typeof file.content === 'string') {
      result.push({ ...file, fullPath: `${basePath}/${file.name}` })
    }
    if (Array.isArray(file.content)) {
      result = result.concat(getAllFiles(file.content, `${basePath}/${file.name}`))
    }
  }
  return result
}

interface FileStructure {
  name: string
  content: string | FileStructure[]
}

export function findFileByName(fileList: FileStructure[], name: string): FileStructure | null {
  for (const file of fileList) {
    if (file.name === name && typeof file.content === 'string') {
      return file
    }
    if (Array.isArray(file.content)) {
      const found = findFileByName(file.content, name)
      if (found) return found
    }
  }
  return null
}

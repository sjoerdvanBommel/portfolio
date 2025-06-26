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
    content: fs.readFileSync(path.join(dirPath, filename), 'utf-8'),
  }))
  return files
}

export function readExampleFile(example: string, filename: string): ExampleFile | undefined {
  const files = readExampleFiles(example)
  const file = files.find((file) => file.name === filename)
  return file
}

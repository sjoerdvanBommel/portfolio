import fs from 'fs'
import path from 'path'
import { CodeView, CodeViewProps } from './code-view'

export interface CodeBlockProps {
  example: string
  initialFile?: string
  mode?: CodeViewProps['mode']
}

export function CodeBlock({ example, initialFile, mode = 'tabs' }: CodeBlockProps) {
  const dirPath = path.join(process.cwd(), `/src/content/${example}`)
  const files = fs.readdirSync(dirPath, 'utf-8').map((filename) => ({
    name: filename,
    content: fs.readFileSync(path.join(dirPath, filename), 'utf-8'),
  }))

  return (
    <div className="mt-4 mb-8 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden flex flex-col md:flex-row w-full bg-white dark:bg-gray-950 shadow-sm">
      <CodeView files={files} initialFile={initialFile} mode={mode} />
    </div>
  )
}

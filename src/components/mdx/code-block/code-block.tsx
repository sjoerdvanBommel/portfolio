import { getExtensionFromFilename } from '@/lib/mdx/code-block/get-language-from-filename'
import { highlightCode } from '@/lib/mdx/code-block/shiki-server'
import { readExampleFiles } from '@/lib/mdx/read-example-files'
import { css } from '@/styled-system/css'
import { CodeView, CodeViewProps } from './code-view'

export interface CodeBlockProps {
  example: string
  initialFile?: string
  mode?: CodeViewProps['mode']
  order?: string[]
}

const containerStyle = css({
  my: '4',
  border: '1px solid',
  borderColor: 'gray.800',
  borderRadius: 'lg',
  overflow: 'hidden',
})

export async function CodeBlock({ example, initialFile, mode = 'tabs', order }: CodeBlockProps) {
  const files = readExampleFiles(example)

  if (order) {
    files.sort((a, b) => {
      return order.indexOf(a.name) - order.indexOf(b.name)
    })
  }

  // Pre-render syntax highlighting for all files
  const filesWithHighlighting = await Promise.all(
    files.map(async (file) => {
      if (typeof file.content === 'string') {
        const language = getExtensionFromFilename(file.name)
        const highlightedHtml = await highlightCode(file.content, language)
        return {
          ...file,
          highlightedHtml,
        }
      }
      return file
    }),
  )

  return (
    <div className={containerStyle}>
      <CodeView files={filesWithHighlighting} initialFile={initialFile} mode={mode} />
    </div>
  )
}

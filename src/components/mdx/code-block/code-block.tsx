import { readExampleFiles } from '@/lib/mdx/read-example-files'
import { css } from '@/styled-system/css'
import { CodeView, CodeViewProps } from './code-view'

export interface CodeBlockProps {
  example: string
  initialFile?: string
  mode?: CodeViewProps['mode']
}

const containerStyle = css({
  my: '4',
  border: '1px solid',
  borderColor: 'gray.800',
  borderRadius: 'lg',
  overflow: 'hidden',
})

export function CodeBlock({ example, initialFile, mode = 'tabs' }: CodeBlockProps) {
  const files = readExampleFiles(example)

  return (
    <div className={containerStyle}>
      <CodeView files={files} initialFile={initialFile} mode={mode} />
    </div>
  )
}

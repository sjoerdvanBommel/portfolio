import { readExampleFiles } from '@/lib/mdx/read-example-files'
import { css } from '@/styled-system/css'
import { CodeView, CodeViewProps } from './code-view'

export interface CodeBlockProps {
  post: string
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
  minWidth: '100%',
  maxWidth: 'calc(100vw - var(--global-margin) * 2)',
  justifySelf: 'center',
})

export async function CodeBlock({
  post,
  example,
  initialFile,
  mode = 'tabs',
  order,
}: CodeBlockProps) {
  const files = await readExampleFiles(post, example)

  if (order) {
    files.sort((a, b) => {
      if (order.indexOf(a.name) === -1) {
        return 1
      }
      if (order.indexOf(b.name) === -1) {
        return -1
      }

      return order.indexOf(a.name) - order.indexOf(b.name)
    })
  }

  return (
    <div className={containerStyle}>
      <CodeView files={files} initialFile={initialFile} mode={mode} />
    </div>
  )
}

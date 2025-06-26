import { readExampleFile } from '@/lib/mdx/read-example-files'
import { css } from '@/styled-system/css'
import { TerminalOutput } from './terminal-output'

interface TerminalCommandRunnerProps {
  command: string
  example: string
}

export function TerminalCommandRunner({ command, example }: TerminalCommandRunnerProps) {
  const fileName = 'output.ansi'
  const output = readExampleFile(example, fileName)?.content

  if (!output) {
    console.warn(`Output file ${example}/${fileName} not found`)
    return null
  }

  return (
    <div className={containerStyle}>
      <TerminalOutput command={command} output={output} />
    </div>
  )
}

const containerStyle = css({
  my: '4',
  border: '1px solid',
  borderColor: 'gray.800',
  borderRadius: 'lg',
  overflow: 'hidden',
})

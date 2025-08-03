import { readExampleFile } from '@/lib/mdx/read-example-files'
import { css } from '@/styled-system/css'
import stripAnsi from 'strip-ansi'
import { TerminalOutput } from './terminal-output'

interface TerminalCommandRunnerProps {
  command: string
  example: string
  post: string
}

export async function TerminalCommandRunner({
  command,
  example,
  post,
}: TerminalCommandRunnerProps) {
  // Check if output.ansi exists in the example folder
  let output = (await readExampleFile(post, example, 'output.ansi'))?.content
  if (output === '') {
    output = '[0;90m This command had no output [0m[0m'
  }
  const outputRaw = output ? stripAnsi(output) : undefined

  return (
    <div className={containerStyle}>
      <TerminalOutput command={command} example={example} output={output} outputRaw={outputRaw} />
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

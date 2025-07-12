import { readExampleFile } from '@/lib/mdx/read-example-files'
import { css } from '@/styled-system/css'
import { TerminalOutput } from './terminal-output'

interface TerminalCommandRunnerProps {
  command: string
  example: string
  post: string
  animationSpeed?: number
}

export function TerminalCommandRunner({
  command,
  example,
  post,
  animationSpeed,
}: TerminalCommandRunnerProps) {
  // Check if output.ansi exists in the example folder
  const output = readExampleFile(post, example, 'output.ansi')?.content

  return (
    <div className={containerStyle}>
      <TerminalOutput
        command={command}
        example={example}
        output={output}
        animationSpeed={animationSpeed}
      />
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

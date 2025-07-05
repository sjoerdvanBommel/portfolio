'use client'

import { useWebContainer } from '@/components/providers/web-container-provider'
import { runCommand, streamToString } from '@/lib/web-container'
import { css } from '@/styled-system/css'
import { PlayIcon, RotateCcwIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AnsiRenderer } from './ansi-renderer'

type TerminalOutputProps = {
  example: string
  command: string
  onRunningChange?: (running: boolean) => void
  output?: string
}

export function TerminalOutput({ example, onRunningChange, command, output }: TerminalOutputProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [displayedOutput, setDisplayedOutput] = useState('')
  const [, setCurrentLineIndex] = useState(0)
  const [, setCurrentCharIndex] = useState(0)
  const [finalOutput, setFinalOutput] = useState<string | undefined>(output)
  const container = useWebContainer()

  useEffect(() => {
    if (!container || output) return
    ;(async () => {
      const [mainCommand, ...args] = command.split(' ')
      const output = await runCommand(container, mainCommand, args, {
        cwd: example,
      })
      const outputString = await streamToString(output)
      setFinalOutput(outputString)
    })()
  }, [container, command, example, output])

  // useEffect(() => {
  //   if (!isRunning) return

  //   const outputLines = output?.split('\n') ?? []

  //   const interval = setInterval(() => {
  //     if (currentLineIndex >= outputLines.length) {
  //       setIsRunning(false)
  //       onRunningChange?.(false)
  //       return
  //     }

  //     const currentLine = outputLines[currentLineIndex]
  //     let outputLine = currentLine
  //     if (currentLine?.includes('[!code')) {
  //       setDisplayedOutput((prev) => prev + currentLine + '\n')
  //       setCurrentLineIndex((prev) => prev + 1)
  //       outputLine = outputLines[currentLineIndex + 1]
  //     }

  //     if (currentCharIndex < outputLine.length) {
  //       setDisplayedOutput((prev) => prev + outputLine[currentCharIndex])
  //       setCurrentCharIndex((prev) => prev + 1)
  //     } else {
  //       // Move to next line
  //       setDisplayedOutput((prev) => prev + '\n')
  //       setCurrentLineIndex((prev) => prev + 1)
  //       setCurrentCharIndex(0)
  //     }
  //   }, 5) // Adjust speed as needed

  //   return () => clearInterval(interval)
  // }, [isRunning, onRunningChange, output])

  const handleRun = () => {
    if (isRunning) return
    setIsRunning(true)
    onRunningChange?.(true)
    setDisplayedOutput('')
    setCurrentLineIndex(0)
    setCurrentCharIndex(0)
  }

  const handleReset = () => {
    setIsRunning(false)
    onRunningChange?.(false)
    setDisplayedOutput('')
    setCurrentLineIndex(0)
    setCurrentCharIndex(0)
  }

  return (
    <div className={outputContainerStyle}>
      <div className={outputStyle}>
        <div className={commandTextStyle}>
          <span className={promptStyle}>$ </span>
          {command}
          {/* {!outputStream && !output && <span>Loading...</span>} */}
          {!displayedOutput && !isRunning && !!output && (
            <button onClick={handleRun} className={playButtonStyle} aria-label="Run output">
              <PlayIcon size={16} />
            </button>
          )}
        </div>
        {finalOutput && (
          <div className={outputTextStyle}>
            {<AnsiRenderer output={finalOutput ?? 'This is fallback output'} />}
          </div>
        )}

        {/* {outputStream && (
          <div className={outputTextStyle}>{<AnsiRenderer stream={outputStream} />}</div>
        )} */}

        {!isRunning && displayedOutput && (
          <button onClick={handleReset} className={controlButtonStyle} aria-label={'Reset output'}>
            {<RotateCcwIcon size={20} />}
          </button>
        )}
      </div>
    </div>
  )
}

const commandTextStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '2',
  color: 'gray.100',
  fontFamily: 'mono',
  fontSize: 'md',
  px: '4',
  py: '3',
})

const promptStyle = css({
  color: 'amber.600',
  fontWeight: 'bold',
})

const outputContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
})

const outputStyle = css({
  position: 'relative',
  minHeight: '6',
  bg: 'gray.950/10',
})

const outputTextStyle = css({
  width: 'full',
  whiteSpace: 'pre-wrap',

  '& code': {
    width: '100%',
    whiteSpace: 'pre-wrap',
  },
})

const playButtonStyle = css({
  width: '6',
  height: '6',
  p: '1',
  cursor: 'pointer',
  color: 'amber.600',
  '& svg': {
    fill: 'currentColor',
  },
})

const controlButtonStyle = css({
  position: 'absolute',
  top: '4',
  right: '4',
  width: '5',
  height: '5',
  cursor: 'pointer',
  color: 'amber.500',
})

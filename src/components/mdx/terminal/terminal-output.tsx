'use client'

import { css } from '@/styled-system/css'
import { PlayIcon, RotateCcwIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CodeDisplay } from '../code-block/code-display'

interface TerminalOutputProps {
  command: string
  output: string
  onRunningChange?: (running: boolean) => void
}

export function TerminalOutput({ command, output, onRunningChange }: TerminalOutputProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [displayedOutput, setDisplayedOutput] = useState('')
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)

  const outputLines = output.split('\n')

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      if (currentLineIndex >= outputLines.length) {
        setIsRunning(false)
        onRunningChange?.(false)
        return
      }

      const currentLine = outputLines[currentLineIndex]
      let outputLine = currentLine
      if (currentLine?.includes('[!code')) {
        setDisplayedOutput((prev) => prev + currentLine + '\n')
        setCurrentLineIndex((prev) => prev + 1)
        outputLine = outputLines[currentLineIndex + 1]
      }

      if (currentCharIndex < outputLine.length) {
        setDisplayedOutput((prev) => prev + outputLine[currentCharIndex])
        setCurrentCharIndex((prev) => prev + 1)
      } else {
        // Move to next line
        setDisplayedOutput((prev) => prev + '\n')
        setCurrentLineIndex((prev) => prev + 1)
        setCurrentCharIndex(0)
      }
    }, 5) // Adjust speed as needed

    return () => clearInterval(interval)
  }, [isRunning, currentLineIndex, currentCharIndex, outputLines, onRunningChange])

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
          {!displayedOutput && !isRunning && (
            <button onClick={handleRun} className={playButtonStyle} aria-label="Run output">
              <PlayIcon size={16} />
            </button>
          )}
        </div>
        {displayedOutput && (
          <div className={outputTextStyle}>
            <CodeDisplay
              selectedFile={{
                name: 'output.ansi',
                content: displayedOutput,
              }}
            />
          </div>
        )}

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

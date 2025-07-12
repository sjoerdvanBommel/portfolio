'use client'

import { useWebContainer } from '@/components/providers/web-container-provider'
import { runCommand, streamToString } from '@/lib/web-container'
import { css, cx } from '@/styled-system/css'
import { FastForwardIcon, LoaderCircleIcon, PlayIcon, RotateCcwIcon } from 'lucide-react'
import { useState } from 'react'
import { AnsiRenderer } from './ansi-renderer'

type TerminalOutputProps = {
  example: string
  command: string
  output?: string
  animationSpeed?: number
}

export function TerminalOutput({ example, command, output, animationSpeed }: TerminalOutputProps) {
  const [displayedOutput, setDisplayedOutput] = useState('')
  const [animationEnded, setAnimationEnded] = useState(false)
  const [isRunningCommand, setIsRunningCommand] = useState(false)
  const container = useWebContainer()

  const handleRun = () => {
    if (output) {
      setDisplayedOutput(output)
      return
    }

    if (displayedOutput || !container) return

    setIsRunningCommand(true)
    ;(async () => {
      const [mainCommand, ...args] = command.split(' ')
      const commandOutput = await runCommand(container, mainCommand, args, {
        cwd: example,
      })
      const outputString = await streamToString(commandOutput)
      setDisplayedOutput(outputString)
      setIsRunningCommand(false)
    })()
  }

  const handleReset = () => {
    setDisplayedOutput('')
    setAnimationEnded(false)
  }

  const handleAnimationEnd = () => {
    setAnimationEnded(true)
  }

  const handleSkipAnimation = handleAnimationEnd

  return (
    <div className={outputContainerStyle}>
      <div className={outputStyle}>
        <div className={commandTextStyle}>
          <span className={promptStyle}>$ </span>
          {command}
          {(!container && !output) || isRunningCommand ? (
            <LoaderCircleIcon
              size={20}
              className={cx(playButtonStyle, spinStyle)}
              aria-label="Loading..."
            />
          ) : !displayedOutput ? (
            <button onClick={handleRun} className={playButtonStyle} aria-label="Run output">
              <PlayIcon size={16} />
            </button>
          ) : !animationEnded ? (
            <button
              onClick={handleSkipAnimation}
              className={playButtonStyle}
              aria-label="Skip animation"
            >
              <FastForwardIcon size={16} />
            </button>
          ) : null}
        </div>
        {displayedOutput && (
          <div className={outputTextStyle}>
            {
              <AnsiRenderer
                output={displayedOutput}
                animationSpeed={animationSpeed}
                withoutAnimation={animationEnded}
                onAnimationEnd={handleAnimationEnd}
              />
            }
          </div>
        )}

        {displayedOutput && (
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

const spinStyle = css({
  animation: 'spin 1s linear infinite',
})

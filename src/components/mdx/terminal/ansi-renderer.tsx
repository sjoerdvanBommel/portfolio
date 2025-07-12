'use client'

import { css } from '@/styled-system/css'
import { FitAddon } from '@xterm/addon-fit'
import { useEffect, useMemo, useRef } from 'react'
import { useXTerm } from 'react-xtermjs'

type AnsiRendererProps = {
  output: string
  animationSpeed?: number // milliseconds per character
  withoutAnimation?: boolean
  onAnimationEnd?: () => void
}

const fitAddon = new FitAddon()
// TODO: make responsive
const cols = 75

export function AnsiRenderer({
  output,
  animationSpeed = 3,
  withoutAnimation = false,
  onAnimationEnd,
}: AnsiRendererProps) {
  const { instance, ref } = useXTerm()

  const hasInitialized = useRef(false)
  const currentDisplayedLength = useRef(0)
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const totalTerminalLines = useMemo(() => {
    const lines = output.split('\n')

    // Long lines do not fit in the terminal and occupy multiple lines
    const terminalLines = lines.reduce((acc, curr) => {
      const lineLength = curr.length
      const lineCount = lineLength === 0 ? 1 : Math.ceil(lineLength / cols)
      return acc + lineCount
    }, 0)

    return Math.min(terminalLines, 24)
  }, [output])

  // Initialize terminal
  useEffect(() => {
    if (!instance || !ref.current || hasInitialized.current) return

    instance.loadAddon(fitAddon)

    // Passing options directly to the hook seems to contain a bug where it keeps rerendering
    instance.options.theme = {
      cursor: 'rgba(0,0,0,0)',
    }

    const handleResize = () => fitAddon.fit()

    // Handle resize event
    handleResize()
    window.addEventListener('resize', handleResize)

    hasInitialized.current = true

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [ref, instance])

  useEffect(() => {
    if (!instance || !hasInitialized.current) return

    // Clear any existing timers
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current)
      animationIntervalRef.current = null
    }

    if (withoutAnimation) {
      // Write all content at once for non-animation mode
      // Wait until possibly 1 more character is written in case interval just started
      setTimeout(() => {
        instance.reset()
        instance.write(output.replace(/\n/g, '\n\r'))
        onAnimationEnd?.()
      }, animationSpeed)
      return
    }

    // Animation mode
    instance.clear()
    currentDisplayedLength.current = 0

    // Animate the output character by character
    animationIntervalRef.current = setInterval(() => {
      if (currentDisplayedLength.current >= output.length) {
        if (animationIntervalRef.current) {
          clearInterval(animationIntervalRef.current)
          animationIntervalRef.current = null
        }
        onAnimationEnd?.()
        return
      }

      const nextChar = output[currentDisplayedLength.current]

      if (nextChar === '\n') {
        // Handle newline properly
        instance.writeln('')
      } else {
        instance.write(nextChar)
      }

      currentDisplayedLength.current++
    }, animationSpeed)

    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current)
        animationIntervalRef.current = null
      }
    }
  }, [output, withoutAnimation, animationSpeed, instance, onAnimationEnd])

  return (
    <>
      <div style={{ height: `${totalTerminalLines * 16}px` }} className={containerStyle}>
        <div ref={ref as React.RefObject<HTMLDivElement>} className={terminalStyle} />
      </div>
    </>
  )
}

const containerStyle = css({
  paddingLeft: '16px',
})

const terminalStyle = css({
  '& .xterm-viewport': {
    backgroundColor: 'transparent !important',
  },
})

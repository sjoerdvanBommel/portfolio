'use client'

import { css } from '@/styled-system/css'
import { Terminal } from '@xterm/xterm'
import '@xterm/xterm/css/xterm.css'
import { useEffect, useMemo, useRef } from 'react'

type AnsiRendererProps = {
  output: string
  outputRaw: string
  animationSpeed?: number // milliseconds per character
  withoutAnimation?: boolean
  onAnimationEnd?: () => void
}

// Amount of columns that fit in current default width of content. Overflown content is scrollable.
const cols = 72

export function AnsiRenderer({
  output,
  outputRaw,
  animationSpeed = 3,
  withoutAnimation = false,
  onAnimationEnd,
}: AnsiRendererProps) {
  const ref = useRef<HTMLDivElement>(null)

  const totalTerminalLines = useMemo(() => {
    const lines = outputRaw?.split('\n') ?? []

    // Long lines do not fit in the terminal and occupy multiple lines
    const terminalLines = lines.reduce((acc, curr) => {
      const lineLength = curr.length
      const lineCount = lineLength === 0 ? 1 : Math.ceil(lineLength / cols)
      return acc + lineCount
    }, 1)

    return Math.min(terminalLines, 24)
  }, [outputRaw])

  const instance = useMemo(() => createTerminalInstance(totalTerminalLines), [totalTerminalLines])

  const hasInitialized = useRef(false)
  const currentDisplayedLength = useRef(0)
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!ref.current) return

    if (!hasInitialized.current) {
      instance.open(ref.current)
      hasInitialized.current = true
    }

    if (withoutAnimation) {
      // Write all content at once for non-animation mode, or when animation is skipped
      // Wait until possibly 1 more character is written in case interval just started
      setTimeout(() => {
        instance.reset()
        instance.write(output)
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

      instance.write(nextChar)

      currentDisplayedLength.current++
    }, animationSpeed)

    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current)
        animationIntervalRef.current = null
      }
    }
  }, [output, withoutAnimation, animationSpeed, instance, onAnimationEnd])

  return <div ref={ref as React.RefObject<HTMLDivElement>} className={terminalStyle} />
}

const terminalStyle = css({
  '& .xterm-viewport': {
    backgroundColor: 'transparent !important',
    overflowY: 'auto !important',
    scrollbarWidth: 'none',
  },

  '& .terminal': {
    overflowX: 'auto',
    paddingInline: '2',
  },
})

function createTerminalInstance(rows: number) {
  return new Terminal({
    convertEol: true,
    cols,
    rows,
    disableStdin: true,
    theme: {
      cursor: 'rgba(0,0,0,0)',
    },
  })
}

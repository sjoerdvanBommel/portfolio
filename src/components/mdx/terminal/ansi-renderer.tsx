'use client'

import { css } from '@/styled-system/css'
import { FitAddon } from '@xterm/addon-fit'
import { useEffect } from 'react'
import { useXTerm } from 'react-xtermjs'

type AnsiRendererProps =
  // | {
  //     stream: ReadableStream
  //   }
  {
    output: string
  }

const fitAddon = new FitAddon()
// TODO: make responsive
const cols = 75

export function AnsiRenderer(props: AnsiRendererProps) {
  const { instance, ref } = useXTerm()
  const lines = props.output.split('\n')
  let totalLines = lines.reduce((acc, curr) => {
    const lineLength = curr.length
    const lineCount = lineLength === 0 ? 1 : Math.ceil(lineLength / cols)
    return acc + lineCount
  }, 0)
  totalLines = Math.min(totalLines, 24)

  useEffect(() => {
    if (!instance || !ref.current) return

    // Load the fit addon
    instance.loadAddon(fitAddon)

    const handleResize = () => fitAddon.fit()

    // Write custom message on your terminal
    lines.forEach((line) => {
      instance.writeln(line)
    })

    // Handle resize event
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [ref, instance, lines])

  return (
    <>
      <div style={{ height: `${totalLines * 16}px` }} className={containerStyle}>
        <div ref={ref as React.RefObject<HTMLDivElement>} className={terminalStyle} />
      </div>
    </>
  )
}

const containerStyle = css({
  paddingLeft: '16px',
})

const terminalStyle = css({
  width: '100%',
  height: 'fit-content',
  '& .xterm-viewport': {
    backgroundColor: 'transparent !important',
  },
})

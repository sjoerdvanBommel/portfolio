'use client'

import { COLORS } from '@/lib/mdx/styles/colors'
import { SPACING } from '@/lib/mdx/styles/spacing'
import { css } from '@/styled-system/css'
import { CurrentTime } from './current-time'

const outerContainer = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const card = css({
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  gap: SPACING['16'],
  padding: SPACING['24'],
  my: SPACING['24'],
  borderRadius: SPACING['1'],
  borderColor: COLORS.gray['3'],
  background: COLORS.gray['1'],
  backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%232d1e15' stroke-width='8' stroke-dasharray='6%2c 14' stroke-dashoffset='18' stroke-linecap='square'/%3e%3c/svg%3e")`,
})

const buttonStyle = css({
  cursor: 'pointer',
  background: COLORS.yellow['7'],
  _hover: { background: COLORS.yellow['9'] },
  color: 'white',
  px: SPACING['24'],
  py: SPACING['10'],
  borderRadius: SPACING['1.5'],
  fontWeight: 'medium',
  transitionProperty: 'colors',
  transitionDuration: '200ms',
})

const timeText = css({
  fontSize: SPACING['5'],
  lineHeight: '1.5556',
  width: SPACING['32'],
  display: 'flex',
  alignItems: 'center',
  gap: SPACING['2'],
  color: COLORS.gray['6'],
})

export function MainThreadBlocker() {
  return (
    <div className={outerContainer}>
      <div className={card}>
        <button
          className={buttonStyle}
          onClick={() => {
            const start = Date.now()
            while (Date.now() - start < 1000 + Math.random() * 2000) {
              // Busy wait: this blocks the main thread
            }
          }}
        >
          Synchronous call
        </button>
        <div className={timeText}>
          <CurrentTime />
        </div>
      </div>
    </div>
  )
}

'use client'

import { iconButtonStyle } from '@/app/styles/globals'
import { css, cx } from '@/styled-system/css'
import { useLocalStorage } from '@uidotdev/usehooks'
import { RotateCcwIcon } from 'lucide-react'

export function ReloadHomeAnimationButton() {
  const [, setHasSeenWelcomeAnimation] = useLocalStorage('hasSeenWelcomeAnimation', false)

  return (
    <button
      className={cx(iconButtonStyle, reloadAnimationStyle)}
      onClick={() => setHasSeenWelcomeAnimation(false)}
    >
      <RotateCcwIcon />
    </button>
  )
}

const reloadAnimationStyle = css({
  color: 'var(--gray-11)',
})

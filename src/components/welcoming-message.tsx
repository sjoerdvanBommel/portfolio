'use client'

import { css } from '@/styled-system/css'
import { useLocalStorage } from '@uidotdev/usehooks'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

export default function WelcomingMessage({ children }: { children: React.ReactNode }) {
  const [hasSeenWelcomeAnimation, setHasSeenWelcomeAnimation] = useLocalStorage(
    'hasSeenWelcomeAnimation',
    false,
  )

  const contents = useMemo(
    () => [
      {
        children: (
          <span>
            Hey{' '}
            <motion.span
              animate={{ rotate: [0, 40, 0] }}
              transition={{ duration: 0.5, delay: 1 }}
              className={waveStyle}
            >
              👋
            </motion.span>
          </span>
        ),
        className: css({ fontSize: '5xl', fontWeight: 'bold' }),
      },
      {
        children: 'Thanks for visiting my site',
        className: css({ fontSize: '4xl', fontWeight: 'bold' }),
      },
      {
        children,
        className: css({ flex: 1, width: '100%', display: 'flex', flexDirection: 'column' }),
      },
    ],
    [children],
  )

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timeouts = contents.map((_, index) => {
      const timeout = setTimeout(() => {
        setIndex(index)
      }, 2000 * index)

      return timeout
    })

    const setHasSeenWelcomeAnimationTimeout = setTimeout(() => {
      setHasSeenWelcomeAnimation(true)
    }, 2000 * contents.length)

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout))
      clearTimeout(setHasSeenWelcomeAnimationTimeout)
    }
  }, [contents, hasSeenWelcomeAnimation, setHasSeenWelcomeAnimation])

  if (hasSeenWelcomeAnimation) {
    return <>{children}</>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={contents[index].className}
        key={index}
        initial={{ opacity: 0, y: index === contents.length - 1 ? 0 : -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {contents[index].children}
      </motion.div>
    </AnimatePresence>
  )
}

const waveStyle = css({
  display: 'inline-block',
})

'use client'

import { useEffect, useState } from 'react'

export function CurrentTime() {
  const [time, setTime] = useState(new Date().toISOString())

  useEffect(() => {
    const interval = setInterval(
      () =>
        setTime(
          new Date().getHours().toString().padStart(2, '0') +
            ':' +
            new Date().getMinutes().toString().padStart(2, '0') +
            ':' +
            new Date().getSeconds().toString().padStart(2, '0') +
            '.' +
            new Date().getMilliseconds().toString().padStart(3, '0'),
        ),
      37,
    )
    return () => clearInterval(interval)
  }, [])

  return <span suppressHydrationWarning>{time}</span>
}

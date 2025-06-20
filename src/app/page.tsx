import { css } from '@/styled-system/css'

const textStyles = css({
  color: 'var(--orange-10)',
})

export default function Home() {
  return (
    <div className={css({ display: 'flex', flexDirection: 'column', gap: '2' })}>
      <p className={textStyles}>Hello from Radix Themes using panda styles :)</p>
      <button>Let&apos;s go</button>
    </div>
  )
}

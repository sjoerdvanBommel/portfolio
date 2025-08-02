import HomeMainContent from '@/components/home-main-content'
import { css } from '@/styled-system/css'

export default async function Home() {
  return (
    <div className={containerStyle}>
      <HomeMainContent />
    </div>
  )
}

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 'var(--global-margin)',
  // TODO: find proper way to use remaining height of page inside grid
  minHeight: 'calc(100dvh - var(--header-height) - var(--global-margin) * 2)',
})

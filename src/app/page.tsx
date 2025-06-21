import { ClientOnly } from '@/components/client-only'
import HomeMainContent from '@/components/home-main-content'
import WelcomingMessage from '@/components/welcoming-message'
import { getRecentPosts } from '@/lib/mdx/posts/get-recent-posts'
import { css } from '@/styled-system/css'

export default async function Home() {
  const firstPost = (await getRecentPosts())[0]

  return (
    <div className={containerStyle}>
      <ClientOnly>
        <WelcomingMessage>
          <HomeMainContent firstPost={firstPost} />
        </WelcomingMessage>
      </ClientOnly>
    </div>
  )
}

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '2',
  // TODO: find proper way to use remaining height of page inside grid
  minHeight: 'calc(100dvh - var(--header-height) - var(--global-margin))',
})

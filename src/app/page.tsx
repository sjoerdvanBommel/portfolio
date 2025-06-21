import { ClientOnly } from '@/components/client-only'
import HomeMainContent from '@/components/home-main-content'
import WelcomingMessage from '@/components/welcoming-message'
import { getRecentPosts } from '@/lib/mdx/posts/get-recent-posts'
import { getYouTubeVideoByIds } from '@/lib/youtube/get-videos'
import { css } from '@/styled-system/css'

const recommendedVideoIds = ['2XqQDnFw4Ys', 'ALH_KQEkA24']

export default async function Home() {
  const recentPosts = (await getRecentPosts()).slice(0, 3)
  const videos = (await getYouTubeVideoByIds(...recommendedVideoIds)) ?? []

  return (
    <div className={containerStyle}>
      <ClientOnly>
        <WelcomingMessage>
          <HomeMainContent recentPosts={recentPosts} videos={videos} />
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

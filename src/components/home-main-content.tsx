import PostsSection from '@/app/posts/posts-section'
import { VideosSection } from '@/app/videos/videos-section'
import { css } from '@/styled-system/css'

export default function HomeMainContent() {
  return (
    <div className={containerStyle}>
      <p>
        Hey there! 👋 My name is Sjoerd, nice to meet you! My goal is to teach you advanced
        TypeScript to solve problems that AI cannot.
      </p>

      <PostsSection />

      <VideosSection />
    </div>
  )
}

const containerStyle = css({
  flex: 1,
  display: 'flex',
  gap: '12',
  flexDirection: 'column',
  alignItems: 'flex-start',
})

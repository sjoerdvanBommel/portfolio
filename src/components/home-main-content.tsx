import { Post } from '@/lib/mdx/posts/get-recent-posts'
import { css } from '@/styled-system/css'
import { Tooltip } from 'radix-ui'
import { H1, H2 } from './headings'
import { PostSection } from './post-section'
import { ReloadHomeAnimationButton } from './reload-home-animation-button'

export type HomeMainContentProps = {
  firstPost: Post
}

export default function HomeMainContent({ firstPost }: HomeMainContentProps) {
  return (
    <div className={containerStyle}>
      <div className={topContainerStyle}>
        <H1>Check out my latest content</H1>

        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <ReloadHomeAnimationButton />
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content side="left" className={tooltipContentStyle}>
                Replay that welcoming animation!
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>

      <div>
        <H2 className={subtitleStyle}>📚 Posts</H2>
        <p className={descriptionStyle}>
          I enjoy writing creative, interactive blog posts about complex software engineering topics
        </p>
        <PostSection post={firstPost} />
      </div>

      <div>
        <H2 className={subtitleStyle}>🎥 Videos</H2>
      </div>
    </div>
  )
}

const descriptionStyle = css({
  mb: '8',
  color: 'var(--gray-11)',
})

const subtitleStyle = css({
  fontSize: '1.5rem',
  mb: 0,
})

const tooltipContentStyle = css({
  backgroundColor: 'var(--gray-1)',
  color: 'var(--gray-12)',
  borderRadius: '0.5rem',
  padding: '0.5rem',
})

const topContainerStyle = css({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const containerStyle = css({
  flex: 1,
  mt: '4',
  display: 'flex',
  gap: '8',
  flexDirection: 'column',
  alignItems: 'flex-start',
})

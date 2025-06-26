import { Post } from '@/lib/mdx/posts/get-recent-posts'
import { YouTubeVideo } from '@/lib/youtube/get-videos'
import { css } from '@/styled-system/css'
import { ExternalLink } from 'lucide-react'
import { Tooltip } from 'radix-ui'
import { H1, H2 } from './headings'
import { PostSection } from './post-section'
import { ReloadHomeAnimationButton } from './reload-home-animation-button'
import { YouTubeVideoSection } from './youtube-video-section'

export type HomeMainContentProps = {
  recentPosts: Post[]
  videos?: YouTubeVideo[]
}

export default function HomeMainContent({ recentPosts, videos }: HomeMainContentProps) {
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

      <p>Hey there! 👋 Thanks for visiting my website. My name is Sjoerd, nice to meet you!</p>

      <p>
        Nowadays, most questions about coding can be answered by AI. I have been using it myself for
        years by now, and I&apos;ve learned that AI is less useful in complex scenarios. Since I do
        not believe that AI will be able to resolve these complex issues any time soon, I decided to
        instead make blog posts about them. On my website, I want to share content that is not just
        about the answer, but about the process of finding the answer and truly understanding it.
      </p>

      <div className={categoryContainerStyle}>
        <div>
          <H2 className={subtitleStyle}>📚 Posts</H2>
          <p className={descriptionStyle}>
            I enjoy writing creative, interactive blog posts about complex software engineering
            topics
          </p>
        </div>
        {recentPosts.map((post) => (
          <PostSection key={post.slug} post={post} />
        ))}
      </div>

      <div className={categoryContainerStyle}>
        <div>
          <div className={videosHeaderStyle}>
            <H2 className={subtitleStyle}>🎥 Videos</H2>
            <a
              href={'https://www.youtube.com/channel/UC74yl2lsr6zF9RENwXrEkpw'}
              className={channelLinkStyle}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit my channel <ExternalLink className={externalLinkStyle} />
            </a>
          </div>
          <p className={descriptionStyle}>
            I create educational content about web development. Have a look, it&apos;s free!
          </p>
        </div>
        {videos?.map((video) => <YouTubeVideoSection key={video.id} video={video} />)}
      </div>
    </div>
  )
}

const categoryContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8',
})

const videosHeaderStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const descriptionStyle = css({
  color: 'var(--gray-11)',
})

const subtitleStyle = css({
  fontSize: '1.5rem',
  my: 0,
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

const channelLinkStyle = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '2',
  color: 'var(--accent-11)',
  _hover: {
    color: 'var(--accent-12)',
  },
})

const externalLinkStyle = css({
  width: '1rem',
  height: '1rem',
})

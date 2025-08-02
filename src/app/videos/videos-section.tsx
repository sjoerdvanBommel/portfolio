import { H2 } from '@/components/headings'
import { YouTubeVideoSection } from '@/components/youtube-video-section'
import { getYouTubeVideoByIds } from '@/lib/youtube/get-videos'
import { css } from '@/styled-system/css'
import { ExternalLink } from 'lucide-react'

const recommendedVideoIds = ['2XqQDnFw4Ys', 'ALH_KQEkA24']

export async function VideosSection() {
  const videos = await getYouTubeVideoByIds(...recommendedVideoIds)

  return (
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
          Educational content about (3D) web development. Have a look, it&apos;s free!
        </p>
      </div>
      {videos?.map((video) => <YouTubeVideoSection key={video.id} video={video} />)}
    </div>
  )
}
const categoryContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4',
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

import { H1 } from '@/components/headings'
import { YouTubeVideoSection } from '@/components/youtube-video-section'
import { recommendedVideoIds } from '@/lib/youtube/constants'
import { getYouTubeVideoByIds } from '@/lib/youtube/get-videos'
import { css } from '@/styled-system/css'

export default async function VideosPage() {
  const videos = (await getYouTubeVideoByIds(...recommendedVideoIds)) ?? []

  return (
    <div>
      <H1>Videos</H1>
      <div className={videoContainerStyle}>
        {videos.map((video) => (
          <YouTubeVideoSection key={video.id} video={video} />
        ))}
      </div>
    </div>
  )
}

const videoContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4',
})

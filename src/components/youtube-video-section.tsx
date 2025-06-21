import { YouTubeVideo } from '@/lib/youtube/get-videos'
import { css } from '@/styled-system/css'
import Link from 'next/link'
import { H3 } from './headings'

export interface YouTubeVideoSectionProps {
  video: YouTubeVideo
}

export function YouTubeVideoSection({ video }: YouTubeVideoSectionProps) {
  return (
    <Link
      key={video.id}
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className={videoCardStyle}
    >
      <div className={thumbnailContainerStyle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={video.thumbnail} alt={video.title} className={thumbnailStyle} />
        <div className={durationStyle}>{video.duration}</div>
      </div>
      <div className={videoInfoStyle}>
        <H3 className={videoTitleStyle}>{video.title}</H3>
        <p className={videoDescriptionStyle}>
          {video.description.length > 100
            ? `${video.description.substring(0, 100)}...`
            : video.description}
        </p>
        <time className={publishedDateStyle}>
          {new Date(video.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </time>
      </div>
    </Link>
  )
}

const videoCardStyle = css({
  display: 'flex',
  gap: '2',
  textDecoration: 'none',
  flexDirection: 'column',
  sm: {
    flexDirection: 'row',
    gap: '4',
  },
})

const thumbnailContainerStyle = css({
  position: 'relative',
  borderRadius: '1rem',
  overflow: 'hidden',
  flexShrink: 0,
})

const thumbnailStyle = css({
  borderRadius: '0.25rem',
  width: '100%',
  objectFit: 'cover',
})

const durationStyle = css({
  position: 'absolute',
  bottom: '0.5rem',
  right: '0.5rem',
  background: 'rgba(0, 0, 0, 0.8)',
  color: 'white',
  padding: '0.125rem 0.25rem',
  borderRadius: '0.125rem',
  fontSize: '0.75rem',
})

const videoInfoStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  flex: 1,
})

const videoTitleStyle = css({
  fontSize: '1rem',
  fontWeight: '600',
  my: 0,
})

const videoDescriptionStyle = css({
  fontSize: '0.875rem',
  color: '#6b7280',
  margin: 0,
  lineHeight: '1.4',
})

const publishedDateStyle = css({
  fontSize: '0.75rem',
  color: '#9ca3af',
  marginTop: 'auto',
})

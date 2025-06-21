import { youtube } from '@googleapis/youtube'

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
const CHANNEL_ID = 'UC74yl2lsr6zF9RENwXrEkpw'

export interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnail: string
  publishedAt: string
  duration: string
}

export async function getLatestYouTubeVideos(maxResults = 2): Promise<YouTubeVideo[]> {
  if (!YOUTUBE_API_KEY) {
    console.warn('YouTube API key or Channel ID not configured')
    return []
  }

  try {
    const youtubeClient = youtube({
      version: 'v3',
      auth: YOUTUBE_API_KEY,
    })

    const channelResponse = await youtubeClient.channels.list({
      part: ['contentDetails'],
      id: [CHANNEL_ID],
    })

    const uploadsPlaylistId =
      channelResponse.data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads

    if (!uploadsPlaylistId) {
      throw new Error('Could not find uploads playlist')
    }

    // Then, get the videos from the uploads playlist
    const videosResponse = await youtubeClient.playlistItems.list({
      part: ['snippet', 'contentDetails'],
      playlistId: uploadsPlaylistId,
      maxResults,
    })

    const videos = videosResponse.data.items || []

    if (videos.length === 0) {
      return []
    }

    // Get video details including duration
    const videoIds = videos.map((item) => item.contentDetails?.videoId).filter(Boolean) as string[]

    const videoDetailsResponse = await youtubeClient.videos.list({
      part: ['contentDetails'],
      id: videoIds,
    })

    const videoDetails = videoDetailsResponse.data.items || []

    // Combine the data
    const result: YouTubeVideo[] = videos.map((item, index) => {
      const videoDetail = videoDetails[index]
      const duration = videoDetail?.contentDetails?.duration || 'PT0S'

      return {
        id: item.contentDetails?.videoId || '',
        title: item.snippet?.title || '',
        description: item.snippet?.description || '',
        thumbnail: item.snippet?.thumbnails?.medium?.url || '',
        publishedAt: item.snippet?.publishedAt || '',
        duration: formatDuration(duration),
      }
    })

    return result
  } catch (error) {
    console.error('Error fetching YouTube videos:', error)
    return []
  }
}

export async function getYouTubeVideoByIds(...videoIds: string[]): Promise<YouTubeVideo[] | null> {
  if (!YOUTUBE_API_KEY) {
    console.warn('YouTube API key not configured')
    return null
  }

  try {
    const youtubeClient = youtube({
      version: 'v3',
      auth: YOUTUBE_API_KEY,
    })

    // Filter out empty IDs
    const validVideoIds = videoIds.filter((id) => id && id.trim() !== '')

    if (validVideoIds.length === 0) {
      console.warn('No valid video IDs provided')
      return null
    }

    // Get video details including snippet and contentDetails
    const videoResponse = await youtubeClient.videos.list({
      part: ['snippet', 'contentDetails'],
      id: validVideoIds,
    })

    const videos = videoResponse.data.items || []

    if (videos.length === 0) {
      console.warn(`No videos found for the provided IDs`)
      return null
    }

    // Map videos to YouTubeVideo objects
    const result = videos.map((video) => {
      const duration = video.contentDetails?.duration || 'PT0S'

      return {
        id: video.id || '',
        title: video.snippet?.title || '',
        description: video.snippet?.description || '',
        thumbnail: video.snippet?.thumbnails?.medium?.url || '',
        publishedAt: video.snippet?.publishedAt || '',
        duration: formatDuration(duration),
      }
    })

    return result
  } catch (error) {
    console.error('Error fetching YouTube video(s):', error)
    return null
  }
}

function formatDuration(duration: string): string {
  // Parse ISO 8601 duration format (PT4M13S -> 4:13)
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return '0:00'

  const hours = parseInt(match[1] || '0')
  const minutes = parseInt(match[2] || '0')
  const seconds = parseInt(match[3] || '0')

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

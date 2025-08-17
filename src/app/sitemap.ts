import { getRecentPosts } from '@/lib/mdx/posts/get-recent-posts'
import fs from 'fs/promises'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sjoerdvanbommel.com'

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/videos`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  try {
    const posts = await getRecentPosts()

    for (const post of posts) {
      let lastModified = new Date()
      try {
        const contentPath = `src/content/${post.slug}/page.mdx`
        const stats = await fs.stat(contentPath)
        lastModified = stats.mtime
      } catch {
        lastModified = post.metadata.date ? new Date(post.metadata.date) : new Date()
      }

      routes.push({
        url: `${baseUrl}/posts/${post.slug}`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 1,
      })
    }
  } catch (error) {
    console.error('Error generating blog post sitemap entries:', error)
  }

  return routes
}

import fs from 'fs/promises'

export async function getRecentPosts() {
  const contentDir = 'src/content'
  const entries = await fs.readdir(contentDir, { withFileTypes: true })
  const slugs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name)

  const postPromises = slugs.map(async (slug) => {
    try {
      const { metadata, default: Post } = await import(`@/content/${slug}/page.mdx`)
      return {
        slug,
        metadata,
        Post,
      }
    } catch {
      // If the import fails (e.g., no page.mdx), skip this slug
      return null
    }
  })

  const posts = (await Promise.all(postPromises)).filter((post) => post !== null)
  return posts.sort((a, b) => {
    const aDate = new Date(a.metadata.date)
    const bDate = new Date(b.metadata.date)
    return aDate.getTime() - bDate.getTime()
  })
}

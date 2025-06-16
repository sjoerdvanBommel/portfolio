import { readFile } from 'fs/promises'
import { glob } from 'glob'
import path from 'path'

const POSTS_PATH = path.join(process.cwd(), 'src/content/**/page.mdx')

export async function getRecentPosts() {
  const postPaths = await glob(POSTS_PATH, { absolute: true })
  const postPromises = postPaths.map(async (post) => {
    const content = await readFile(post, 'utf-8')
    return {
      content,
      slug: post.split('/').slice(-2, -1)[0]!,
    }
  })

  const posts = await Promise.all(postPromises)

  return posts
}

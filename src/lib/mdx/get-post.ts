import { readFile } from 'fs/promises'
import path from 'path'

export async function getPost(slug: string) {
  const postPath = path.join(process.cwd(), 'src/content/posts', slug, 'page.mdx')
  const content = await readFile(postPath, 'utf-8')
  return content
}

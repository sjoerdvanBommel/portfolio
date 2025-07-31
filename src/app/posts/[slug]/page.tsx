// import { WebContainerProvider } from '@/components/providers/web-container-provider'
import { stripMarkersRecursively } from '@/lib/mdx/code-block/strip-markers'
import { getRecentPosts } from '@/lib/mdx/posts/get-recent-posts'
import { readAllPostExampleFiles } from '@/lib/mdx/read-example-files'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { default: Post } = await import(`@/content/${slug}/page.mdx`)

  const files = readAllPostExampleFiles(slug)

  stripMarkersRecursively(files)

  return (
    // <WebContainerProvider files={files} initCommand={['npm', 'i', 'typescript']}>
    <Post />
    // </WebContainerProvider>
  )
}

// TODO: can this be re-enabled?
export async function generateStaticParams() {
  const recentPosts = await getRecentPosts()

  return recentPosts.map((post) => ({ slug: post.slug }))
}

export const dynamicParams = false

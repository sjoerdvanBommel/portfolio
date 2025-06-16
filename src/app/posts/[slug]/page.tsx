import { getRecentPosts } from '@/lib/mdx/get-recent-posts'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { default: Post } = await import(`@/content/${slug}/page.mdx`)

  return <Post />
}

export async function generateStaticParams() {
  const recentPosts = await getRecentPosts()

  return recentPosts.map((post) => ({ slug: post.slug }))
}

export const dynamicParams = false

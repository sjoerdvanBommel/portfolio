import { H1 } from '@/components/headings'
import { PostSection } from '@/components/post-section'
import { getRecentPosts } from '@/lib/mdx/posts/get-recent-posts'
import { css } from '@/styled-system/css'

export default async function Posts() {
  const posts = await getRecentPosts()

  return (
    <>
      <H1>Posts</H1>
      <div className={postsContainerStyle}>
        {posts.map((post) => (
          <PostSection key={post.slug} post={post} />
        ))}
      </div>
    </>
  )
}

const postsContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '12',
})

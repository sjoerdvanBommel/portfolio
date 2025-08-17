import { H2 } from '@/components/headings/headings'
import { PostSection } from '@/components/post-section'
import { getRecentPosts } from '@/lib/mdx/posts/get-recent-posts'
import { css } from '@/styled-system/css'

export default async function PostsSection() {
  const posts = await getRecentPosts()

  return (
    <div className={categoryContainerStyle}>
      <div>
        <H2 className={subtitleStyle}>📚 Posts</H2>
        <p className={descriptionStyle}>Deep dives into TypeScript topics.</p>
      </div>

      {posts.map((post) => (
        <PostSection key={post.slug} post={post} />
      ))}
    </div>
  )
}

const categoryContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4',
})

const subtitleStyle = css({
  fontSize: '1.5rem',
  my: 0,
})

const descriptionStyle = css({
  color: 'var(--gray-11)',
})

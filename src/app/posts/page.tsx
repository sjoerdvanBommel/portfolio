import { getRecentPosts } from '@/lib/mdx/get-recent-posts'
import { css } from '@/styled-system/css'
import { Heading } from '@radix-ui/themes'
import { gradientText } from '../styles/globals'

export default async function Posts() {
  const files = await getRecentPosts()

  return (
    <>
      <Heading className={`${gradientText} ${headingStyle}`} mt="8" mb="4">
        Posts
      </Heading>
      {files.map(({ slug, metadata }) => (
        <a key={slug} href={`/posts/${slug}`}>
          {metadata.title}
        </a>
      ))}
    </>
  )
}

const headingStyle = css({
  marginTop: '4',
})

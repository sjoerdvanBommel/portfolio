import { getRecentPosts } from '@/lib/mdx/get-recent-posts'
import { css } from '@/styled-system/css'
import { Heading, Section, Strong, Text } from '@radix-ui/themes'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { gradientText } from '../styles/globals'

export default async function Posts() {
  const files = await getRecentPosts()

  return (
    <>
      <Heading className={css(gradientText)} mt="8" mb="4" size="6">
        Posts
      </Heading>
      {files.map(({ slug, metadata }) => (
        <Section key={slug} size="1">
          <Link className={linkStyle} href={`/posts/${slug}`}>
            <Heading as="h2" size="4" mb="2" className={subheadingStyle}>
              {metadata.title}
            </Heading>
            <Text className={descriptionStyle}>{metadata.description}</Text>
            <Text className={readMoreStyle} mt="2">
              <Strong className={readMoreTextStyle}>
                {metadata.readMoreText ?? 'Read more'} <ArrowRight className={arrowRightStyle} />
              </Strong>
            </Text>
          </Link>
        </Section>
      ))}
    </>
  )
}

const linkStyle = css({
  pointerEvents: 'none',
})

const subheadingStyle = css({
  pointerEvents: 'auto',
  width: 'fit-content',
})

const descriptionStyle = css({
  userSelect: 'text',
})

const arrowRightStyle = css({
  display: 'inline-block',
  width: '1.125rem',
  height: '1.125rem',
  transform: 'translateY(-1px)',
  color: 'var(--accent-10)',
})

const readMoreStyle = css({
  display: 'block',
  pointerEvents: 'none',
})

const readMoreTextStyle = css({
  ...gradientText,
  '--from': 'var(--accent-11)',
  '--to': 'var(--accent-9)',
  pointerEvents: 'auto',
})

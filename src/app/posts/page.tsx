import { getRecentPosts } from '@/lib/mdx/get-recent-posts'
import { css, cx } from '@/styled-system/css'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { gradientText } from '../styles/globals'

export default async function Posts() {
  const files = await getRecentPosts()

  return (
    <>
      <h1 className={cx(css(gradientText), headingStyle)}>Posts</h1>
      <div className={postsContainerStyle}>
        {files.map(({ slug, metadata }) => (
          <section key={slug}>
            <Link className={linkStyle} href={`/posts/${slug}`}>
              <h2 className={subheadingStyle}>{metadata.title}</h2>
              <p className={descriptionStyle}>{metadata.description}</p>
              <span className={readMoreStyle}>
                <strong className={readMoreTextStyle}>
                  {metadata.readMoreText ?? 'Read more'} <ArrowRight className={arrowRightStyle} />
                </strong>
              </span>
            </Link>
          </section>
        ))}
      </div>
    </>
  )
}

const headingStyle = css({
  my: '4',
  fontSize: 'xl',
  fontWeight: 'bold',
})

const postsContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '12',
})

const linkStyle = css({
  pointerEvents: 'none',
})

const subheadingStyle = css({
  pointerEvents: 'auto',
  fontSize: 'xl',
  fontWeight: 'bold',
  mb: '2',
})

const descriptionStyle = css({
  userSelect: 'text',
})

const arrowRightStyle = css({
  display: 'inline-block',
  width: '1.125rem',
  height: '1.125rem',
  transform: 'translateY(-1px)',
  color: 'var(--accent-11)',
})

const readMoreStyle = css({
  display: 'inline-block',
  mt: '2',
  pointerEvents: 'none',
})

const readMoreTextStyle = css({
  ...gradientText,
  '--from': 'var(--accent-12)',
  '--to': 'var(--accent-11)',
  pointerEvents: 'auto',
})

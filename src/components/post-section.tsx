import { gradientText } from '@/app/styles/globals'
import { Post } from '@/lib/mdx/posts/get-recent-posts'
import { css } from '@/styled-system/css'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { H2 } from './headings/headings'

export function PostSection({ post }: { post: Post }) {
  const { slug, metadata } = post

  return (
    <section key={slug}>
      <Link className={linkStyle} href={`/posts/${slug}`}>
        <H2 className={subheadingStyle}>{metadata.title}</H2>
        <p className={descriptionStyle}>{metadata.description}</p>
        <span className={readMoreStyle}>
          <strong className={readMoreTextStyle}>
            {metadata.readMoreText ?? 'Read more'} <ArrowRight className={arrowRightStyle} />
          </strong>
        </span>
      </Link>
    </section>
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
  color: 'var(--accent-11)',
})

const readMoreStyle = css({
  display: 'inline-block',
  mt: '2',
  pointerEvents: 'none',
})

const readMoreTextStyle = css({
  ...gradientText,
  pointerEvents: 'auto',
})

import { gradientText } from '@/app/styles/globals'
import { css, cx } from '@/styled-system/css'
import { LinkIcon } from './link-icon'

export function H1(props: React.HTMLAttributes<HTMLHeadingElement>) {
  const { className, ...restProps } = props
  return (
    <HeadingWithIcon
      as="h1"
      className={cx(css(gradientText), headingStyle, className)}
      {...restProps}
    />
  )
}

export function H2(props: React.HTMLAttributes<HTMLHeadingElement>) {
  const { className, ...restProps } = props
  return <HeadingWithIcon as="h2" className={cx(subheadingStyle, className)} {...restProps} />
}

export function ColoredH2(props: React.HTMLAttributes<HTMLHeadingElement>) {
  const { className, ...restProps } = props
  return (
    <HeadingWithIcon
      as="h2"
      className={cx(subheadingStyle, css(gradientText), className)}
      {...restProps}
    />
  )
}

export function H3(props: React.HTMLAttributes<HTMLHeadingElement>) {
  const { className, ...restProps } = props
  return <HeadingWithIcon as="h3" className={cx(heading3Style, className)} {...restProps} />
}

function generateAnchorId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim()
}

function HeadingWithIcon({
  as: Component,
  children,
  className,
  ...restProps
}: {
  as: 'h1' | 'h2' | 'h3'
  children?: React.ReactNode
  className?: string
} & React.HTMLAttributes<HTMLHeadingElement>) {
  const headingId = typeof children === 'string' ? generateAnchorId(children) : undefined

  return (
    <Component {...restProps} id={headingId} className={cx(headingContainerStyle, className)}>
      <span>{children}</span>
      {headingId && <LinkIcon headingId={headingId} />}
    </Component>
  )
}

const headingStyle = css({
  my: '4',
  fontSize: 'xl',
  fontWeight: 'bold',
})

const subheadingStyle = css({
  my: '2',
  fontSize: 'md',
  fontWeight: 'bold',
})

const heading3Style = css({
  my: '2',
  fontSize: 'md',
})

const headingContainerStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '2',
  position: 'relative',
  scrollMarginTop: 'calc(var(--header-height) + 1rem)',
  '&:hover .link-icon': {
    opacity: 1,
    visibility: 'visible',
  },
})

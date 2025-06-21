import { gradientText } from '@/app/styles/globals'
import { css, cx } from '@/styled-system/css'

export function H1(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 {...props} className={cx(css(gradientText), headingStyle)} />
}

export function H2(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 {...props} className={`${subheadingStyle} ${props.className}`} />
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

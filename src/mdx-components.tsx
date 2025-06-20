import { mdxComponents } from '@/components/mdx'
import { css, cx } from '@/styled-system/css'
import type { MDXComponents } from 'mdx/types'
import { gradientText } from './app/styles/globals'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: (props) => <h1 {...props} className={cx(css(gradientText), headingStyle)} />,
    h2: (props) => <h2 {...props} className={subheadingStyle} />,
    ...mdxComponents,
  }
}

const headingStyle = css({
  my: '4',
  fontSize: 'xl',
  fontWeight: 'bold',
})

const subheadingStyle = css({
  my: '2',
  fontSize: 'lg',
  fontWeight: 'bold',
})

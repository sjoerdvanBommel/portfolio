import { mdxComponents } from '@/components/mdx'
import { Heading, HeadingProps } from '@radix-ui/themes'
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: (props) => <Heading {...props} color={props.color as HeadingProps['color']} />,
    ...mdxComponents,
  }
}

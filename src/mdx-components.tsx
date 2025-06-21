import { mdxComponents } from '@/components/mdx'
import type { MDXComponents } from 'mdx/types'
import { H1, H2 } from './components/headings'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: H1,
    h2: H2,
    ...mdxComponents,
  }
}

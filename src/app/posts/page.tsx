import type { Metadata } from 'next'
import PostsSection from './posts-section'

export const metadata: Metadata = {
  title: 'Blog Posts',
  description:
    'Read in-depth articles about TypeScript, JavaScript, React, and web development. Learn advanced concepts and best practices from a Senior Software Engineer.',
  openGraph: {
    title: 'Blog Posts by Sjoerd van Bommel',
    description:
      'Read in-depth articles about TypeScript, JavaScript, React, and web development. Learn advanced concepts and best practices from a Senior Software Engineer.',
    url: 'https://sjoerdvanbommel.com/posts',
  },
  twitter: {
    title: 'Blog Posts by Sjoerd van Bommel',
    description:
      'Read in-depth articles about TypeScript, JavaScript, React, and web development. Learn advanced concepts and best practices.',
  },
}

export default function Posts() {
  return <PostsSection />
}

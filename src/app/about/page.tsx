import { ColoredH2 } from '@/components/headings/headings'
import { SocialMediaIcons } from '@/components/social-media-icons'
import { A } from '@/components/text'
import { css } from '@/styled-system/css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn more about Sjoerd van Bommel - Senior Software Engineer at Cimpress Technology, TypeScript expert, and creator of educational content about web development.',
  openGraph: {
    title: 'About Sjoerd van Bommel',
    description:
      'Learn more about Sjoerd van Bommel - Senior Software Engineer at Cimpress Technology, TypeScript expert, and creator of educational content about web development.',
    url: 'https://sjoerdvanbommel.com/about',
  },
  twitter: {
    title: 'About Sjoerd van Bommel',
    description:
      'Learn more about Sjoerd van Bommel - Senior Software Engineer at Cimpress Technology, TypeScript expert, and creator of educational content about web development.',
  },
}

export default function AboutPage() {
  return (
    <article className={containerStyle}>
      <section className={containerStyle}>
        <p>Hey all 👋</p>
        <p>
          My name is <strong>Sjoerd</strong>, and I&apos;m blessed to work in the industry that
          I&apos;m passionate about. I&apos;ve been building software since{' '}
          <time dateTime="2018">2018</time>. I prefer to gain deep knowledge about 1 topic over
          shallow knowledge about many topics. This is why I focus on truly understanding
          <strong> TypeScript</strong>, and sharing this knowledge with you in an understandable
          way.
        </p>
        <p>
          I like to surround myself with similar minded people, and I&apos;m always looking for new
          challenges, both in my personal and professional life.
        </p>
        <p>
          In the past, I&apos;ve worked on developing packages, frontend apps, backend APIs, cloud
          infrastructure and AI integrations. I&apos;m currently working as a{' '}
          <strong>Senior Software Engineer</strong> at{' '}
          <A href="https://www.cimpress.com">Cimpress Technology</A>. I create{' '}
          <strong>YouTube content</strong> and
          <strong> blog posts</strong> about web development. I&apos;m a remote worker, living in
          the <strong>Netherlands</strong>.
        </p>
      </section>

      <section className={containerStyle}>
        <ColoredH2>Contact</ColoredH2>
        <p>
          Time is precious, so I&apos;m not spending much time on social media platforms. But once
          in a while, I will read my messages. I&apos;m most active on <strong>LinkedIn</strong>.
        </p>
        <SocialMediaIcons />
      </section>
    </article>
  )
}

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4',
})

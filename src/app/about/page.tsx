import { A } from '@/components/text'
import { css } from '@/styled-system/css'

export default function AboutPage() {
  return (
    <div className={containerStyle}>
      <p>Hey all 👋</p>

      <p>
        My name is Sjoerd, and I&apos;m blessed to work in the industry that I&apos;m passionate
        about. I&apos;ve been building software solutions since 2018. I prefer to gain deep
        knowledge about 1 topic over shallow knowledge about many topics. This is why I focus on
        truly understanding TypeScript.
      </p>

      <p>
        I like to surround myself with similar minded people, and I&apos;m always looking for new
        challenges, both in my personal and professional life.
      </p>

      <p>
        In the past, I&apos;ve worked on developing packages, frontend apps, backend APIs, cloud
        infrastructure and AI integrations. I&apos;m currently working as a Senior Software Engineer
        at <A href="https://www.cimpress.com">Cimpress Technology</A>. I create YouTube content and
        blog posts about web development. I&apos;m a remote worker, living in the Netherlands.
      </p>
    </div>
  )
}

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4',
})

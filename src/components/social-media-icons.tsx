'use client'

import { css } from '@/styled-system/css'
import { EmailIcon } from './icons/social-media/email-icon'
import { GitHubIcon } from './icons/social-media/github-icon'
import { LinkedInIcon } from './icons/social-media/linkedin-icon'
import { XIcon } from './icons/social-media/x-icon'
import { YouTubeIcon } from './icons/social-media/youtube-icon'

// Social Media Links Data
const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/sjoerd-van-bommel-8a232914a',
    icon: LinkedInIcon,
  },
  {
    name: 'X',
    url: 'https://x.com/threeveloper',
    icon: XIcon,
  },
  {
    name: 'GitHub',
    url: 'https://github.com/sjoerdvanbommel',
    icon: GitHubIcon,
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@threeveloper',
    icon: YouTubeIcon,
  },
  {
    name: 'Email',
    url: 'mailto:sjoerd@sjoerdvanbommel.com',
    icon: EmailIcon,
  },
]

export function SocialMediaIcons() {
  return (
    <div className={containerStyle}>
      {socialLinks.map(({ name, url, icon: Icon }) => (
        <SocialIconLink key={name} name={name} url={url} Icon={Icon} />
      ))}
    </div>
  )
}

function SocialIconLink({
  name,
  url,
  Icon,
}: {
  name: string
  url: string
  Icon: () => JSX.Element
}) {
  return (
    <a
      href={url}
      className={iconLinkStyle}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${name} profile`}
    >
      <Icon />
    </a>
  )
}

const containerStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '6',
  marginTop: '4',
})

const iconLinkStyle = css({
  fill: 'var(--slate-11)',
  padding: '2',

  '&:hover': {
    '& svg': {
      fill: 'url(#gradient)',
    },
  },
})

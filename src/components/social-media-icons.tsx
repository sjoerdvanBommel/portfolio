'use client'

import { css } from '@/styled-system/css'
import { socialLinks } from './footer'

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
  padding: '1',

  sm: {
    padding: '2',
  },

  '&:hover': {
    '& svg': {
      fill: 'url(#gradient)',
    },
  },
})

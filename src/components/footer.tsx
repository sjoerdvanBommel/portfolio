'use client'

import { css } from '@/styled-system/css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { EmailIcon, GitHubIcon, InstagramIcon, LinkedInIcon, XIcon, YouTubeIcon } from './icons'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Posts', href: '/posts' },
  { label: 'Videos', href: '/videos' },
  { label: 'About', href: '/about' },
]

export const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/sjoerd-van-bommel-8a232914a',
    icon: LinkedInIcon,
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
    name: 'Instagram',
    url: 'https://www.instagram.com/sjoerdvanbommel',
    icon: InstagramIcon,
  },
  {
    name: 'X',
    url: 'https://x.com/threeveloper',
    icon: XIcon,
  },
  {
    name: 'Email',
    url: 'mailto:sjoerd@sjoerdvanbommel.com',
    icon: EmailIcon,
  },
]

export default function Footer() {
  const pathname = usePathname()
  const currentYear = new Date().getFullYear()

  const isActivePath = (href: string) =>
    pathname === href || (href.length > 1 && pathname.startsWith(href))

  return (
    <footer className={`${footerStyle} full-bleed`}>
      <div className={footerContentStyle}>
        {/* Main Footer Content */}
        <div className={footerMainStyle}>
          {/* Brand/Title */}
          <div className={brandSectionStyle}>
            <Link href="/" className={brandLinkStyle}>
              Sjoerd van Bommel
            </Link>
            <p className={brandDescriptionStyle}>
              Senior Software Engineer sharing TypeScript knowledge and web development insights.
            </p>
          </div>

          {/* Navigation Links */}
          <div className={sectionStyle}>
            <h3 className={sectionTitleStyle}>Navigation</h3>
            <nav className={navListStyle}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${navLinkStyle} ${isActivePath(item.href) ? activeNavLinkStyle : ''}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Media */}
          <div className={sectionStyle}>
            <h3 className={sectionTitleStyle}>Connect</h3>
            <div className={socialLinksStyle}>
              {socialLinks.map(({ name, url, icon: Icon }) => (
                <a
                  key={name}
                  href={url}
                  className={socialLinkStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${name} profile`}
                >
                  <Icon />
                  <span className={socialLinkTextStyle}>{name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Work Info */}
          <div className={sectionStyle}>
            <h3 className={sectionTitleStyle}>Work</h3>
            <div className={workInfoStyle}>
              <p>Senior Software Engineer</p>
              <a
                href="https://www.cimpress.com"
                target="_blank"
                rel="noopener noreferrer"
                className={workLinkStyle}
              >
                Cimpress Technology
              </a>
              <p className={locationStyle}>Remote • Netherlands</p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={footerBottomStyle}>
          <div className={copyrightStyle}>
            © {currentYear} Sjoerd van Bommel. All rights reserved.
          </div>
          <div className={builtWithStyle}>
            Statically built with <a href="https://nextjs.org">Next.js</a>,{' '}
            <a href="https://www.typescriptlang.org">TypeScript</a> &{' '}
            <a href="https://panda-css.com">Panda CSS</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Styles
const footerStyle = css({
  backgroundColor: 'var(--slate-2)',
  borderTop: '1px solid var(--slate-3)',
  marginTop: 'auto',
  paddingInline: '4',

  sm: {
    paddingInline: '16',
  },
})

const footerContentStyle = css({
  gridColumn: '2',
  paddingBlock: '2rem',
})

const footerMainStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '2rem',
  marginBottom: '2rem',
  sm: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '3rem',
  },
  md: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
})

const brandSectionStyle = css({
  sm: {
    gridColumn: 'span 3',
  },
  md: {
    gridColumn: 'span 1',
  },
})

const brandLinkStyle = css({
  fontSize: 'lg',
  fontWeight: 'bold',
  color: 'var(--slate-12)',
  textDecoration: 'none',
  display: 'block',
  marginBottom: '0.5rem',
  transition: 'color 0.2s ease',
  '&:hover': {
    color: 'var(--accent-11)',
  },
})

const brandDescriptionStyle = css({
  color: 'var(--slate-11)',
  fontSize: 'sm',
  lineHeight: '1.5',
})

const sectionStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
})

const sectionTitleStyle = css({
  fontSize: 'sm',
  fontWeight: '600',
  color: 'var(--slate-12)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: '0.5rem',
})

const navListStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
})

const navLinkStyle = css({
  color: 'var(--slate-11)',
  textDecoration: 'none',
  fontSize: 'sm',
  transition: 'color 0.2s ease',
  '&:hover': {
    color: 'var(--slate-12)',
  },
})

const activeNavLinkStyle = css({
  color: 'var(--accent-11)',
  fontWeight: '500',
})

const socialLinksStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
})

const socialLinkStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: 'var(--slate-11)',
  textDecoration: 'none',
  fontSize: 'sm',
  transition: 'all 0.2s ease',
  fill: 'var(--slate-11)',
  '&:hover': {
    color: 'var(--slate-12)',
    '& svg': {
      fill: 'url(#gradient)',
    },
  },
})

const socialLinkTextStyle = css({
  fontSize: 'sm',
})

const workInfoStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  fontSize: 'sm',
  color: 'var(--slate-11)',
})

const workLinkStyle = css({
  color: 'var(--accent-10)',
  textDecoration: 'none',
  transition: 'color 0.2s ease',
  '&:hover': {
    color: 'var(--accent-11)',
  },
})

const locationStyle = css({
  fontSize: 'xs',
  color: 'var(--slate-10)',
})

const footerBottomStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  paddingTop: '2rem',
  borderTop: '1px solid var(--slate-3)',
  alignItems: 'center',
  textAlign: 'center',
  sm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'left',
  },
})

const copyrightStyle = css({
  fontSize: 'xs',
  color: 'var(--slate-10)',
})

const builtWithStyle = css({
  fontSize: 'xs',
  color: 'var(--slate-10)',
})

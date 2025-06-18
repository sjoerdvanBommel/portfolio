'use client'

import { css } from '@/styled-system/css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavigationMenu } from 'radix-ui'

export default function Header() {
  const pathname = usePathname()

  const navItems = [
    { label: 'Posts', href: '/posts' },
    { label: 'About me', href: '/about' },
  ]

  return (
    <>
      <header className={headerStyle}>
        <Link className={headingStyle} href="/">
          Sjoerd van Bommel
        </Link>
        <NavigationMenu.Root>
          <NavigationMenu.List className={navigationMenuListStyle}>
            {navItems.map((item) => (
              <NavigationMenu.Item key={item.href}>
                <NavigationMenu.Link active={pathname.startsWith(item.href)} href={item.href}>
                  {item.label}
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </header>
      <div className={`${dividerStyle} full-bleed`} />
    </>
  )
}

const headingStyle = css({
  fontSize: '2xl',
  fontWeight: 'bold',
})

const headerStyle = css({
  position: 'sticky',
  top: 0,
  width: '100%',
  zIndex: 2,
  backdropFilter: 'blur(4px)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const dividerStyle = css({
  height: '1px',
  borderBottom: '1px solid var(--gray-3)',
})

const navigationMenuListStyle = css({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  '& a': {
    padding: '1.5rem',
    display: 'inline-block',
    '&[aria-current="page"]': {
      color: `var(--accent-10)`,
    },
  },
  transform: 'translate(1.5rem)',
})

'use client'

import { iconButtonStyle } from '@/app/styles/globals'
import { css, cx } from '@/styled-system/css'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavigationMenu } from 'radix-ui'
import { useEffect, useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Posts', href: '/posts' },
    { label: 'Videos', href: '/videos' },
    { label: 'About me', href: '/about' },
  ]

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setShouldAnimate(false)
    setIsClosing(false)
  }, [pathname])

  // Handle animation timing when mobile menu opens
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsClosing(false)
      // Small delay to ensure the menu is visible before animating
      const timer = setTimeout(() => {
        setShouldAnimate(true)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setShouldAnimate(false)
    }
  }, [isMobileMenuOpen])

  // Handle closing animation
  const handleCloseMenu = () => {
    setIsClosing(true)
    setShouldAnimate(false)

    // Wait for animation to complete before actually closing
    setTimeout(() => {
      setIsMobileMenuOpen(false)
      setIsClosing(false)
    }, 300) // Match the transition duration
  }

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // This will not catch all nested dynamic routes, but works for now
  const isActivePath = (href: string) =>
    pathname === href || (href.length > 1 && pathname.startsWith(href))

  return (
    <>
      <header className={`${headerStyle} full-bleed`}>
        <div className={headerContentStyle}>
          <Link className={headingStyle} href="/">
            Sjoerd van Bommel
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu.Root className={desktopNavStyle}>
            <NavigationMenu.List className={navigationMenuListStyle}>
              {navItems.map((item) => (
                <NavigationMenu.Item key={item.href}>
                  <NavigationMenu.Link
                    active={isActivePath(item.href)}
                    href={item.href}
                    className={navigationMenuLinkStyle}
                  >
                    {item.label}
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              ))}
            </NavigationMenu.List>
          </NavigationMenu.Root>

          {/* Mobile Menu Button */}
          <button
            className={cx(iconButtonStyle, mobileMenuButtonStyle)}
            onClick={() => (isMobileMenuOpen ? handleCloseMenu() : setIsMobileMenuOpen(true))}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className={iconContainerStyle}>
              <Menu
                className={`${menuIconStyle} ${isMobileMenuOpen ? hiddenIconStyle : visibleIconStyle}`}
                size={24}
              />
              <X
                className={`${menuIconStyle} ${isMobileMenuOpen ? visibleIconStyle : hiddenIconStyle}`}
                size={24}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`${mobileMenuOverlayStyle} ${isMobileMenuOpen || isClosing ? mobileMenuOpenStyle : mobileMenuClosedStyle}`}
      >
        <nav className={mobileNavStyle}>
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => (isActivePath(item.href) ? handleCloseMenu() : undefined)}
              className={`${mobileNavLinkStyle} ${isActivePath(item.href) ? activeNavLinkStyle : ''} ${shouldAnimate ? 'animate' : ''}`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

const headingStyle = css({
  fontSize: 'xl',
  fontWeight: 'bold',
  sm: {
    fontSize: '2xl',
  },
})

const headerStyle = css({
  position: 'sticky',
  top: 0,
  height: 'var(--header-height)',
  paddingInline: 'var(--global-margin)',
  zIndex: 2,
  backdropFilter: 'blur(4px)',
  borderBottom: '1px solid var(--gray-3)',
  display: 'grid',
  gridTemplateColumns: '1fr min(42rem, 100%) 1fr',
})

const headerContentStyle = css({
  gridColumn: '2',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const desktopNavStyle = css({
  display: 'none',
  sm: {
    display: 'block',
  },
})

const navigationMenuLinkStyle = css({
  padding: '1.5rem',
  display: 'inline-block',
  transition: 'all 0.2s ease',
  '&[aria-current="page"]': {
    color: 'var(--accent-11)',
  },
})

const navigationMenuListStyle = css({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
})

const mobileMenuButtonStyle = css({
  display: 'block',
  sm: {
    display: 'none',
  },
})

const iconContainerStyle = css({
  position: 'relative',
  width: '24px',
  height: '24px',
})

const menuIconStyle = css({
  position: 'absolute',
  top: 0,
  transition: 'all 0.3s ease',
})

const visibleIconStyle = css({
  opacity: 1,
  transform: 'rotate(0deg) scale(1)',
})

const hiddenIconStyle = css({
  opacity: 0,
  transform: 'rotate(90deg) scale(0.8)',
})

const mobileMenuOverlayStyle = css({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'var(--gray-1)',
  backdropFilter: 'blur(8px)',
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  sm: {
    display: 'none',
  },
})

const mobileMenuOpenStyle = css({
  opacity: 1,
  visibility: 'visible',
})

const mobileMenuClosedStyle = css({
  opacity: 0,
  visibility: 'hidden',
})

const mobileNavStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2rem',
})

const mobileNavLinkStyle = css({
  fontSize: '2rem',
  fontWeight: '500',
  padding: '1rem 2rem',
  width: '100%',
  textAlign: 'center',
  transition: 'all 0.3s ease',
  opacity: 0,
  transform: 'translateY(20px)',
  '&.animate': {
    opacity: 1,
    transform: 'translateY(0)',
  },
})

const activeNavLinkStyle = css({
  color: 'var(--accent-11)',
})

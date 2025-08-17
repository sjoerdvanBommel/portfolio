'use client'
import { css, cx } from '@/styled-system/css'
import { Link } from 'lucide-react'
import { useState } from 'react'

export function LinkIcon({ headingId }: { headingId: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.preventDefault()
    const url = `${window.location.origin}${window.location.pathname}#${headingId}`

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  return (
    <button
      onClick={handleCopyLink}
      className={cx(linkIconStyle, 'link-icon')}
      title={copied ? 'Copied!' : 'Copy link to section'}
      aria-label={copied ? 'Link copied' : 'Copy link to this section'}
    >
      <Link size={16} />
    </button>
  )
}

const linkIconStyle = css({
  opacity: 0,
  visibility: 'hidden',
  transition: 'opacity 0.2s ease, visibility 0.2s ease',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: '1',
  borderRadius: 'sm',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'gray.600',
  '&:hover': {
    color: 'gray.100',
  },
  '&:focus': {
    outline: '2px solid',
    outlineColor: 'gray.700',
    outlineOffset: '1px',
  },
})

import { css } from '@/styled-system/css'

export const gradientText = {
  background:
    'linear-gradient(to bottom right, var(--from, var(--primary-10)), var(--to, var(--secondary-11)))',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}

export const iconButtonStyle = css({
  cursor: 'pointer',
  padding: '0.5rem',
  borderRadius: '0.5rem',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'var(--gray-3)',
  },
  '&:focus': {
    outline: '2px solid var(--accent-8)',
    outlineOffset: '2px',
  },
})

import { css } from '@/styled-system/css'

export const gradientText = css({
  background: 'linear-gradient(to bottom right, var(--primary-9), var(--secondary-10))',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
})

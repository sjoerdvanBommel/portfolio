import { css } from '@/styled-system/css'

interface ModifiedDotProps {
  className?: string
}

const modifiedDotStyle = css({
  width: '2',
  height: '2',
  position: 'relative',
  top: '1px',
  borderRadius: 'full',
  bg: 'orange.500',
  flexShrink: '0',
})

export function ModifiedDot({ className }: ModifiedDotProps) {
  return <div className={`${modifiedDotStyle} ${className || ''}`} />
}

import { css, cx } from '@/styled-system/css'

interface ModifiedDotProps {
  className?: string
  type: 'added' | 'modified'
}

const dotColorStyle = (type: 'added' | 'modified') =>
  css({
    bg: type === 'added' ? 'green.500' : 'orange.500',
  })

const modifiedDotStyle = css({
  width: '2',
  height: '2',
  position: 'relative',
  top: '1px',
  borderRadius: 'full',
  flexShrink: '0',
})

export function ModifiedDot({ type, className }: ModifiedDotProps) {
  return <div className={cx(modifiedDotStyle, dotColorStyle(type), className)} />
}

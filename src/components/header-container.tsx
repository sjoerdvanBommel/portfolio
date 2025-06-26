import { css } from '@/styled-system/css'

export interface HeaderContainerProps {
  headerChildren: React.ReactNode
  children: React.ReactNode
}

export function HeaderContainer({ headerChildren, children }: HeaderContainerProps) {
  return (
    <div className={containerStyle}>
      <div className={headerStyle}>{headerChildren}</div>
      {children}
    </div>
  )
}

const containerStyle = css({
  my: '4',
  border: '1px solid',
  borderColor: 'gray.800',
  borderRadius: 'lg',
  overflow: 'hidden',
})

const headerStyle = css({
  display: 'flex',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderColor: 'gray.800',
  bg: 'gray.900',
})

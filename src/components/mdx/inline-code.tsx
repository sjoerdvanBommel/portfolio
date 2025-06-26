import { css } from '@/styled-system/css'
import React from 'react'

interface InlineCodeProps {
  children?: React.ReactNode
}

const inlineCodeStyle = css({
  mx: '0.5',
  px: '0.5',
  py: '0.2',
  borderRadius: 'sm',
  borderWidth: '1px',
  borderColor: 'gray.200/25',
  fontSize: '0.875rem',
  fontFamily: 'mono',
  textWrap: 'auto',
})

export const InlineCode: React.FC<InlineCodeProps> = ({ children }) => {
  return <code className={inlineCodeStyle}>{children}</code>
}

export default InlineCode

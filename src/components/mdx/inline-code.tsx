import { COLORS } from '@/lib/mdx/styles/colors'
import { SPACING } from '@/lib/mdx/styles/spacing'
import { css } from '@/styled-system/css'
import React from 'react'

interface InlineCodeProps {
  children: React.ReactNode
}

const inlineCodeStyle = css({
  mx: SPACING['0.5'],
  px: SPACING['0.5'],
  py: SPACING['0.5'],
  borderRadius: SPACING['1'],
  background: COLORS.gray['2'],
  color: COLORS.orange['8'],
  fontFamily: 'mono',
})

export const InlineCode: React.FC<InlineCodeProps> = ({ children }) => {
  return <code className={inlineCodeStyle}>{children}</code>
}

export default InlineCode

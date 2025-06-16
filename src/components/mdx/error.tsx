import { COLORS } from '@/lib/mdx/styles/colors'
import { SPACING } from '@/lib/mdx/styles/spacing'
import { css } from '@/styled-system/css'
import React from 'react'

const outerContainer = css({
  pl: SPACING['12'],
  pr: SPACING['8'],
  py: SPACING['8'],
  my: SPACING['16'],
  borderRadius: SPACING['1'],
  background: COLORS.red['9'], // TODO: OPACITY 20%
  borderLeft: `3px solid ${COLORS.red['9']}`,
})

export const Error = ({ children }: { children: React.ReactNode }) => (
  <div className={outerContainer}>{children}</div>
)

import { css, cx } from '@/styled-system/css'
import React from 'react'

export const Blockquote = ({ children }: { children?: React.ReactNode }) => (
  <div className={cx(outerContainerStyle, blockquoteStyle)}>{children}</div>
)

export const Error = ({ children }: { children: React.ReactNode }) => (
  <div className={cx(outerContainerStyle, errorStyle)}>{children}</div>
)

export const Info = ({ children }: { children: React.ReactNode }) => (
  <div className={cx(outerContainerStyle, infoStyle)}>{children}</div>
)

export const Note = ({ children }: { children: React.ReactNode }) => (
  <div className={cx(outerContainerStyle, noteStyle)}>{children}</div>
)

const errorStyle = css({
  background: 'red.800/20',
  borderColor: 'red.900',
})

const infoStyle = css({
  background: 'blue.800/20',
  borderColor: 'blue.900',
})

const noteStyle = css({
  background: 'amber.800/20',
  borderColor: 'amber.900',
})

const blockquoteStyle = css({
  background: 'gray.800/20',
  borderColor: 'gray.500',
})

const outerContainerStyle = css({
  px: '1rem',
  py: '0.5rem',
  my: '1rem',
  borderLeftWidth: '4px',
})

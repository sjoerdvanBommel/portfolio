'use client'

import { COLORS } from '@/lib/mdx/styles/colors'
import { SPACING } from '@/lib/mdx/styles/spacing'
import { css } from '@/styled-system/css'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

interface TimelineEntryProps {
  title: string
  children: React.ReactNode
  isLast?: boolean
  date: Date
  emoji?: string
  icon?: string
}

export const TimelineEntry: React.FC<TimelineEntryProps> = ({
  title,
  children,
  date,
  isLast,
  emoji,
  icon,
}) => {
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className={css({
        position: 'relative',
        left: SPACING['-8'],
        top: SPACING['2'],
      })}
    >
      <div
        className={css({
          position: 'absolute',
          height: '100%',
          left: SPACING['-10'],
        })}
        style={{
          transform: `translateY(${SPACING['1.5']})`,
        }}
      >
        {/* Date text */}
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={css({
            position: 'absolute',
            left: SPACING['-11'],
            textAlign: 'right',
            top: SPACING['-0.5'],
            fontSize: '0.875rem',
            color: COLORS.gray['6'],
            whiteSpace: 'nowrap',
          })}
        >
          {formattedDate}
        </motion.span>
        {/* Emoji */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={css({
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem',
            top: icon ? SPACING['-0.5'] : SPACING['-1.5'],
          })}
        >
          {emoji ??
            (icon ? (
              <Image
                src={icon}
                alt={title}
                width={20}
                height={20}
                className={css({
                  verticalAlign: 'middle',
                })}
              />
            ) : (
              '⚡'
            ))}
        </motion.div>
        {/* Vertical line */}
        {!isLast && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            whileInView={{ opacity: 1, height: 'calc(100% - 1rem)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={css({
              position: 'absolute',
              top: SPACING['4'],
              my: SPACING['4'],
              left: '50%',
              transform: 'translateX(-50%)',
              width: SPACING['0.5'],
              color: 'var(--subtle-hover)',
            })}
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, currentColor 0 0.6rem, transparent 0.6rem 1.2rem)',
            }}
          />
        )}
      </div>

      {/* Content */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className={css({
          fontSize: '1.25rem',
          fontWeight: '600',
          marginBottom: SPACING['4'],
        })}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

interface TimelineProps {
  children: React.ReactElement<TimelineEntryProps>[]
  className?: string
}

export const Timeline: React.FC<TimelineProps> = ({ children, className }) => {
  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        isLast: index === React.Children.count(children) - 1,
      })
    }
    return child
  })

  return (
    <div
      className={
        css({
          display: 'flex',
          flexDirection: 'column',
          gap: SPACING['8'],
          paddingLeft: SPACING['8'],
        }) + (className ? ' ' + className : '')
      }
    >
      {childrenWithProps}
    </div>
  )
}

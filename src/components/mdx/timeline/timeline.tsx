'use client'

import { motion } from 'framer-motion'
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
      className="relative -left-8 top-2"
    >
      <div className="absolute h-full -left-10 translate-y-1.5">
        {/* Date text */}
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute -left-11 text-right -top-0.5 text-sm text-gray-400 whitespace-nowrap"
        >
          {formattedDate}
        </motion.span>
        {/* Emoji */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`relative flex items-center justify-center text-xl ${icon ? '-top-0.5' : '-top-1.5'}`}
        >
          {emoji ?? (icon ? <img src={icon} alt={title} className="w-5 h-5 align-middle" /> : '⚡')}
        </motion.div>
        {/* Vertical line */}
        {!isLast && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            whileInView={{ opacity: 1, height: 'calc(100% - 1rem)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute top-4 my-4 left-1/2 -translate-x-1/2 w-0.5 text-subtle-hover"
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
        className="text-xl font-semibold mb-4"
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

  return <div className={`space-y-8 pl-8 ${className ?? ''}`}>{childrenWithProps}</div>
}

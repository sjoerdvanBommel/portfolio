import { FileStructure } from '@/lib/mdx/code-block/types'
import { css } from '@/styled-system/css'

interface CodeDisplayProps {
  selectedFile: FileStructure | null
}

export function CodeDisplay({ selectedFile }: CodeDisplayProps) {
  if (!selectedFile?.highlightedHtml) return null

  return (
    <div className={containerStyle}>
      <div
        className={shikiCodeBlockStyle}
        dangerouslySetInnerHTML={{ __html: selectedFile.highlightedHtml }}
      />
    </div>
  )
}

const containerStyle = css({
  flex: '1',
  overflow: 'auto',
})

const shikiCodeBlockStyle = css({
  '& .shiki': {
    bg: 'transparent !important',
    p: '4 !important',
  },
  '& code': {
    display: 'block',
    width: '100%',
  },
  '& .line': {
    width: 'calc(100% + 2rem)',
    display: 'inline-block',
    mx: '-4',
    px: '4',

    // Hack to start a terminal with unfocused content
    // Can be used by starting a terminal output file with "// [!code focus:1]" followed by an empty line
    // This can be useful in cases where you slowly add more terminal output,
    // but only want to focus on a line later in the output
    '&.focused:has(span:empty)': {
      display: 'block',
      marginTop: '-1.5rem',
    },
  },
  '& code:has(.focused) > span:not(.focused)': {
    opacity: '0.6 !important',
  },
  '& pre': {
    py: '2 !important',
  },
  '& .highlighted': {
    bg: 'gray.700/50',
  },
  '& .add, & .remove': {
    position: 'relative',
    _before: {
      position: 'absolute',
      transform: 'translateX(-100%)',
      width: '3',
    },
  },
  '& .add': {
    bg: 'green.700/25',
    '&::before': {
      content: '"+"',
      color: 'green.500',
    },
  },
  '& .remove': {
    bg: 'red.700/25',
    '&::before': {
      content: '"-"',
      color: 'red.500',
    },
  },
  '& .highlighted-word': {
    borderRadius: 'md',
    border: '1px solid',
    borderColor: 'subtle-hover',
    py: '0.5',
  },
  '& span:not(:nth-last-child(1 of .highlighted-word)):nth-child(1 of .highlighted-word)': {
    borderTopRightRadius: '0',
    borderBottomRightRadius: '0',
    borderRight: '0',
    pl: '0.5',
  },
  '& span:not(:nth-child(1 of .highlighted-word)):nth-last-child(1 of .highlighted-word)': {
    borderTopLeftRadius: '0',
    borderBottomLeftRadius: '0',
    borderLeft: '0',
    pr: '0.5',
  },
  '& span:not(:nth-child(1 of .highlighted-word)):not(:nth-last-child(1 of .highlighted-word))': {
    borderLeft: '0',
    borderRight: '0',
    borderRadius: '0',
  },
})

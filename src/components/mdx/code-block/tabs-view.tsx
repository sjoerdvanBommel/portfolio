'use client'

import { getAllFiles } from '@/lib/mdx/code-block/get-all-files'
import { FileStructure } from '@/lib/mdx/code-block/types'
import { css } from '@/styled-system/css'
import { CodeDisplay } from './code-display'
import { ModifiedDot } from './modified-dot'

interface TabsViewProps {
  files: FileStructure[]
  selectedFile: FileStructure | null
  onSelectFile: (file: FileStructure) => void
  hideTabs?: boolean
}

const containerStyle = (hideTabs: boolean) =>
  css({
    flex: '1',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    ...(hideTabs ? { py: '2' } : {}),
  })

const tabsContainerStyle = css({
  display: 'flex',
  borderBottom: '1px solid',
  borderColor: 'gray.200',
  bg: 'gray.50',
  overflowX: 'auto',
  scrollbarWidth: 'thin',
  scrollbarColor: 'gray.300 transparent',
  _dark: {
    borderColor: 'gray.800',
    bg: 'gray.900',
    scrollbarColor: 'gray.700 transparent',
  },
  _hover: {
    scrollbarColor: 'gray.400 transparent',
    _dark: {
      scrollbarColor: 'gray.600 transparent',
    },
  },
})

const tabsWrapperStyle = css({
  display: 'flex',
  minWidth: '0',
})

const tabButtonStyle = (isSelected: boolean) =>
  css({
    cursor: 'pointer',
    px: '4 ',
    py: '2',
    fontSize: 'sm',
    fontWeight: 'medium',
    whiteSpace: 'nowrap',
    borderBottom: '2px solid',
    display: 'flex',
    alignItems: 'center',
    gap: '2',
    ...(isSelected
      ? {
          borderColor: 'blue.500',
          color: 'blue.500',
        }
      : {
          borderColor: 'transparent',
          color: 'gray.400',
          _hover: {
            color: 'gray.300',
          },
        }),
  })

export function TabsView({ files, selectedFile, onSelectFile, hideTabs = false }: TabsViewProps) {
  return (
    <div className={containerStyle(hideTabs)}>
      {!hideTabs && (
        <div className={tabsContainerStyle}>
          <div className={tabsWrapperStyle}>
            {getAllFiles(files).map((file) => (
              <button
                key={file.fullPath}
                className={tabButtonStyle(selectedFile?.name === file.name)}
                onClick={() => onSelectFile(file)}
              >
                {file.fullPath.replace(/^\//, '')}
                {file.metadata.isModified && <ModifiedDot />}
              </button>
            ))}
          </div>
        </div>
      )}

      <CodeDisplay>{selectedFile?.highlightedHtml}</CodeDisplay>
    </div>
  )
}

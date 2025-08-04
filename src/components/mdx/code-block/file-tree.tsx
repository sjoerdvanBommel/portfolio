'use client'

import { FileStructure } from '@/lib/mdx/code-block/types'
import { css, cx } from '@/styled-system/css'
import { ChevronDown, ChevronRight, Folder } from 'lucide-react'
import { FileIcon } from './file-icon'
import { ModifiedDot } from './modified-dot'

interface FileTreeProps {
  fileList: FileStructure[]
  basePath?: string
  expandedFolders: Set<string>
  selectedFile: FileStructure | null
  onToggleFolder: (path: string) => void
  onSelectFile: (file: FileStructure) => void
}

const folderItemStyle = css({
  userSelect: 'none',
})

const folderButtonStyle = (isSelected: boolean) =>
  css({
    _hover: { background: 'gray.800' },
    ...(isSelected ? { background: 'gray.900' } : {}),
  })

const fileButtonStyle = (isSelected: boolean) =>
  css({
    ...(isSelected
      ? {
          bg: 'blue.900',
        }
      : {
          _hover: {
            bg: 'gray.800',
          },
        }),
  })

const chevronStyle = css({
  height: '4',
  width: '4',
  marginRight: '1',
  color: 'gray.500',
})

const folderIconStyle = css({
  height: '4',
  width: '4',
  marginRight: '2',
  color: 'blue.500',
})

const folderNameStyle = css({
  fontSize: 'sm',
})

const nestedFolderStyle = css({
  paddingLeft: '4',
})

const buttonStyle = css({
  display: 'flex',
  alignItems: 'center',
  py: '1',
  px: '2',
  m: '1',
  cursor: 'pointer',
  fontSize: 'sm',
  borderRadius: 'xs',
})

const fileIconStyle = css({
  height: '4',
  width: '4',
  marginRight: '1',
})

export function FileTree({
  fileList,
  basePath = '',
  expandedFolders,
  selectedFile,
  onToggleFolder,
  onSelectFile,
}: FileTreeProps) {
  return fileList.map((file) => {
    const path = `${basePath}/${file.name}`

    if (Array.isArray(file.content)) {
      const isExpanded = expandedFolders.has(path) || expandedFolders.has(file.name)

      return (
        <div key={path} className={folderItemStyle}>
          <div
            className={cx(
              buttonStyle,
              folderButtonStyle(!!selectedFile?.fullPath.includes(file.name)),
            )}
            onClick={() => onToggleFolder(path)}
          >
            {isExpanded ? (
              <ChevronDown className={chevronStyle} />
            ) : (
              <ChevronRight className={chevronStyle} />
            )}
            <Folder className={folderIconStyle} />
            <span className={folderNameStyle}>{file.name}</span>
          </div>

          {isExpanded && (
            <div className={nestedFolderStyle}>
              <FileTree
                fileList={file.content}
                basePath={path}
                expandedFolders={expandedFolders}
                selectedFile={selectedFile}
                onToggleFolder={onToggleFolder}
                onSelectFile={onSelectFile}
              />
            </div>
          )}
        </div>
      )
    }

    return (
      <div
        key={path}
        className={cx(buttonStyle, fileButtonStyle(selectedFile?.fullPath === file.fullPath))}
        onClick={() => onSelectFile(file)}
      >
        <FileIcon fileName={file.name} className={fileIconStyle} />
        <span className={css({ flex: 1, mr: '4' })}>{file.name}</span>
        {file.metadata.modifiedType !== 'unmodified' && (
          <ModifiedDot type={file.metadata.modifiedType} />
        )}
      </div>
    )
  })
}

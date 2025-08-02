'use client'

import { FileStructure } from '@/lib/mdx/code-block/types'
import { css } from '@/styled-system/css'
import { useEffect, useState } from 'react'
import { CodeDisplay } from './code-display'
import { FileTree } from './file-tree'

interface SidebarViewProps {
  files: FileStructure[]
  selectedFile: FileStructure | null
  onSelectFile: (file: FileStructure) => void
}

const containerStyle = css({
  display: 'flex',
  minWidth: 'full',
  height: 'full',
})

const sidebarStyle = css({
  minWidth: 'fit-content',
  borderRight: '1px solid',
  borderColor: 'gray.200',
  overflowY: 'auto',
  _dark: {
    borderColor: 'gray.800',
  },
})

const codeContainerStyle = css({
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  minWidth: '0',
})

export function SidebarView({ files, selectedFile, onSelectFile }: SidebarViewProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())

  // Auto-expand folders that are part of the selected file's path
  useEffect(() => {
    if (selectedFile?.fullPath) {
      const pathParts = selectedFile.fullPath.split('/')
      if (pathParts.length > 1) {
        const parentFolderPath = `/${pathParts.slice(0, -1).join('/')}`
        const newSet = new Set([...expandedFolders, parentFolderPath])

        setExpandedFolders(newSet)
      }
    }
  }, [selectedFile?.fullPath])

  function toggleFolder(path: string) {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(path)) {
        newSet.delete(path)
      } else {
        newSet.add(path)
      }
      return newSet
    })
  }

  return (
    <div className={containerStyle}>
      {/* File sidebar */}
      <div className={sidebarStyle}>
        <FileTree
          fileList={files}
          expandedFolders={expandedFolders}
          selectedFile={selectedFile}
          onToggleFolder={toggleFolder}
          onSelectFile={onSelectFile}
        />
      </div>

      {/* Code display */}
      <div className={codeContainerStyle}>
        <CodeDisplay>{selectedFile?.highlightedHtml}</CodeDisplay>
      </div>
    </div>
  )
}

'use client'

import { FileStructure } from '@/lib/mdx/code-block/types'
import { useState } from 'react'
import { CodeDisplay } from './code-display'
import { FileTree } from './file-tree'

interface SidebarViewProps {
  files: FileStructure[]
  selectedFile: FileStructure | null
  onSelectFile: (file: FileStructure) => void
}

export function SidebarView({ files, selectedFile, onSelectFile }: SidebarViewProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())

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
    <>
      {/* File sidebar */}
      <div className="w-full md:w-64 border-r border-gray-200 dark:border-gray-800 overflow-y-auto max-h-[300px] md:max-h-[600px]">
        <div className="p-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <h3 className="font-medium text-sm">Files</h3>
        </div>
        <div className="p-1">
          <FileTree
            fileList={files}
            expandedFolders={expandedFolders}
            selectedFile={selectedFile}
            onToggleFolder={toggleFolder}
            onSelectFile={onSelectFile}
          />
        </div>
      </div>

      {/* Code display */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {selectedFile && (
          <div className="p-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
            <h3 className="font-medium text-sm">{selectedFile.name}</h3>
          </div>
        )}
        <CodeDisplay selectedFile={selectedFile} />
      </div>
    </>
  )
}

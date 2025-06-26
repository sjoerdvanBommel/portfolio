'use client'

import { findFileByName } from '@/lib/mdx/code-block/find-file-by-name'
import { findFirstFileWithContent } from '@/lib/mdx/code-block/find-first-file-with-content'
import { FileStructure } from '@/lib/mdx/code-block/types'
import { useState } from 'react'
import { SidebarView } from './sidebar-view'
import { SplitView } from './split-view'
import { TabsView } from './tabs-view'

export interface CodeViewProps {
  files: FileStructure[]
  initialFile?: string
  mode?: 'split' | 'tabs' | 'sidebar' | 'no-tabs'
}

export function CodeView({ files, initialFile, mode = 'tabs' }: CodeViewProps) {
  const [selectedFile, setSelectedFile] = useState<FileStructure | null>(
    initialFile ? findFileByName(files, initialFile) : findFirstFileWithContent(files),
  )

  const modeToComponent = {
    sidebar: (
      <SidebarView files={files} selectedFile={selectedFile} onSelectFile={setSelectedFile} />
    ),
    tabs: <TabsView files={files} selectedFile={selectedFile} onSelectFile={setSelectedFile} />,
    split: <SplitView files={files} />,
    'no-tabs': (
      <TabsView
        files={files}
        selectedFile={selectedFile}
        onSelectFile={setSelectedFile}
        hideTabs={true}
      />
    ),
  }

  return modeToComponent[mode] ?? null
}

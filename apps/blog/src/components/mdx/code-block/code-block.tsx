import { useState } from 'react';
import { examples } from '../../../posts/examples';
import { findFileByName } from '../../../utils/code-block/find-file-by-name';
import { findFirstFileWithContent } from '../../../utils/code-block/find-first-file-with-content';
import { FileStructure } from '../../../utils/code-block/types';
import { SidebarView } from './sidebar-view';
import { SplitView } from './split-view';
import { TabsView } from './tabs-view';

export interface CodeBlockProps {
  example: string;
  initialFile?: string;
  mode?: 'split' | 'tabs' | 'sidebar' | 'no-tabs';
}

export function CodeBlock({ example, initialFile, mode = 'tabs' }: CodeBlockProps) {
  const files = examples[example];
  const [selectedFile, setSelectedFile] = useState<FileStructure | null>(
    initialFile ? findFileByName(files, initialFile) : findFirstFileWithContent(files),
  );
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  function toggleFolder(path: string) {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  }

  const modeToComponent = {
    sidebar: (
      <SidebarView
        files={files}
        selectedFile={selectedFile}
        expandedFolders={expandedFolders}
        onToggleFolder={toggleFolder}
        onSelectFile={setSelectedFile}
      />
    ),
    tabs: <TabsView files={files} selectedFile={selectedFile} onSelectFile={setSelectedFile} />,
    split: <SplitView files={files} />,
    'no-tabs': <TabsView files={files} selectedFile={selectedFile} onSelectFile={setSelectedFile} showTabs={false} />,
  };

  return (
    <div className="mt-4 mb-8 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden flex flex-col md:flex-row w-full bg-white dark:bg-gray-950 shadow-sm">
      {modeToComponent[mode]}
    </div>
  );
}

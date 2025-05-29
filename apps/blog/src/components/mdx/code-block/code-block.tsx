import { useState } from 'react';
import { findFileByName } from '../../../utils/code-block/find-file-by-name';
import { findFirstFileWithContent } from '../../../utils/code-block/find-first-file-with-content';
import { FileStructure } from '../../../utils/code-block/types';
import { SidebarView } from './sidebar-view';
import { SplitView } from './split-view';
import { TabsView } from './tabs-view';

// When a constant is passed for files, this will extract the file names as a union type
type ExtractFileNames<T extends FileStructure[]> = T[number]['name'];

export interface CodeBlockProps<T extends FileStructure[]> {
  files: T;
  initialFile?: ExtractFileNames<T>;
  mode?: 'split' | 'tabs' | 'sidebar';
}

export function CodeBlock<T extends FileStructure[]>({ files, initialFile, mode = 'tabs' }: CodeBlockProps<T>) {
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
  };

  return (
    <div className="my-4 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden flex flex-col md:flex-row w-full bg-white dark:bg-gray-950 shadow-sm">
      {modeToComponent[mode]}
    </div>
  );
}

import { FileStructure } from '../../../utils/code-block/types';
import { CodeDisplay } from './code-display';
import { FileTree } from './file-tree';

interface SidebarViewProps {
  files: FileStructure[];
  selectedFile: FileStructure | null;
  expandedFolders: Set<string>;
  onToggleFolder: (path: string) => void;
  onSelectFile: (file: FileStructure) => void;
}

export function SidebarView({ files, selectedFile, expandedFolders, onToggleFolder, onSelectFile }: SidebarViewProps) {
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
            onToggleFolder={onToggleFolder}
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
  );
}

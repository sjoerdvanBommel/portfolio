import { ChevronDown, ChevronRight, File, Folder } from 'lucide-react';
import { FileStructure } from '../../../utils/code-block/types';

interface FileTreeProps {
  fileList: FileStructure[];
  basePath?: string;
  expandedFolders: Set<string>;
  selectedFile: FileStructure | null;
  onToggleFolder: (path: string) => void;
  onSelectFile: (file: FileStructure) => void;
}

export function FileTree({
  fileList,
  basePath = '',
  expandedFolders,
  selectedFile,
  onToggleFolder,
  onSelectFile,
}: FileTreeProps) {
  return fileList.map((file) => {
    const path = `${basePath}/${file.name}`;

    if (Array.isArray(file.content)) {
      const isExpanded = expandedFolders.has(path);

      return (
        <div key={path} className="select-none">
          <div
            className="flex items-center py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            onClick={() => onToggleFolder(path)}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 mr-1 text-gray-500" />
            ) : (
              <ChevronRight className="h-4 w-4 mr-1 text-gray-500" />
            )}
            <Folder className="h-4 w-4 mr-2 text-blue-500" />
            <span className="text-sm">{file.name}</span>
          </div>

          {isExpanded && (
            <div className="pl-4">
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
      );
    }

    return (
      <div
        key={path}
        className={`flex items-center py-1 px-2 cursor-pointer text-sm ${
          selectedFile && selectedFile.name === file.name
            ? 'bg-blue-100 dark:bg-blue-900'
            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
        onClick={() => onSelectFile(file)}
      >
        <File className="h-4 w-4 mr-2 text-gray-500" />
        <span>{file.name}</span>
      </div>
    );
  });
}

import { getAllFiles } from '../../../utils/code-block/get-all-files';
import { FileStructure } from '../../../utils/code-block/types';
import { CodeDisplay } from './code-display';

interface TabsViewProps {
  files: FileStructure[];
  selectedFile: FileStructure | null;
  onSelectFile: (file: FileStructure) => void;
}

export function TabsView({ files, selectedFile, onSelectFile }: TabsViewProps) {
  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      {/* File tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-600">
        <div className="flex min-w-0">
          {getAllFiles(files).map((file) => (
            <button
              key={file.fullPath}
              className={`cursor-pointer px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 ${
                selectedFile?.name === file.name
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => onSelectFile(file)}
            >
              {file.fullPath.replace(/^\//, '')}
            </button>
          ))}
        </div>
      </div>

      {/* Code display */}
      <CodeDisplay selectedFile={selectedFile} />
    </div>
  );
}

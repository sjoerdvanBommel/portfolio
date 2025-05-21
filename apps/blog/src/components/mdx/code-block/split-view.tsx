import { FileStructure } from '../../../utils/code-block/types';
import { CodeDisplay } from './code-display';

interface CodeColumnProps {
  file: FileStructure;
  isLast?: boolean;
}

function CodeColumn({ file, isLast }: CodeColumnProps) {
  return (
    <div className="flex flex-col">
      <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">{file.name}</div>
      </div>
      <div className={`flex-1 ${!isLast ? 'border-r border-gray-200 dark:border-gray-700' : ''}`}>
        <CodeDisplay selectedFile={file} />
      </div>
    </div>
  );
}

interface SplitViewProps {
  files: FileStructure[];
}

export function SplitView({ files }: SplitViewProps) {
  if (files.length !== 2) {
    throw new Error('Split view only supports exactly 2 files for now');
  }

  return (
    <div className="flex-1 overflow-hidden grid grid-cols-2">
      {files.map((file, index) => (
        <CodeColumn key={file.name} file={file} isLast={index === files.length - 1} />
      ))}
    </div>
  );
}

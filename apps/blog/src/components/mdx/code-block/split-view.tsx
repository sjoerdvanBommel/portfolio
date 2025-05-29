import { FileCode2Icon, FileIcon, FileJson2Icon, FileTextIcon, ScrollTextIcon, SquareChevronRight } from 'lucide-react';
import { getLanguageFromFilename } from '../../../utils/code-block/get-language-from-filename';
import { FileStructure } from '../../../utils/code-block/types';
import { CodeDisplay } from './code-display';

interface CodeColumnProps {
  file: FileStructure;
  isLast?: boolean;
}

function getFileIcon(language: string) {
  switch (language) {
    case 'typescript':
    case 'javascript':
      return <ScrollTextIcon className="w-4 h-4" />;
    case 'jsx':
    case 'tsx':
      return <FileCode2Icon className="w-4 h-4" />;
    case 'json':
      return <FileJson2Icon className="w-4 h-4" />;
    case 'markdown':
    case 'mdx':
      return <FileTextIcon className="w-4 h-4" />;
    case 'bash':
      return <SquareChevronRight className="w-4 h-4" />;
    default:
      return <FileIcon className="w-4 h-4" />;
  }
}

function CodeColumn({ file, isLast }: CodeColumnProps) {
  const language = getLanguageFromFilename(file.name);
  const borderStyle = isLast ? '' : 'border-r border-gray-800';

  return (
    <div className="flex flex-col">
      <div className={`border-b border-gray-800 bg-gray-900/50 ${borderStyle}`}>
        <div className="w-fit mx-2 px-2 py-2 text-sm font-medium text-blue-400 flex items-center gap-2 border-b-2 border-blue-500">
          {getFileIcon(language)}
          {file.name}
        </div>
      </div>
      <div className={`flex-1 ${borderStyle}`}>
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
    <div className="flex-1 overflow-hidden grid grid-cols-2 rounded-lg">
      {files.map((file, index) => (
        <CodeColumn key={file.name} file={file} isLast={index === files.length - 1} />
      ))}
    </div>
  );
}

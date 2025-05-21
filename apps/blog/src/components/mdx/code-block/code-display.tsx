import ShikiCodeBlock from 'react-shiki';
import { getLanguageFromFilename } from '../../../utils/code-block/get-language-from-filename';
import { FileStructure } from '../../../utils/code-block/types';

interface CodeDisplayProps {
  selectedFile: FileStructure | null;
}

export function CodeDisplay({ selectedFile }: CodeDisplayProps) {
  return (
    <div className="flex-1 overflow-auto max-h-[300px] md:max-h-[600px] bg-gray-50 dark:bg-gray-900 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-600">
      {selectedFile ? (
        typeof selectedFile.content === 'string' ? (
          <ShikiCodeBlock
            language={getLanguageFromFilename(selectedFile.name)}
            theme="github-dark"
            className="[&_.shiki]:!rounded-none"
            showLanguage={false}
          >
            {selectedFile.content}
          </ShikiCodeBlock>
        ) : (
          <div className="p-4 text-gray-500">This is a directory</div>
        )
      ) : (
        <div className="flex items-center justify-center h-full p-4 text-gray-500">
          Select a file to view its content
        </div>
      )}
    </div>
  );
}

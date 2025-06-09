import { transformerNotationDiff, transformerNotationFocus, transformerNotationHighlight } from '@shikijs/transformers';
import ShikiCodeBlock from 'react-shiki';
import { getLanguageFromFilename } from '../../../utils/code-block/get-language-from-filename';
import { FileStructure } from '../../../utils/code-block/types';
interface CodeDisplayProps {
  selectedFile: FileStructure | null;
}

export function CodeDisplay({ selectedFile }: CodeDisplayProps) {
  const formattedContent = typeof selectedFile?.content === 'string' ? selectedFile.content.replace(/\n$/, '') : '';

  return (
    <div className="flex-1 overflow-auto max-h-[300px] md:max-h-[600px] bg-[hsl(216deg_16.13%_6.08%)] scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent hover:scrollbar-thumb-gray-700">
      {selectedFile ? (
        typeof selectedFile.content === 'string' ? (
          <ShikiCodeBlock
            language={getLanguageFromFilename(selectedFile.name)}
            theme="github-dark"
            className="[&_.shiki]:!rounded-none [&_.shiki]:!bg-transparent [&_code]:block [&_code]:w-fit [&_code]:min-w-full [&_code:has(.focused)_:not(.focused)]:!opacity-60
            [&_.line]:w-[calc(100%+3rem)] [&_.line]:inline-block [&_.line]:-mx-6 [&_.line]:px-6 [&_pre]:!py-2
            [&_.highlighted]:bg-code-highlight
            [&_.add,.remove]:before:absolute [&_.add,.remove]:before:-translate-x-full [&_.add,.remove]:before:pr-1
            [&_.add]:bg-success-bg [&_.add]:before:content-['+'] [&_.add]:before:text-success-color
            [&_.remove]:bg-error-bg [&_.remove]:before:content-['-'] [&_.remove]:before:text-error-color"
            showLanguage={false}
            transformers={[transformerNotationHighlight(), transformerNotationDiff(), transformerNotationFocus()]}
          >
            {formattedContent}
          </ShikiCodeBlock>
        ) : (
          <div className="p-4 text-gray-400">This is a directory</div>
        )
      ) : (
        <div className="flex items-center justify-center h-full p-4 text-gray-400">
          Select a file to view its content
        </div>
      )}
    </div>
  );
}

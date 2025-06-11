import {
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers';
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
            [&_.remove]:bg-error-bg [&_.remove]:before:content-['-'] [&_.remove]:before:text-error-color
            [&_.highlighted-word]:rounded [&_.highlighted-word]:border [&_.highlighted-word]:border-subtle-hover [&_.highlighted-word]:py-0.5
            [&_span]:not-[:nth-last-child(1_of_.highlighted-word)]:nth-[1_of_.highlighted-word]:rounded-r-none [&_span]:not-[:nth-last-child(1_of_.highlighted-word)]:nth-[1_of_.highlighted-word]:border-r-0 [&_span]:not-[:nth-last-child(1_of_.highlighted-word)]:nth-[1_of_.highlighted-word]:pl-0.5
            [&_span]:not-[:nth-child(1_of_.highlighted-word)]:nth-last-[1_of_.highlighted-word]:rounded-l-none [&_span]:not-[:nth-child(1_of_.highlighted-word)]:nth-last-[1_of_.highlighted-word]:border-l-0 [&_span]:not-[:nth-child(1_of_.highlighted-word)]:nth-last-[1_of_.highlighted-word]:pr-0.5
            [&_span]:not-[:nth-child(1_of_.highlighted-word)]:not-[:nth-last-child(1_of_.highlighted-word)]:border-x-0 [&_span]:not-[:nth-child(1_of_.highlighted-word)]:not-[:nth-last-child(1_of_.highlighted-word)]:rounded-none
            "
            showLanguage={false}
            transformers={[
              transformerNotationHighlight(),
              transformerNotationDiff(),
              transformerNotationFocus(),
              transformerNotationWordHighlight(),
            ]}
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

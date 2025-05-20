import { ChevronDown, ChevronRight, File, Folder } from 'lucide-react';
import { useState } from 'react';
import ShikiCodeBlock from 'react-shiki';

interface FileStructure {
  name: string;
  content?: string;
  children?: FileStructure[];
  isDirectory?: boolean;
}

interface CodeBlockProps {
  files: FileStructure[];
  initialFile?: string;
  showSidebar?: boolean;
}

export function CodeBlock({ files, initialFile, showSidebar = true }: CodeBlockProps) {
  const [selectedFile, setSelectedFile] = useState<FileStructure | null>(
    initialFile ? findFileByName(files, initialFile) : findFirstFileWithContent(files),
  );
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  function findFileByName(fileList: FileStructure[], name: string): FileStructure | null {
    for (const file of fileList) {
      if (file.name === name && !file.isDirectory) {
        return file;
      }
      if (file.children) {
        const found = findFileByName(file.children, name);
        if (found) return found;
      }
    }
    return null;
  }

  function findFirstFileWithContent(fileList: FileStructure[]): FileStructure | null {
    for (const file of fileList) {
      if (!file.isDirectory && file.content) {
        return file;
      }
      if (file.children) {
        const found = findFirstFileWithContent(file.children);
        if (found) return found;
      }
    }
    return null;
  }

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

  function renderFileTree(fileList: FileStructure[], basePath = '') {
    return fileList.map((file) => {
      const path = `${basePath}/${file.name}`;

      if (file.isDirectory) {
        const isExpanded = expandedFolders.has(path);

        return (
          <div key={path} className="select-none">
            <div
              className="flex items-center py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              onClick={() => toggleFolder(path)}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 mr-1 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-1 text-gray-500" />
              )}
              <Folder className="h-4 w-4 mr-2 text-blue-500" />
              <span className="text-sm">{file.name}</span>
            </div>

            {isExpanded && file.children && <div className="pl-4">{renderFileTree(file.children, path)}</div>}
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
          onClick={() => setSelectedFile(file)}
        >
          <File className="h-4 w-4 mr-2 text-gray-500" />
          <span>{file.name}</span>
        </div>
      );
    });
  }

  // Get all files recursively for horizontal view
  function getAllFiles(fileList: FileStructure[], basePath = ''): Array<FileStructure & { fullPath: string }> {
    let result: Array<FileStructure & { fullPath: string }> = [];
    for (const file of fileList) {
      if (!file.isDirectory) {
        result.push({ ...file, fullPath: `${basePath}/${file.name}` });
      }
      if (file.children) {
        result = result.concat(getAllFiles(file.children, `${basePath}/${file.name}`));
      }
    }
    return result;
  }

  function getLanguageFromFileName(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase();

    switch (extension) {
      case 'js':
        return 'javascript';
      case 'ts':
        return 'typescript';
      case 'jsx':
        return 'jsx';
      case 'tsx':
        return 'tsx';
      case 'css':
        return 'css';
      case 'html':
        return 'html';
      case 'json':
        return 'json';
      case 'md':
        return 'markdown';
      default:
        return 'plaintext';
    }
  }

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden flex flex-col md:flex-row w-full bg-white dark:bg-gray-950 shadow-sm">
      {showSidebar ? (
        <>
          {/* File sidebar */}
          <div className="w-full md:w-64 border-r border-gray-200 dark:border-gray-800 overflow-y-auto max-h-[300px] md:max-h-[600px]">
            <div className="p-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              <h3 className="font-medium text-sm">Files</h3>
            </div>
            <div className="p-1">{renderFileTree(files)}</div>
          </div>

          {/* Code display */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {selectedFile ? (
              <>
                <div className="p-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                  <h3 className="font-medium text-sm">{selectedFile.name}</h3>
                </div>
                <div className="flex-1 overflow-auto max-h-[300px] md:max-h-[600px] bg-gray-50 dark:bg-gray-900 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-600">
                  <ShikiCodeBlock language={getLanguageFromFileName(selectedFile.name)} theme="github-dark">
                    {selectedFile.content || 'No content available'}
                  </ShikiCodeBlock>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full p-4 text-gray-500">
                Select a file to view its content
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* File tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-600">
            <div className="flex min-w-0">
              {getAllFiles(files).map((file) => (
                <button
                  key={file.fullPath}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                    selectedFile?.name === file.name
                      ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                  onClick={() => setSelectedFile(file)}
                >
                  {file.fullPath.replace(/^\//, '')}
                </button>
              ))}
            </div>
          </div>

          {/* Code display */}
          {selectedFile ? (
            <div className="flex-1 overflow-auto max-h-[300px] md:max-h-[600px] bg-gray-50 dark:bg-gray-900 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-600">
              <ShikiCodeBlock language={getLanguageFromFileName(selectedFile.name)} theme="github-dark">
                {selectedFile.content || 'No content available'}
              </ShikiCodeBlock>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full p-4 text-gray-500">
              Select a file to view its content
            </div>
          )}
        </div>
      )}
    </div>
  );
}

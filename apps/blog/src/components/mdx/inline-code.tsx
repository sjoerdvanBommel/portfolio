import React from 'react';

interface InlineCodeProps {
  children: React.ReactNode;
}

export const InlineCode: React.FC<InlineCodeProps> = ({ children }) => {
  return (
    <code className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm text-orange-400 font-mono">
      {children}
    </code>
  );
};

export default InlineCode;

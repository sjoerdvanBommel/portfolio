import React from 'react';

interface InlineCodeProps {
  children: React.ReactNode;
}

export const InlineCode: React.FC<InlineCodeProps> = ({ children }) => {
  return (
    <code className="mx-0.5 px-0.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-orange-400 font-mono">
      {children}
    </code>
  );
};

export default InlineCode;

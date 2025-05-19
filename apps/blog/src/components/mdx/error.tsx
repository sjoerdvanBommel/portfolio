import React from 'react';

export const Error = ({ children }: { children: React.ReactNode }) => (
  <div className="pl-3 pr-2 py-2 my-4 rounded-r-lg text-red-700 border-l-3 bg-red-900/20">{children}</div>
);

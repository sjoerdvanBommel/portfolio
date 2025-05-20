export const files = [
  {
    name: 'src',
    isDirectory: true,
    children: [
      {
        name: 'components',
        isDirectory: true,
        children: [
          {
            name: 'button.tsx',
            content: `import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    onClick?: () => void;
}

export function Button({ 
  children, 
  variant = 'primary', 
  onClick 
}: ButtonProps) {
  return (
    <button
      className={\`px-4 py-2 rounded-md \${
        variant === 'primary' 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-200 text-gray-800'
      }\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}`,
          },
          {
            name: 'card.tsx',
            content: `import React from 'react';

interface CardProps {
title: string;
children: React.ReactNode;
}

export function Card({ title, children }: CardProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="p-4 border-b bg-gray-50">
        <h3 className="font-medium">{title}</h3>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}`,
          },
        ],
      },
      {
        name: 'utils',
        isDirectory: true,
        children: [
          {
            name: 'helpers.ts',
            content: `export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}`,
          },
        ],
      },
      {
        name: 'app.tsx',
        content: `import React from 'react';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { formatDate } from './utils/helpers';

export default function App() {
  const today = new Date();
  
  return (
    <div className="p-4 max-w-md mx-auto">
      <Card title="Welcome to My App">
        <p className="mb-4">
          Today is {formatDate(today)}
        </p>
        <Button>Click Me</Button>
      </Card>
    </div>
  );
}`,
      },
    ],
  },
  {
    name: 'package.json',
    content: `{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "typescript": "^5.0.4",
    "tailwindcss": "^3.3.0"
  }
}`,
  },
  {
    name: 'README.md',
    content: `# My Application

This is a sample React application with TypeScript and Tailwind CSS.

## Getting Started

1. Clone the repository
2. Run \`npm install\`
3. Run \`npm start\`

## Features

- Component library
- TypeScript support
- Tailwind styling`,
  },
].slice(0, 1);

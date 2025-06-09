import { CodeQuizProps } from '../../components/mdx/code-quiz/code-quiz';
import { InlineCode } from '../../components/mdx/inline-code';

export const timelineItems = [
  {
    date: new Date(1995, 11, 17),
  },
  {
    date: new Date(2009, 11, 24),
  },
];

export const quiz1: CodeQuizProps = {
  question: (
    <span>
      What happens when you run <InlineCode>tsc index.ts</InlineCode>?
    </span>
  ),
  explanation:
    'When running this command, the TypeScript compiler will run against the passed file(s). Because there is no `tsconfig.json` file, the compiler will use its default settings. For example, it will output a JavaScript file called `index.js` in the same folder as the TypeScript file, because this is the default output directory. Later in this blog we will explore why tsc outputs CommonJS instead of ES modules.',
  answers: [
    {
      id: '1',
      text: 'This produces a JavaScript ES module called `index.js` in a dist folder',
      isCorrect: false,
    },
    {
      id: '2',
      text: 'This produces a JavaScript CommonJS module called `index.js`',
      isCorrect: true,
    },
    {
      id: '3',
      text: 'This produces a JavaScript ES module called `index.js`',
      isCorrect: false,
    },
    {
      id: '4',
      text: 'It will error because there is no tsconfig.json file',
      isCorrect: false,
    },
  ],
  files: [
    {
      name: 'index.ts',
      content: `export const hello = 'world';`,
    },
  ],
};

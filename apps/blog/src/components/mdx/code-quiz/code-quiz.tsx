import { useState } from 'react';
import { CodeBlock, CodeBlockProps } from '../code-block/code-block';

export type Answer = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type CodeQuizProps = CodeBlockProps & {
  question: React.ReactNode;
  answers: Answer[];
  explanation: React.ReactNode;
};

export function CodeQuiz({ example, question, answers, explanation, initialFile, mode }: CodeQuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const selectedAnswerData = selectedAnswer ? answers.find((answer) => answer.id === selectedAnswer) : null;

  return (
    <div className="space-y-4 my-8">
      <div className="text-lg font-medium text-center">{question}</div>

      <CodeBlock example={example} initialFile={initialFile} mode={mode} />

      <div className="space-y-2">
        {answers.map((answer) => (
          <button
            key={answer.id}
            onClick={() => setSelectedAnswer(answer.id)}
            className={`w-full p-3 text-left rounded-lg border transition-colors cursor-pointer ${
              selectedAnswer === answer.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-subtle hover:border-gray-300 dark:hover:border-gray-700'
            } ${
              selectedAnswer === answer.id
                ? answer.isCorrect
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                : ''
            }`}
          >
            {answer.text}
          </button>
        ))}
      </div>

      {selectedAnswer && (
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-subtle">
          <div className={`font-medium mb-2 ${selectedAnswerData?.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {selectedAnswerData?.isCorrect ? 'Correct!' : 'Incorrect!'}
          </div>
          <div className="text-gray-400 whitespace-pre-wrap">{explanation}</div>
        </div>
      )}
    </div>
  );
}

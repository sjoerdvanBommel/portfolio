'use client'

import { ReactNode, useState } from 'react'
import { Answer } from './code-quiz'

export interface QuizProps {
  answers: Answer[]
  explanation: ReactNode
}

export function Quiz({ answers, explanation }: QuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const selectedAnswerData = selectedAnswer
    ? answers.find((answer) => answer.id === selectedAnswer)
    : null

  return (
    <>
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
          <div
            className={`font-medium mb-2 ${selectedAnswerData?.isCorrect ? 'text-green-600' : 'text-red-600'}`}
          >
            {selectedAnswerData?.isCorrect ? 'Correct!' : 'Incorrect!'}
          </div>
          <div className="text-gray-400 whitespace-pre-wrap">{explanation}</div>
        </div>
      )}
    </>
  )
}

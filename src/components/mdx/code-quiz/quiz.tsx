'use client'

import { COLORS } from '@/lib/mdx/styles/colors'
import { SPACING } from '@/lib/mdx/styles/spacing'
import { css } from '@/styled-system/css'
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

  // Panda CSS styles
  const containerStyle = css({
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING['2'],
  })

  // Use direct color values for blue and green since COLORS.blue and COLORS.green do not exist
  const GREEN_500 = '#22c55e' // Tailwind green-500
  const GREEN_50 = '#f0fdf4' // Tailwind green-50
  const RED_500 = COLORS.red['6']
  const RED_50 = COLORS.red['2']

  // Helper to generate button style
  function getButtonStyle(answer: Answer): string {
    const isSelected = selectedAnswer === answer.id
    const isCorrect = answer.isCorrect
    return css({
      width: '100%',
      padding: SPACING['3'],
      textAlign: 'left',
      borderRadius: 'lg',
      borderWidth: '1px',
      transitionProperty: 'colors',
      cursor: 'pointer',
      borderColor: isSelected ? (isCorrect ? GREEN_500 : RED_500) : 'var(--subtle, var(--gray-3))',
      background: isSelected ? (isCorrect ? GREEN_50 : RED_50) : undefined,
      _hover: {
        borderColor: isSelected ? (isCorrect ? GREEN_500 : RED_500) : COLORS.gray['3'],
        _dark: {
          borderColor: isSelected ? (isCorrect ? GREEN_500 : RED_500) : COLORS.gray['7'],
          background: isSelected
            ? isCorrect
              ? 'rgba(22, 101, 52, 0.2)'
              : 'rgba(153, 27, 27, 0.2)'
            : undefined,
        },
      },
    })
  }

  const resultContainer = css({
    padding: SPACING['4'],
    borderRadius: 'lg',
    background: COLORS.gray['2'],
    borderWidth: '1px',
    borderColor: 'var(--subtle, var(--gray-3))',
    _dark: { background: 'rgba(17, 24, 39, 0.5)' },
  })

  const resultTitle = (isCorrect?: boolean) =>
    css({
      fontWeight: 'medium',
      marginBottom: SPACING['2'],
      color: isCorrect ? GREEN_500 : RED_500,
    })

  const resultExplanation = css({
    color: COLORS.gray['4'],
    whiteSpace: 'pre-wrap',
  })

  return (
    <>
      <div className={containerStyle}>
        {answers.map((answer) => (
          <button
            key={answer.id}
            onClick={() => setSelectedAnswer(answer.id)}
            className={getButtonStyle(answer)}
          >
            {answer.text}
          </button>
        ))}
      </div>

      {selectedAnswer && (
        <div className={resultContainer}>
          <div className={resultTitle(selectedAnswerData?.isCorrect)}>
            {selectedAnswerData?.isCorrect ? 'Correct!' : 'Incorrect!'}
          </div>
          <div className={resultExplanation}>{explanation}</div>
        </div>
      )}
    </>
  )
}

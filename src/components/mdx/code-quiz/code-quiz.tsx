import { SPACING } from '@/lib/mdx/styles/spacing'
import { css } from '@/styled-system/css'
import { CodeBlock, CodeBlockProps } from '../code-block/code-block'
import { Quiz, QuizProps } from './quiz'

export type Answer = {
  id: string
  text: string
  isCorrect: boolean
}

export type CodeQuizProps = Omit<CodeBlockProps, 'files'> &
  QuizProps & {
    example: string
    question: React.ReactNode
  }

export function CodeQuiz({
  example,
  question,
  answers,
  explanation,
  initialFile,
  mode,
}: CodeQuizProps) {
  const containerStyle = css({
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING['4'],
    marginTop: SPACING['8'],
    marginBottom: SPACING['8'],
  })

  const questionStyle = css({
    fontSize: 'lg',
    fontWeight: 'medium',
    textAlign: 'center',
  })

  return (
    <div className={containerStyle}>
      <div className={questionStyle}>{question}</div>
      <CodeBlock example={example} initialFile={initialFile} mode={mode} />
      <Quiz answers={answers} explanation={explanation} />
    </div>
  )
}

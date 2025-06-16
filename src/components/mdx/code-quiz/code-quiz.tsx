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
  return (
    <div className="space-y-4 my-8">
      <div className="text-lg font-medium text-center">{question}</div>

      <CodeBlock example={example} initialFile={initialFile} mode={mode} />

      <Quiz answers={answers} explanation={explanation} />
    </div>
  )
}

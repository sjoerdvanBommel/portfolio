import { ColoredH2, H1, H2, H3 } from '../headings/headings'
import { Ol, Ul } from '../lists'
import { A, P } from '../text'
import { Blockquote, Error, Info, Note } from './banners'
import { CodeDisplayInlineMdxSync } from './code-block/code-display'
import { CodeBlock } from './code-block/index'
import { CodeQuiz } from './code-quiz/index'
import { CurrentTime } from './current-time'
import { InlineCode } from './inline-code'
import { MainThreadBlocker } from './main-thread-blocker'
import { TerminalCommandRunner } from './terminal/terminal-command-runner'
import { Timeline, TimelineEntry } from './timeline/index'

export const mdxComponents = {
  CodeBlock,
  CodeQuiz,
  CurrentTime,
  Error,
  MainThreadBlocker,
  Timeline,
  TimelineEntry,
  Info,
  Note,
  TerminalCommandRunner,
  h1: H1,
  h2: H2,
  ColoredH2,
  h3: H3,
  p: P,
  a: A,
  code: InlineCode,
  pre: CodeDisplayInlineMdxSync,
  blockquote: Blockquote,
  ol: Ol,
  ul: Ul,
}

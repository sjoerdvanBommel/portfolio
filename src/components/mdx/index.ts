import { ColoredH2, H1, H2, H3 } from '../headings'
import { Ol } from '../lists'
import { P } from '../text'
import { Error, Info, Note } from './banners'
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
  code: InlineCode,
  ol: Ol,
}

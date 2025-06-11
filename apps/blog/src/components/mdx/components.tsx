import { CodeBlock } from './code-block/code-block';
import { CodeQuiz } from './code-quiz/code-quiz';
import { DependencyTimeline } from './dependency-timeline/dependency-timeline';
import { Error } from './error';
import { H1, H2 } from './headings';
import InlineCode from './inline-code';
import { MainThreadBlocker } from './main-thread-blocker';
import { Timeline, TimelineEntry } from './timeline/timeline';

export const components = {
  h1: H1,
  h2: H2,
  Error,
  InlineCode,
  CodeBlock,
  CodeQuiz,
  Timeline,
  TimelineEntry,
  MainThreadBlocker,
  DependencyTimeline,
};

import { Metadata } from '@/lib/parse-example-file'

export interface FileStructure {
  name: string
  content: string | FileStructure[]
  metadata: Metadata
  highlightedHtml?: string
  isDirectory?: boolean
}

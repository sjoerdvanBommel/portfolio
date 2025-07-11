export interface FileStructure {
  name: string
  content: string | FileStructure[]
  highlightedHtml?: string
}

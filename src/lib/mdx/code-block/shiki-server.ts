import {
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers'
import { CodeToHastOptions, codeToHtml } from 'shiki'
import { mapToShikiLanguage } from './map-to-shiki-language'

export async function highlightCode(code: string, language: string): Promise<string> {
  const options: CodeToHastOptions = {
    lang: mapToShikiLanguage(language) || 'text',
    theme: 'github-dark',
    transformers: [
      transformerNotationHighlight(),
      transformerNotationDiff(),
      transformerNotationFocus(),
      transformerNotationWordHighlight(),
    ],
  }

  try {
    return codeToHtml(code, options)
  } catch {
    // Fallback to plain text if language is not supported
    return codeToHtml(code, { ...options, lang: 'text' })
  }
}

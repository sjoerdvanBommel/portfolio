import type { Metadata } from 'next'
import { VideosSection } from './videos-section'

export const metadata: Metadata = {
  title: 'Videos',
  description:
    'Watch educational YouTube videos about TypeScript, JavaScript, React, and web development. Learn advanced programming concepts through visual tutorials.',
  openGraph: {
    title: 'Educational Videos by Sjoerd van Bommel',
    description:
      'Watch educational YouTube videos about TypeScript, JavaScript, React, and web development. Learn advanced programming concepts through visual tutorials.',
    url: 'https://sjoerdvanbommel.nl/videos',
  },
  twitter: {
    title: 'Educational Videos by Sjoerd van Bommel',
    description:
      'Watch educational YouTube videos about TypeScript, JavaScript, React, and web development. Learn advanced programming concepts.',
  },
}

export default async function VideosPage() {
  return <VideosSection />
}

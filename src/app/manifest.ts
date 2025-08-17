import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sjoerd van Bommel - Portfolio',
    short_name: 'Sjoerd Portfolio',
    description: 'Senior Software Engineer specializing in TypeScript, React, and web development',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#ff6600',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}

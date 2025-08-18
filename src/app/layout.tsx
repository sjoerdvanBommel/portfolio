import Footer from '@/components/footer'
import Header from '@/components/header'
import { WebContainerPromiseProvider } from '@/components/providers/web-container-provider'
import { PersonJsonLd, ProfessionalServiceJsonLd, WebsiteJsonLd } from '@/components/seo/json-ld'
import { css } from '@/styled-system/css'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './styles/globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Sjoerd van Bommel - Senior Software Engineer & TypeScript Expert',
    template: '%s | Sjoerd van Bommel',
  },
  description:
    'Senior Software Engineer at Cimpress Technology specializing in TypeScript, React, and web development. Learn advanced TypeScript concepts through blog posts and YouTube videos.',
  keywords: [
    'TypeScript',
    'React',
    'JavaScript',
    'Web Development',
    'Software Engineer',
    'Frontend',
    'Backend',
    'Tutorial',
    'Programming',
  ],
  authors: [{ name: 'Sjoerd van Bommel' }],
  creator: 'Sjoerd van Bommel',
  publisher: 'Sjoerd van Bommel',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sjoerdvanbommel.nl'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sjoerdvanbommel.nl',
    title: 'Sjoerd van Bommel - Senior Software Engineer & TypeScript Expert',
    description:
      'Senior Software Engineer at Cimpress Technology specializing in TypeScript, React, and web development. Learn advanced TypeScript concepts through blog posts and YouTube videos.',
    siteName: 'Sjoerd van Bommel Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sjoerd van Bommel - Senior Software Engineer & TypeScript Expert',
    description:
      'Senior Software Engineer specializing in TypeScript, React, and web development. Learn advanced TypeScript concepts.',
    creator: '@sjoerdvanbommel',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // verification: {
  //   google: 'your-google-verification-code',
  // },
}

// Main layout based on https://www.joshwcomeau.com/css/full-bleed/
const pageStyle = css({
  backgroundColor: 'var(--background)',
  minHeight: '100dvh',
  display: 'flex',
  flexDirection: 'column',
})

const mainStyle = css({
  display: 'grid',
  alignContent: 'flex-start',
  gridTemplateColumns: '1fr min(42rem, 100%) 1fr',
  flex: '1',
  marginInline: 'var(--global-margin)',
  paddingBottom: 'var(--global-margin)',
  '& > *': {
    gridColumn: '2',
  },
  '& .full-bleed': {
    marginLeft: `calc(var(--global-margin) * -1)`,
    width: `calc(100% + var(--global-margin) * 2)`,
    gridColumn: '1 / 4',
  },
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <PersonJsonLd />
        <WebsiteJsonLd />
        <ProfessionalServiceJsonLd />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${pageStyle}`}>
        <Theme appearance="dark" accentColor="orange" className={themeStyle}>
          <WebContainerPromiseProvider>
            <main className={mainStyle}>
              <Header />
              {children}
            </main>
            <Footer />
            {/* <ThemePanel /> */}
          </WebContainerPromiseProvider>
        </Theme>
      </body>
    </html>
  )
}

const themeStyle = css({
  display: 'contents',
})

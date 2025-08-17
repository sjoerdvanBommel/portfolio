import Footer from '@/components/footer'
import Header from '@/components/header'
import { WebContainerPromiseProvider } from '@/components/providers/web-container-provider'
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
  title: 'Portfolio',
  description: 'Sjoerd van Bommel described in code',
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

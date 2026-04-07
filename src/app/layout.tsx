import { ModeToggle } from '@/components/theme/mode-toggle'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Web Dev Course Tracker',
  description:
    'A minimal dashboard to track progress through the Boolean Master Web Dev course.',
}

const pageContainer = /*tw*/ 'mx-auto max-w-350 px-4.5'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='font-sans antialiased' suppressHydrationWarning>
      <body className='bg-background text-foreground'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {/* Header */}
          <header className='border-b border-border'>
            <div
              className={cn(
                pageContainer,
                'flex items-center justify-between gap-4 py-3',
              )}
            >
              {/* Logo */}
              <div className='font-mono text-xl font-extrabold'>
                WDC<span className='text-primary-text'>T</span>
              </div>

              {/* Theme Toggle */}
              <ModeToggle />
            </div>
          </header>

          {/* Main */}
          <main
            className={cn(
              pageContainer,
              'min-h-screen border-r border-l border-border py-26',
            )}
          >
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}

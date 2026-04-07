import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ThemeProvider } from '@/components/theme/theme-provider'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Web Dev Course Tracker',
  description:
    'A minimal dashboard to track progress through the Boolean Master Web Dev course.',
}

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
          <Header />
          <Main>{children}</Main>
        </ThemeProvider>
      </body>
    </html>
  )
}

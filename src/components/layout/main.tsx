import { cn } from '@/lib/utils'
import { pageContainer } from './classNames'

interface MainProps {
  children: React.ReactNode
}

export function Main({ children }: MainProps) {
  return (
    <main
      className={cn(
        pageContainer,
        'min-h-screen border-r border-l border-border py-26',
      )}
    >
      {children}
    </main>
  )
}

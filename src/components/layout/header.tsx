import { ModeToggle } from '@/components/theme/mode-toggle'
import { cn } from '@/lib/utils'
import { pageContainer } from './classNames'

export function Header() {
  return (
    <header className='border-b border-border'>
      <div
        className={cn(
          pageContainer,
          'mb-1.5 flex items-center justify-between gap-4 border-r-2 border-b-2 border-muted py-3',
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
  )
}

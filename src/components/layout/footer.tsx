import { FolderGit2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { pageContainer } from './classNames'

export function Footer() {
  return (
    <footer
      className={cn(
        pageContainer,
        'border-t-2 border-r border-l-2 border-double [border-top-style:dashed] border-muted bg-background-elevated py-6',
      )}
    >
      <div className='flex items-center justify-between gap-4'>
        {/* Copyright */}
        <div className='space-y-1 text-sm text-muted-foreground'>
          <p>&copy; {new Date().getFullYear()} Web Dev Course Tracker</p>
          <p>
            By{' '}
            <Button
              variant='link'
              size='sm'
              className='inline bg-link-background px-1 py-1 select-text'
              asChild
            >
              <a
                href='https://emanuelefavero.com/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Emanuele Favero
              </a>
            </Button>
          </p>
        </div>

        {/* GitHub link */}
        <a
          href='https://github.com/emanuelefavero/web-dev-course-tracker'
          className='group rounded-ful inline-flex items-center justify-center rounded-full bg-link-background p-2.5 text-muted-foreground transition duration-200 outline-none select-none hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='View the source code on GitHub'
        >
          <span className='sr-only'>View the source code on GitHub</span>
          <span className='perspective-midrange'>
            <FolderGit2 className='h-8 w-8 transform-gpu transition-transform duration-400 group-hover:transform-[rotateY(180deg)]' />
          </span>
        </a>
      </div>
    </footer>
  )
}

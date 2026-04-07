export default function Home() {
  return (
    <section className='space-y-4'>
      <div className='space-y-2.5'>
        <h1 className='text-5xl text-balance sm:text-6xl'>
          <em className='tracking-tight not-italic'>
            Web Dev Course <span className='text-primary-text'>Tracker</span>
          </em>
        </h1>
        <p className='max-w-prose text-base leading-7 text-muted-foreground sm:text-lg'>
          Track the Boolean Master Web Dev course at a glance, with a clear view
          of completed lessons, remaining hours, and what&apos;s next.
        </p>
      </div>
    </section>
  )
}

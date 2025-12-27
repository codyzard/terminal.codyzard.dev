import {Terminal} from '@/src/components/terminal'
import {ProviderAggregation} from './provider-aggregation'

const HomePage = () => {
  return (
    <div className='min-h-screen'>
      <h1 className='sr-only'>Le Hoang Tu – Frontend Engineer (React, Next.js)</h1>

      <section className='sr-only'>
        <p>
          Frontend engineer specializing in React, Next.js, TypeScript, modern UI architecture, and
          performance optimization.
        </p>
      </section>
      <ProviderAggregation>
        <Terminal />
      </ProviderAggregation>

      <nav className='sr-only'>
        <a href='https://terminal.codyzard.dev'>Home</a>
        <a href='https://github.com/codyzard'>GitHub</a>
        <a href='https://www.linkedin.com/in/l%C3%AA-ho%C3%A0ng-t%C3%BA-676b89136/'>LinkedIn</a>
      </nav>
    </div>
  )
}

export default HomePage

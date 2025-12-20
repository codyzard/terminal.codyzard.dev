import {Terminal} from '@/src/components/terminal'
import {ProviderAggregation} from './provider-aggregation'

const HomePage = () => {
  return (
    <div className='min-h-screen'>
      <ProviderAggregation>
        <Terminal />
      </ProviderAggregation>
    </div>
  )
}

export default HomePage

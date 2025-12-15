import {Terminal} from '@/src/components/terminal'
import {ThemeWrapper} from '@/src/contexts/theme-context'

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <ThemeWrapper>
        <Terminal />
      </ThemeWrapper>
    </div>
  )
}

export default HomePage

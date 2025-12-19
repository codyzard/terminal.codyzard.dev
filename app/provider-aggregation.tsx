import {ThemeProvider, ThemeWrapper} from '@/src/contexts/theme-context'
import {TypingAnimationProvider} from '@/src/contexts/typing-animation-context'
import type {ReactNode} from 'react'

type Props = {
  children: ReactNode
}

export function ProviderAggregation({children}: Props) {
  return (
    <ThemeProvider>
      <ThemeWrapper>
        <TypingAnimationProvider>{children}</TypingAnimationProvider>
      </ThemeWrapper>
    </ThemeProvider>
  )
}

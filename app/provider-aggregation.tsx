'use client'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {useState} from 'react'
import type {ReactNode} from 'react'
import {AudioProvider} from '@/src/contexts/audio-context'
import {MatrixProvider} from '@/src/contexts/matrix-context'
import {ThemeProvider, ThemeWrapper} from '@/src/contexts/theme-context'
import {TypingAnimationProvider} from '@/src/contexts/typing-animation-context'

type Props = {
  children: ReactNode
}

export function ProviderAggregation({children}: Props) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            refetchOnWindowFocus: false,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ThemeWrapper>
          <TypingAnimationProvider>
            <MatrixProvider>
              <AudioProvider>{children}</AudioProvider>
            </MatrixProvider>
          </TypingAnimationProvider>
        </ThemeWrapper>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

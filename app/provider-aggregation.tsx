import {ThemeWrapper} from '@/src/contexts/theme-context'
import type {ReactNode} from 'react'

type Props = {
  children: ReactNode
}

export function ProviderAggregation({children}: Props) {
  return <ThemeWrapper>{children}</ThemeWrapper>
}

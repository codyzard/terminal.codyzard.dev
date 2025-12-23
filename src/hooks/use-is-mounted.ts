import {useEffect, useState} from 'react'

/**
 * Hook to check if component is mounted on client-side.
 * Useful to avoid hydration mismatches between server and client.
 *
 * @returns true after component mounts on client, false during SSR
 *
 * @example
 * ```tsx
 * const isMounted = useIsMounted()
 *
 * return (
 *   <div>
 *     {isMounted && <ClientOnlyComponent />}
 *   </div>
 * )
 * ```
 */
export const useIsMounted = (): boolean => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted
}

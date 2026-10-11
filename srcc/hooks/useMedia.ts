import { useEffect, useState } from 'react'

/** True while the media query matches (updates live when the phone is rotated or the window is resized). */
export function useMedia(query: string) {
  const [match, setMatch] = useState(() => typeof matchMedia !== 'undefined' && matchMedia(query).matches)
  useEffect(() => {
    const mq = matchMedia(query)
    const f = () => setMatch(mq.matches)
    f()
    mq.addEventListener('change', f)
    return () => mq.removeEventListener('change', f)
  }, [query])
  return match
}

/** Phone and small tablet layout (the same 900px breakpoint the stylesheet uses). */
export const useIsPhone = () => useMedia('(max-width:899px)')

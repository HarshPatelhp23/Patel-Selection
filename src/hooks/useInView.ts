import { useEffect, useState, type RefObject } from 'react'

export function useInView(ref: RefObject<Element>, threshold = 0.1) {
  const [on, setOn] = useState(true)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const o = new IntersectionObserver(e => setOn(e[0].isIntersecting), { threshold })
    o.observe(el)
    return () => o.disconnect()
  }, [ref, threshold])
  return on
}

import { useEffect, useState, type RefObject } from 'react'

export function useInView(ref: RefObject<HTMLElement | null>, threshold = 0.55) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= threshold),
      { threshold: [0, threshold, 1] },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, threshold])

  return inView
}

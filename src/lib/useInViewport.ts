import { useEffect, useState, type RefObject } from 'react'

/**
 * Returns true while `ref` is near/inside the viewport. Used to switch a
 * Three.js <Canvas frameloop> between 'always' and 'never' so off-screen
 * scenes stop rendering entirely — a major performance win when several
 * canvases exist on one page.
 */
export function useInViewport(
  ref: RefObject<Element | null>,
  rootMargin = '300px 0px'
): boolean {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, rootMargin])

  return inView
}

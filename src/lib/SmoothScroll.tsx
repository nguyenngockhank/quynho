import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'

const LenisContext = createContext<Lenis | null>(null)
export const useSmoothScroll = (): Lenis | null => useContext(LenisContext)

/**
 * App-wide Lenis smooth scroll, driven by the GSAP ticker and synced to
 * ScrollTrigger so pinned/scrub animations stay perfectly in step at 60fps.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const rafBound = useRef(false)

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    instance.on('scroll', () => ScrollTrigger.update())

    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    rafBound.current = true

    setLenis(instance)

    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      rafBound.current = false
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

import { useEffect, useRef, type CSSProperties } from 'react'

/**
 * Ties a layer's translateY to how far its container has scrolled through
 * the viewport, producing an Apple-style depth/parallax effect.
 * speed > 0 drifts slower than scroll (background), speed < 0 drifts opposite.
 */
export function useParallax<T extends HTMLElement>(speed = 0.25) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let ticking = false

    const update = () => {
      ticking = false
      const rect = el.getBoundingClientRect()
      const viewportCenter = window.innerHeight / 2
      const elementCenter = rect.top + rect.height / 2
      const distance = elementCenter - viewportCenter
      el.style.setProperty('--parallax-y', `${distance * speed * -1}px`)
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [speed])

  return ref
}

export const parallaxStyle: CSSProperties = {
  transform: 'translateY(var(--parallax-y, 0px))',
}

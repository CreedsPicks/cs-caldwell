import { useEffect, useRef, useState, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  as?: 'div' | 'section'
  variant?: 'rise' | 'scale' | 'stagger'
  className?: string
  delay?: number
}

export function Reveal({ children, as = 'div', variant = 'rise', className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const variantClass = variant === 'scale' ? 'reveal-scale' : variant === 'stagger' ? 'reveal-stagger' : 'reveal'
  const Tag = as
  return (
    <Tag
      ref={ref as never}
      className={`${variantClass} ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}

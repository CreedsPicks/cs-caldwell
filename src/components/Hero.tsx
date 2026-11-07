import type { ReactNode } from 'react'
import { useParallax, parallaxStyle } from '@/hooks/useParallax'

type HeroProps = {
  image: string
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  children?: ReactNode
  height?: 'full' | 'tall' | 'medium'
}

export function Hero({ image, eyebrow, title, subtitle, children, height = 'tall' }: HeroProps) {
  const parallaxRef = useParallax<HTMLDivElement>(0.18)

  const heightClass =
    height === 'full' ? 'min-h-[100vh]' : height === 'medium' ? 'min-h-[56vh]' : 'min-h-[82vh]'

  return (
    <section className={`relative ${heightClass} flex items-end overflow-hidden bg-[var(--color-ink)]`}>
      <div
        ref={parallaxRef}
        className="absolute inset-0 scale-[1.15]"
        style={parallaxStyle}
      >
        <img src={image} alt="" className="h-full w-full object-cover" />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,5,5,0.35) 0%, rgba(5,5,5,0.55) 45%, rgba(5,5,5,0.94) 100%)',
        }}
      />
      <div className="absolute inset-0 grain-overlay" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-40 sm:px-10">
        {eyebrow && (
          <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-gold-bright)]">
            <span className="rule-gold" />
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl font-[var(--font-display)] text-4xl font-medium leading-[1.05] text-[var(--color-paper)] sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">{subtitle}</p>
        )}
        {children}
      </div>
    </section>
  )
}

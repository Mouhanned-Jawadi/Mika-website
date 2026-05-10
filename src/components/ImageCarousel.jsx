import { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import img01 from '../../assets/IMG_8203.JPG'
import img02 from '../../assets/IMG_8204.JPG'
import img03 from '../../assets/IMG_8205.JPG'
import img04 from '../../assets/IMG_8206.JPG'
import img05 from '../../assets/IMG_8207.JPG'
import img06 from '../../assets/IMG_8209.JPG'
import img07 from '../../assets/IMG_8210.JPG'
import img08 from '../../assets/IMG_8211.JPG'
import img09 from '../../assets/IMG_8212.JPG'
import img10 from '../../assets/IMG_8213.JPG'
import img11 from '../../assets/IMG_8214.JPG'
import img12 from '../../assets/IMG_8215.JPG'
import img13 from '../../assets/IMG_8216.JPG'
import img14 from '../../assets/IMG_8218.JPG'
import img15 from '../../assets/IMG_8219.JPG'

const SLIDES = [
  img01, img02, img03, img04, img05,
  img06, img07, img08, img09, img10,
  img11, img12, img13, img14, img15,
]

const INTERVAL_MS = 4500
const TRANSITION_MS = 900

export function ImageCarousel({ title, subtitle }) {
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const prev = () => setActive(a => (a - 1 + SLIDES.length) % SLIDES.length)
  const next = () => setActive(a => (a + 1) % SLIDES.length)
  const goTo = (i) => setActive(i)

  useEffect(() => {
    if (isPaused) return
    const id = setInterval(() => {
      setActive(a => (a + 1) % SLIDES.length)
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [isPaused])

  return (
    <section id="moments" className="section-wrap overflow-hidden">
      <div className="mx-auto w-full max-w-6xl">

        <div className="reveal-up mb-8">
          <h2 className="font-display text-3xl text-brand-ink">{title}</h2>
          <p className="mt-2 text-brand-muted">{subtitle}</p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Ambient glow */}
          <div className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-gradient-to-r from-brand-berry/15 via-brand-gold/10 to-brand-berry/15 blur-3xl opacity-70" />

          {/* Decorative outer ring */}
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-brand-gold/40 via-brand-berry/20 to-brand-gold/40" />

          {/* Carousel frame */}
          <div className="relative h-[280px] overflow-hidden rounded-3xl border border-brand-gold/20 shadow-soft sm:h-[420px] lg:h-[520px]">

            {/* Slides */}
            {SLIDES.map((src, i) => (
              <div
                key={i}
                aria-hidden={i !== active}
                className="absolute inset-0"
                style={{
                  transition: `opacity ${TRANSITION_MS}ms cubic-bezier(0.4,0,0.2,1), transform ${TRANSITION_MS}ms cubic-bezier(0.4,0,0.2,1)`,
                  opacity: i === active ? 1 : 0,
                  transform: i === active ? 'scale(1)' : 'scale(1.05)',
                  zIndex: i === active ? 1 : 0,
                }}
              >
                <img
                  src={src}
                  alt={`QueensBags — moment ${i + 1}`}
                  className="h-full w-full object-cover"
                  loading={i === 0 ? 'eager' : 'lazy'}
                  draggable={false}
                />
              </div>
            ))}

            {/* Bottom gradient overlay */}
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-brand-ink/45 via-transparent to-transparent" />

            {/* Brand pill — top left */}
            <div className="absolute left-4 top-4 z-20 rounded-full border border-white/25 bg-brand-ivory/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-berry backdrop-blur">
              QueensBags
            </div>

            {/* Slide counter — bottom right */}
            <div className="absolute bottom-5 right-4 z-20 rounded-full border border-white/20 bg-brand-ink/35 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              {String(active + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
            </div>

            {/* Prev arrow */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-brand-ivory/80 text-brand-berry shadow-soft backdrop-blur transition-all duration-200 hover:scale-110 hover:border-brand-berry hover:bg-brand-berry hover:text-white hover:shadow-glow"
            >
              <FaChevronLeft size={13} />
            </button>

            {/* Next arrow */}
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-brand-ivory/80 text-brand-berry shadow-soft backdrop-blur transition-all duration-200 hover:scale-110 hover:border-brand-berry hover:bg-brand-berry hover:text-white hover:shadow-glow"
            >
              <FaChevronRight size={13} />
            </button>

            {/* Auto-advance progress bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-white/10">
              <div
                key={`${active}-${isPaused}`}
                className="h-full rounded-full bg-brand-berry/65"
                style={{
                  animation: isPaused
                    ? 'none'
                    : `carousel-progress ${INTERVAL_MS}ms linear forwards`,
                }}
              />
            </div>
          </div>

          {/* Dot indicators */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`rounded-full transition-all duration-300 ease-out ${
                  i === active
                    ? 'h-2 w-6 bg-brand-berry shadow-[0_0_8px_rgba(178,67,102,0.45)]'
                    : 'h-2 w-2 bg-brand-gold/40 hover:bg-brand-gold/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

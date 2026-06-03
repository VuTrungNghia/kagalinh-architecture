import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import type { ProjectSlide } from '../data/projects.types'
import { SLIDESHOW_SIZES, preloadSlide } from '../lib/image'
import { OptimizedPicture } from './OptimizedPicture'
import { SlideCaption } from './SlideCaption'
import { useDragToSlide } from '../hooks/useDragToSlide'

const AUTO_PLAY_MS = 5500

type ImageSlideshowProps = {
  slides: ProjectSlide[]
  projectTitle: string
  projectSubtitle: string
  isActive: boolean
}

export function ImageSlideshow({
  slides,
  projectTitle,
  projectSubtitle,
  isActive,
}: ImageSlideshowProps) {
  const [index, setIndex] = useState(0)

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + slides.length) % slides.length)
    },
    [slides.length],
  )

  const goNext = useCallback(() => goTo(index + 1), [goTo, index])
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index])

  const { eventHandlers } = useDragToSlide(goNext, goPrev)

  useEffect(() => {
    if (!isActive) return
    const timer = window.setInterval(goNext, AUTO_PLAY_MS)
    return () => window.clearInterval(timer)
  }, [isActive, goNext])

  useEffect(() => {
    if (!isActive) setIndex(0)
  }, [isActive])

  const current = slides[index]
  const captionTitle = current.title ?? projectTitle
  const captionSubtitle = current.subtitle ?? projectSubtitle

  useEffect(() => {
    if (!isActive || slides.length < 2) return
    const next = slides[(index + 1) % slides.length]
    preloadSlide(next, 1920)
  }, [index, isActive, slides])

  return (
    <div
      {...eventHandlers}
      className="relative h-full w-full overflow-hidden select-none"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${projectTitle}-${current.id}`}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <OptimizedPicture
            slide={current}
            sizes={SLIDESHOW_SIZES}
            priority={isActive}
          />
          <div className="absolute inset-0 bg-white/8" />
          <SlideCaption title={captionTitle} subtitle={captionSubtitle} />
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-between px-3 sm:px-6">
        <button
          type="button"
          onClick={goPrev}
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50 sm:h-12 sm:w-12"
          aria-label="Previous slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M14 6l-6 6 6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={goNext}
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50 sm:h-12 sm:w-12"
          aria-label="Next slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M10 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="absolute bottom-6 right-6 z-20 flex gap-2 sm:bottom-10 sm:right-10">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'w-8 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
          />
        ))}
      </div>
    </div>
  )
}

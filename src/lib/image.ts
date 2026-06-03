import type { ImageVariant, ProjectSlide } from '../data/projects.types'

export const SLIDESHOW_SIZES = '100vw'
export const CARD_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
export const GALLERY_SIZES = '(max-width: 640px) 100vw, 50vw'

export function buildSrcSet(variants: ImageVariant[] | undefined) {
  if (!variants?.length) return undefined
  return variants.map((v) => `${v.url} ${v.width}w`).join(', ')
}

export function pickLargest(variants: ImageVariant[] | undefined, fallback: string) {
  if (!variants?.length) return fallback
  return variants[variants.length - 1].url
}

export function preloadUrl(url: string) {
  const img = new Image()
  img.decoding = 'async'
  img.src = url
}

export function preloadSlide(slide: ProjectSlide, preferWidth = 1920) {
  const webp =
    slide.webp?.find((v) => v.width >= preferWidth) ?? slide.webp?.[slide.webp.length - 1]
  preloadUrl(webp?.url ?? slide.image)
}

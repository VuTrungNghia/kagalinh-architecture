import type { ProjectSlide } from '../data/projects.types'
import { buildSrcSet, pickLargest } from '../lib/image'

type OptimizedPictureProps = {
  slide: Pick<ProjectSlide, 'image' | 'webp' | 'jpeg' | 'alt' | 'blurDataURL' | 'width' | 'height'>
  sizes: string
  className?: string
  priority?: boolean
  objectFit?: 'cover' | 'contain'
}

export function OptimizedPicture({
  slide,
  sizes,
  className = '',
  priority = false,
  objectFit = 'cover',
}: OptimizedPictureProps) {
  const webpSet = buildSrcSet(slide.webp)
  const jpegSet = buildSrcSet(slide.jpeg)
  const fallback = pickLargest(slide.jpeg, pickLargest(slide.webp, slide.image))

  const fitClass = objectFit === 'cover' ? 'object-cover' : 'object-contain'

  return (
    <picture className={`block h-full w-full ${className}`}>
      {webpSet && (
        <source type="image/webp" srcSet={webpSet} sizes={sizes} />
      )}
      {jpegSet && (
        <source type="image/jpeg" srcSet={jpegSet} sizes={sizes} />
      )}
      <img
        src={fallback}
        alt={slide.alt}
        width={slide.width}
        height={slide.height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={`h-full w-full ${fitClass}`}
        style={
          slide.blurDataURL
            ? {
                backgroundImage: `url(${slide.blurDataURL})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : undefined
        }
      />
    </picture>
  )
}

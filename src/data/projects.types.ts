export type ImageVariant = {
  width: number
  url: string
}

export type ProjectSlide = {
  id: string
  alt: string
  title?: string
  subtitle?: string
  /** Default display URL (1280px WebP or original) */
  image: string
  original?: string
  webp?: ImageVariant[]
  jpeg?: ImageVariant[]
  blurDataURL?: string
  width?: number
  height?: number
}

export type Project = {
  id: string
  title: string
  subtitle: string
  description: string
  date: string
  location: string
  client: string
  services: string[]
  slides: ProjectSlide[]
}

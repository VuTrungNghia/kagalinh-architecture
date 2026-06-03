import { useEffect } from 'react'

type SeoProps = {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article'
}

const SITE = 'Kagalinh Architecture'
const ORIGIN = typeof window !== 'undefined' ? window.location.origin : ''

export function Seo({
  title,
  description,
  path = '',
  image = '/kagalinh_icon.svg',
  type = 'website',
}: SeoProps) {
  const fullTitle = title.includes(SITE) ? title : `${title} | ${SITE}`
  const url = `${ORIGIN}${path}`
  const imageUrl = image.startsWith('http') ? image : `${ORIGIN}${image}`

  useEffect(() => {
    document.title = fullTitle

    const setMeta = (key: string, content: string, prop = 'name') => {
      let el = document.querySelector(`meta[${prop}="${key}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(prop, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', description)
    setMeta('og:title', fullTitle, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:type', type, 'property')
    setMeta('og:url', url, 'property')
    setMeta('og:image', imageUrl, 'property')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)
    setMeta('twitter:image', imageUrl)

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  }, [fullTitle, description, url, imageUrl, type])

  return null
}

export function ProjectJsonLd({
  name,
  description,
  url,
  images,
}: {
  name: string
  description: string
  url: string
  images: string[]
}) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name,
      description,
      url,
      image: images.slice(0, 8),
      author: {
        '@type': 'Organization',
        name: SITE,
      },
    })
    script.id = 'project-jsonld'
    const old = document.getElementById('project-jsonld')
    old?.remove()
    document.head.appendChild(script)
    return () => script.remove()
  }, [name, description, url, images])

  return null
}

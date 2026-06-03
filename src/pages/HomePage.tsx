import { ProjectScroller } from '../components/ProjectScroller'
import { Seo } from '../components/Seo'
import { site } from '../data/site'

export function HomePage() {
  return (
    <main>
      <Seo title={site.title} description={site.description} path="/" />
      <ProjectScroller />
    </main>
  )
}

import { useRef } from 'react'
import type { Project } from '../data/projects'
import { useInView } from '../hooks/useInView'
import { ImageSlideshow } from './ImageSlideshow'

type ProjectSectionProps = {
  project: Project
}

export function ProjectSection({ project }: ProjectSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isActive = useInView(sectionRef)

  return (
    <section
      ref={sectionRef}
      id={project.id}
      className="relative h-[100dvh] w-full snap-start snap-always"
      aria-label={project.title}
    >
      <ImageSlideshow
        slides={project.slides}
        projectTitle={project.title}
        projectSubtitle={project.subtitle}
        isActive={isActive}
      />
    </section>
  )
}

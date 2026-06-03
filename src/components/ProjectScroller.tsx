import { projects } from '../data/projects'
import { ProjectSection } from './ProjectSection'
import { useDragToScroll } from '../hooks/useDragToScroll'

export function ProjectScroller() {
  const { containerRef, eventHandlers, isDragging } = useDragToScroll()

  return (
    <div
      ref={containerRef}
      {...eventHandlers}
      className={`snap-y snap-mandatory ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
    >
      {projects.map((project) => (
        <ProjectSection key={project.id} project={project} />
      ))}
    </div>
  )
}

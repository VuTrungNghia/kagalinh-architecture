import { projects } from '../data/projects'
import { ProjectSection } from './ProjectSection'

export function ProjectScroller() {
  return (
    <div className="snap-y snap-mandatory">
      {projects.map((project) => (
        <ProjectSection key={project.id} project={project} />
      ))}
    </div>
  )
}

import type { Project } from './projects.types'
import { projects as generatedProjects } from './projects.generated'

export type { ImageVariant, Project, ProjectSlide } from './projects.types'

export const projects: Project[] = generatedProjects

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

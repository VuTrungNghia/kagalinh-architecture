import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { OptimizedPicture } from '../components/OptimizedPicture'
import { Seo } from '../components/Seo'
import { projects } from '../data/projects'
import { CARD_SIZES } from '../lib/image'

export function ProjectsPage() {
  return (
    <main className="min-h-screen bg-neutral-950 pt-24 pb-16">
      <Seo
        title="Dự án"
        description="Danh sách dự án kiến trúc và thiết kế nội thất 3D — Kagalinh Architecture."
        path="/projects"
      />
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-medium uppercase tracking-[0.25em] text-white/50"
        >
          Projects
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-4 font-display text-4xl font-semibold text-white sm:text-5xl"
        >
          Selected work
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mt-4 max-w-xl text-white/60"
        >
          Chọn một dự án để xem chi tiết, gallery và thông tin sự kiện.
        </motion.p>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <motion.li
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
            >
              <Link
                to={`/details/${project.id}`}
                className="group block overflow-hidden rounded-lg border border-white/10 bg-neutral-900/50"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {project.slides[0] && (
                    <OptimizedPicture
                      slide={project.slides[0]}
                      sizes={CARD_SIZES}
                      className="transition duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <h2 className="font-display text-xl font-semibold text-white sm:text-2xl">
                      {project.title}
                    </h2>
                    <p className="mt-1 text-sm text-white/70">{project.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between px-5 py-4 text-sm text-white/50">
                  <span>{project.date}</span>
                  <span className="text-white/80 transition group-hover:text-white">
                    Chi tiết →
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </main>
  )
}

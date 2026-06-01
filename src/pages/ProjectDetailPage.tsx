import { motion } from 'framer-motion'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getProjectById } from '../data/projects'

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const project = id ? getProjectById(id) : undefined

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  return (
    <main className="min-h-screen bg-neutral-950 pt-24 pb-16">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <Link
          to="/projects"
          className="text-sm text-white/50 transition hover:text-white"
        >
          ← Tất cả dự án
        </Link>

        <div className="relative mt-8 aspect-[21/9] overflow-hidden rounded-lg sm:aspect-[2/1]">
          <img
            src={project.slides[0]?.image}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 sm:p-10">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-3xl font-semibold text-white sm:text-5xl"
            >
              {project.title}
            </motion.h1>
            <p className="mt-2 text-white/75">{project.subtitle}</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mt-10 grid gap-10 border-b border-white/10 pb-10 sm:grid-cols-3"
        >
          <div className="sm:col-span-2">
            <h2 className="text-xs font-medium uppercase tracking-wider text-white/40">
              Overview
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-white/70">{project.description}</p>
          </div>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-white/40">Date</dt>
              <dd className="mt-1 text-white">{project.date}</dd>
            </div>
            <div>
              <dt className="text-white/40">Location</dt>
              <dd className="mt-1 text-white">{project.location}</dd>
            </div>
            <div>
              <dt className="text-white/40">Client</dt>
              <dd className="mt-1 text-white">{project.client}</dd>
            </div>
            <div>
              <dt className="text-white/40">Services</dt>
              <dd className="mt-1 flex flex-wrap gap-2">
                {project.services.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/15 px-3 py-1 text-white/80"
                  >
                    {s}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </motion.div>

        <h2 className="mt-10 text-xs font-medium uppercase tracking-wider text-white/40">
          Gallery
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {project.slides.map((slide, i) => (
            <motion.figure
              key={slide.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="overflow-hidden rounded-lg border border-white/10"
            >
              <img src={slide.image} alt="" className="aspect-[4/3] w-full object-cover" />
            </motion.figure>
          ))}
        </div>

        <Link
          to="/"
          className="mt-12 inline-flex border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:border-white/50 hover:bg-white/5"
        >
          Xem slideshow trang chủ
        </Link>
      </div>
    </main>
  )
}

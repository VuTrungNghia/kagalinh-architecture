import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { aboutContent } from '../data/site'

function ProfilePhoto() {
  return (
    <div className="aspect-square w-full max-w-[280px] overflow-hidden rounded-2xl border border-stone-200/80 bg-stone-100 shadow-sm sm:max-w-none">
      <img
        src={aboutContent.avatar}
        alt={aboutContent.name}
        className="h-full w-full object-cover object-center"
      />
    </div>
  )
}

export function AboutPage() {
  return (
    <main className="min-h-screen bg-cream pt-20 text-kagalinh-dark sm:pt-24">
      <div className="mx-auto max-w-5xl px-5 pb-20 sm:px-8 lg:px-12">
        <section className="grid gap-8 pt-6 sm:grid-cols-[minmax(200px,280px)_1fr] sm:gap-10 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
          >
            <ProfilePhoto />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="flex flex-col justify-center sm:pt-4"
          >
            <span className="inline-flex w-fit rounded-full bg-kagalinh-green/15 px-3 py-1 text-xs font-medium text-kagalinh-green sm:text-sm">
              {aboutContent.role}
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-kagalinh-dark sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {aboutContent.name}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-stone-600 sm:text-lg">
              {aboutContent.bio}
            </p>
          </motion.div>
        </section>

        <hr className="my-12 border-stone-200 sm:my-14" />

        <section id="about-story" className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500"
          >
            {aboutContent.storyLabel}
          </motion.p>
          <motion.blockquote
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 border-l-2 border-kagalinh-green pl-5 text-base leading-relaxed text-stone-600 sm:text-lg sm:leading-relaxed"
          >
            {aboutContent.story}
          </motion.blockquote>
        </section>

        <div className="mt-16 flex flex-col items-center gap-8">

          <Link
            to="/projects"
            className="text-sm font-medium text-kagalinh-green underline-offset-4 transition hover:underline"
          >
            Xem dự án →
          </Link>
        </div>
      </div>
    </main>
  )
}

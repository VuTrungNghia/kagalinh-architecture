import { motion } from 'framer-motion'

type SlideCaptionProps = {
  title: string
  subtitle: string
}

export function SlideCaption({ title, subtitle }: SlideCaptionProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-6 pb-10 sm:p-10 sm:pb-14">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <motion.div
        className="relative max-w-xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
          {title}
        </h2>
        <p className="mt-2 text-sm text-white/75 sm:text-base md:text-lg">{subtitle}</p>
      </motion.div>
    </div>
  )
}

import { motion } from 'framer-motion'

type MenuToggleProps = {
  isOpen: boolean
  onToggle: () => void
  className?: string
}

const line = 'block h-[2px] w-5 shrink-0 rounded-full bg-current'

export function MenuToggle({ isOpen, onToggle, className = '' }: MenuToggleProps) {
  const label = isOpen ? 'Đóng menu' : 'Mở menu'

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-white/40 hover:bg-white/5 ${className}`}
      aria-label={label}
      aria-expanded={isOpen}
      aria-controls="site-menu"
    >
      <span className="flex h-5 w-5 flex-col items-center justify-center gap-[5px]">
        <motion.span
          className={line}
          animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.22, ease: 'easeInOut' }}
        />
        <motion.span
          className={line}
          animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.15 }}
        />
        <motion.span
          className={line}
          animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.22, ease: 'easeInOut' }}
        />
      </span>
    </button>
  )
}

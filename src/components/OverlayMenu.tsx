import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { mainNavLinks, socialLinks } from '../data/navigation'
import { MenuToggle } from './MenuToggle'

type OverlayMenuProps = {
  isOpen: boolean
  onClose: () => void
  onToggle: () => void
}

export function OverlayMenu({ isOpen, onClose, onToggle }: OverlayMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-label="Đóng menu"
          />

          <motion.aside
            id="site-menu"
            className="fixed inset-y-0 right-0 z-[120] flex w-full max-w-sm flex-col border-l border-white/10 bg-neutral-950 shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu điều hướng"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                Menu
              </span>
              <MenuToggle isOpen onToggle={onToggle} />
            </div>

            <nav className="flex-1 px-6 py-10">
              <ul className="space-y-1">
                {mainNavLinks.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06 }}
                  >
                    <NavLink
                      to={link.to}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `block py-3 font-display text-3xl transition ${
                          isActive ? 'text-white' : 'text-white/90 hover:text-white'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <footer className="border-t border-white/10 px-6 py-8">
              <p className="text-sm text-white/50">
                Kagalinh Architecture
                <br />
                Kiến trúc & Visualization 3D
              </p>
              <p className="mt-2 text-sm text-white/40">hello@kagalinh.com</p>

              <div className="mt-6 flex flex-wrap gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-medium uppercase tracking-wider text-white/60 transition hover:text-white"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

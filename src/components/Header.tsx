import { Link } from 'react-router-dom'
import { site } from '../data/site'
import { MenuToggle } from './MenuToggle'

type HeaderProps = {
  menuOpen: boolean
  onMenuToggle: () => void
}

export function Header({ menuOpen, onMenuToggle }: HeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-white/10 bg-neutral-950/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
          <img
            src={site.logo}
            alt=""
            className="h-9 w-9 shrink-0 rounded-lg object-cover ring-1 ring-white/20 transition group-hover:ring-white/40"
          />
          <span className="truncate font-display text-base font-semibold tracking-tight text-white sm:text-lg lg:text-xl">
            {site.name}
          </span>
        </Link>

        <MenuToggle isOpen={menuOpen} onToggle={onMenuToggle} />
      </div>
    </header>
  )
}

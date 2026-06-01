import { useCallback, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '../components/Header'
import { OverlayMenu } from '../components/OverlayMenu'
import { MenuProvider } from '../context/MenuContext'

export function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const openMenu = useCallback(() => setMenuOpen(true), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    closeMenu()
  }, [location.pathname, closeMenu])

  useEffect(() => {
    const isHome = location.pathname === '/'
    document.documentElement.classList.toggle('snap-scroll', isHome)
    return () => document.documentElement.classList.remove('snap-scroll')
  }, [location.pathname])

  return (
    <MenuProvider openMenu={openMenu}>
      <Header menuOpen={menuOpen} onMenuToggle={toggleMenu} />
      <OverlayMenu isOpen={menuOpen} onClose={closeMenu} onToggle={toggleMenu} />
      <Outlet />
    </MenuProvider>
  )
}

import { createContext, useContext, type ReactNode } from 'react'

type MenuContextValue = {
  openMenu: () => void
}

const MenuContext = createContext<MenuContextValue | null>(null)

export function MenuProvider({
  children,
  openMenu,
}: {
  children: ReactNode
  openMenu: () => void
}) {
  return <MenuContext.Provider value={{ openMenu }}>{children}</MenuContext.Provider>
}

export function useMenu() {
  const ctx = useContext(MenuContext)
  if (!ctx) throw new Error('useMenu must be used within MenuProvider')
  return ctx
}

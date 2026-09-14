import { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import { Header } from '@/layouts/customer-area/Header/Header'
import { NavMenu } from '@/layouts/customer-area/NavMenu/NavMenu'
import { useMediaQuery } from '@/shared/lib/useMediaQuery'
import styles from './CustomerAreaLayout.module.scss'

const NAV_ID = 'customer-nav'
// Mirrors `desktop` in src/app/styles/breakpoints.scss: from 992px up the menu is always
// visible and the burger disappears.
const DESKTOP_QUERY = '(min-width: 992px)'

export function CustomerAreaLayout() {
  const isDesktop = useMediaQuery(DESKTOP_QUERY)
  const [isOpen, setOpen] = useState(false)
  const menuOpen = isOpen && !isDesktop

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <div className={styles.layout} lang="de">
      <Header
        showToggle={!isDesktop}
        menuOpen={menuOpen}
        onToggleMenu={() => setOpen((open) => !open)}
        navId={NAV_ID}
      />
      <NavMenu id={NAV_ID} hidden={!isDesktop && !menuOpen} onNavigate={() => setOpen(false)} />
      {/* The open overlay covers the content, so keep it out of the tab order too. */}
      <main className={styles.main} inert={menuOpen}>
        <Outlet />
      </main>
    </div>
  )
}

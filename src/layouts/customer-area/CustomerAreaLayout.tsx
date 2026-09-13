import { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import { useMediaQuery } from '../../shared/lib/useMediaQuery'
import styles from './CustomerAreaLayout.module.scss'
import { Header } from './Header'
import { NavMenu } from './NavMenu'

const NAV_ID = 'customer-nav'

export function CustomerAreaLayout() {
  // From 992px up the menu is always visible and the burger disappears.
  const isDesktop = useMediaQuery('(min-width: 992px)')
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    if (isDesktop) setOpen(false)
  }, [isDesktop])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  return (
    <div className={styles.layout} lang="de">
      <Header
        showToggle={!isDesktop}
        menuOpen={isOpen}
        onToggleMenu={() => setOpen((open) => !open)}
        navId={NAV_ID}
      />
      <NavMenu id={NAV_ID} hidden={!isDesktop && !isOpen} onNavigate={() => setOpen(false)} />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}

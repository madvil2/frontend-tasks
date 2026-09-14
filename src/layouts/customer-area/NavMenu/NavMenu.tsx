import { NavItem } from '@/layouts/customer-area/NavItem/NavItem'
import { navItems } from '@/layouts/customer-area/navItems'
import styles from './NavMenu.module.scss'

interface NavMenuProps {
  id: string
  hidden: boolean
  onNavigate: () => void
}

export function NavMenu({ id, hidden, onNavigate }: NavMenuProps) {
  return (
    <nav id={id} className={styles.nav} aria-label="Hauptmenü" hidden={hidden}>
      <ul className={styles.list}>
        {navItems.map((item) => (
          <NavItem key={item.id} item={item} onNavigate={onNavigate} />
        ))}
      </ul>
    </nav>
  )
}

import { NavLink } from 'react-router'
import styles from './NavItem.module.scss'
import type { NavItemData } from './navItems'

interface NavItemProps {
  item: NavItemData
  onNavigate: () => void
}

export function NavItem({ item, onNavigate }: NavItemProps) {
  const Icon = item.icon
  const content = (
    <>
      <Icon className={styles.icon} />
      {item.label}
    </>
  )
  // Function-form className keeps react-router from appending its global "active" class.
  return (
    <li className={styles.item}>
      {item.to ? (
        <NavLink to={item.to} end className={() => styles.link} onClick={onNavigate}>
          {content}
        </NavLink>
      ) : (
        <button type="button" className={styles.link} onClick={onNavigate}>
          {content}
        </button>
      )}
    </li>
  )
}

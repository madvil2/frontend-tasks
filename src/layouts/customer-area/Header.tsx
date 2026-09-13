import styles from './Header.module.scss'
import { BurgerIcon, CloseIcon, Logo } from './icons'

interface HeaderProps {
  showToggle: boolean
  menuOpen: boolean
  onToggleMenu: () => void
  navId: string
}

export function Header({ showToggle, menuOpen, onToggleMenu, navId }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Logo className={styles.logo} />
        <p className={styles.tagline}>Einfach 60 Tage Geld leihen</p>
      </div>

      {showToggle && (
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={menuOpen}
          aria-controls={navId}
          aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
          onClick={onToggleMenu}
        >
          {menuOpen ? <CloseIcon width={30} height={30} /> : <BurgerIcon width={30} height={30} />}
        </button>
      )}

      <p className={styles.greeting}>
        <span className={styles.label}>Hallo,</span>
        <span className={styles.value}>John Smith</span>
      </p>

      <p className={styles.status}>
        <span className={styles.label}>
          Status<span className={styles.labelLong}> Ihrer Identifizierung</span>
        </span>
        <span className={`${styles.value} ${styles.statusValue}`}>Identifiziert</span>
      </p>
    </header>
  )
}

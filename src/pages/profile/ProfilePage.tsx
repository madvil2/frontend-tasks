import { DataSection } from './DataSection'
import styles from './ProfilePage.module.scss'
import { profileSections } from './profile.data'

export function ProfilePage() {
  return (
    <div className={styles.grid}>
      {profileSections.map((section) => (
        <DataSection key={section.id} section={section} />
      ))}
    </div>
  )
}

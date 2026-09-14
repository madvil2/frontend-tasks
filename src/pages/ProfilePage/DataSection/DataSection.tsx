import { useId } from 'react'
import { DataGroup } from '@/pages/ProfilePage/DataGroup/DataGroup'
import type { ProfileSection } from '@/pages/ProfilePage/profile.data'
import styles from './DataSection.module.scss'

export function DataSection({ section }: { section: ProfileSection }) {
  const headingId = useId()
  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <h2 id={headingId} className={styles.title}>
        {section.title}
      </h2>
      {section.groups.map((rows) => (
        <DataGroup key={rows[0]?.label} rows={rows} />
      ))}
    </section>
  )
}

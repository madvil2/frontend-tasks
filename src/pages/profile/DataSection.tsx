import { DataGroup } from './DataGroup'
import styles from './DataSection.module.scss'
import type { ProfileSection } from './profile.data'

export function DataSection({ section }: { section: ProfileSection }) {
  const headingId = `${section.id}-heading`
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

import { MaleIcon } from '../../../layouts/customer-area/icons'
import type { ProfileRow } from '../profile.data'
import styles from './DataGroup.module.scss'

export function DataGroup({ rows }: { rows: ProfileRow[] }) {
  return (
    <dl className={styles.group}>
      {rows.map((row) => (
        <div key={row.label} className={styles.row}>
          <dt className={styles.label}>{row.label}</dt>
          <dd className={styles.value}>
            {row.icon === 'male' && <MaleIcon className={styles.icon} />}
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

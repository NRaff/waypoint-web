import Link from 'next/link'
import styles from '@/styles/modules/logo.module.css'

export default function Logo() {
  return (
    <h1 className={styles.waypoint}>
      <Link href='/'>
        <a>⛵️ Waypoint</a>
      </Link>
    </h1>
  )
}
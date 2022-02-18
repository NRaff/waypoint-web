import Link from "next/link";
import Logo from "./Logo";
import styles from '@/styles/modules/waypointNav.module.css'

export default function WaypointNav({type}: any) {
  function displayNavOptions() {
    switch (type) {
      case 'login':
        return (
          <menu className={styles.authOptions}>
            <Link href='/auth/signup'>
              <a>Signup</a>
            </Link>
          </menu>
        )
      case 'signup':
        return (
          <menu className={styles.authOptions}>
            <Link href='/auth/login'>
              <a>Login</a>
            </Link>
          </menu>
        )
      default:
        return (
          <menu className={styles.authOptions}>
            <Link href='/auth/login'>
              <a>Login</a>
            </Link>
            <Link href='/auth/signup'>
              <a>Signup</a>
            </Link>
          </menu>
        )
    }
  }
  return (
    <nav className={styles.auth}>
      <Logo />
      {displayNavOptions()}
    </nav>
  )
}
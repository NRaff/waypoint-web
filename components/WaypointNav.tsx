import Link from "next/link";
import Logo from "./Logo";
import styles from '@/styles/modules/waypointNav.module.css'
import ProfileNavItem from "./ProfileNavItem";

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
      case 'loggedIn':
        return <ProfileNavItem />
      default:
        return (
          <menu className={styles.authOptions}>
            <Link href='/auth/login'>
              <a>Login</a>
            </Link>
            <h1 className="text-3xl font-bold underline">Hello world</h1>
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
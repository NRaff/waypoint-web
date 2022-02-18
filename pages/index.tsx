import styles from '@/styles/modules/index.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { updateBase } from 'redux/actions/actions'
import Link from 'next/link'
import Landing from '@/components/Landing'


export default function Home() {
  return (
    <Landing home>
      <nav className={styles.landing}>
        <h1>Waypoint</h1>
        <menu className={styles.authOptions}>
          <Link href='/auth/login'>
            <a>Login</a>
          </Link>
          <Link href='/auth/signup'>
            <a>Signup</a>
          </Link>
        </menu>
      </nav>
    </Landing>
  )
}

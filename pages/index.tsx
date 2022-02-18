import styles from '@/styles/modules/index.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { updateBase } from 'redux/actions/actions'
import Link from 'next/link'
import Landing from '@/components/Landing'


export default function Home() {
  const dispatch = useDispatch()
  const currentCount = useSelector((state: any) => state.testReducer)
  return (
    <Landing home>
      <header>
        <h1>Waypoint Web: {currentCount}</h1>
        {/* <button
          onClick={() => dispatch(updateBase())}
        >Add One</button> */}
        <Link href='/auth/login'>
          <a>Login</a>
        </Link>
        <Link href='/auth/signup'>
          <a>Signup</a>
        </Link>
      </header>
    </Landing>
  )
}

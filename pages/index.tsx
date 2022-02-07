import Head from 'next/head'
import Image from 'next/image'
import styles from '@/pages/index.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { updateBase } from 'redux/actions/actions'


export default function Home() {
  const dispatch = useDispatch()
  const currentCount = useSelector((state: any) => state.testReducer)
  return (
    <header>
      <h1>Waypoint Web: {currentCount}</h1>
      <button
        onClick={() => dispatch(updateBase())}
      >Add One</button>
    </header>
  )
}

import WaypointWrapper from 'frontend/components/WaypointWrapper'
import WaypointNav from 'frontend/components/WaypointNav'
import { Dispatch, RootState, setupRematchStore, useStore } from 'frontend/models/store'
import { withServerSideAuth } from '@clerk/nextjs/ssr'
import { GetServerSidePropsResult } from 'next'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

const setupRematch = () => {
  const store = setupRematchStore()
  const {dispatch} = store
  dispatch.tests.addTest({
    name: 'Test 1',
    number: 1
  })
  return store.getState()
}

interface WaypointInstantiationProps {
    waypoint: any
    __clerk_ssr_state?: any
  }

export const getServerSideProps = withServerSideAuth(({req, resolvedUrl}): WaypointInstantiationProps | any => {
  const redirectTo = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : resolvedUrl
  const {sessionId} = req.auth;
  if (!sessionId) {
    return {
      redirect: { 
        destination: "/sign-in?redirect_url=/profile" + redirectTo,
        props: {}
      },
      props: {}
    }
  }
  const store = setupRematch()
  return { 
    props: {
      waypoint: store
  }}
}, {
  loadUser: true,
  loadSession: true,
})

const Start = ({waypoint, __clerk_ssr_state}: WaypointInstantiationProps) => {
  // const store = useStore(waypoint)
  const dispatch = useDispatch()
  // set store from props and get current user
  useEffect(() => {
    dispatch.session.receiveSession(__clerk_ssr_state)
  }, [])
  return (
    <WaypointWrapper home>
      <WaypointNav />
      <h1 className='bg-black'>Hello World</h1>
    </WaypointWrapper>
  )
}

export default Start

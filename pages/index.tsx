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
  const {users, session, courses} = useSelector((state: RootState) => {
    return {
      users: state.users, 
      session: state.session,
      courses: state.courses,
    }
  }) 
  // set store from props and get current user
  useEffect(() => {
    dispatch.session.receiveSession(__clerk_ssr_state)
  }, [])

  useEffect(() => {
    console.log({users,session, courses})
  }, [users,session, courses])

  // create user request only after setting the current user
  // const [didRequest, setDidRequest] = useState(false)
  // useEffect(() => {
  //   console.log('try request')
  //   const completeRequest = async () => {
  //     await dispatch.users.createUser({
  //       name: 'Eric Raff',
  //       email: 'eraff@xlconstruction.com'
  //     })
  //     // await dispatch.courses.getAllCourses()
  //     setDidRequest(true)
  //   }
  //   console.log({didRequest})
  //   if (!didRequest) {
  //     console.log('doing request')
  //     completeRequest()
  //   }
  // }, [dispatch.currentUser])
  // dispatch user and session here
    return (
      <WaypointWrapper home>
        <WaypointNav />
      </WaypointWrapper>
    )
}

export default Start

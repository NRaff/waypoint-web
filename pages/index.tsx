import WaypointWrapper from '@/components/WaypointWrapper'
import WaypointNav from '@/components/WaypointNav'
import { setupRematchStore, useStore } from 'models/store'
import { withServerSideAuth } from '@clerk/nextjs/ssr'
import { GetServerSidePropsResult } from 'next'

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
  const {sessionId} = req.auth;
  if (!sessionId) {
    return {
      redirect: { 
        destination: "/sign-in?redirect_url=" + resolvedUrl,
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
  const store = useStore(waypoint)
  // dispatch user and session here
    return (
      <WaypointWrapper home>
        <WaypointNav />
      </WaypointWrapper>
    )
}

export default Start

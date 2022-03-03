import WaypointWrapper from '@/components/WaypointWrapper'
import WaypointNav from '@/components/WaypointNav'
import useFirebaseAuth from 'hooks/useFirebaseAuth'
import { useRouter } from 'next/router'

export default function Start() {
  const authStatus = useFirebaseAuth()
  // if(authStatus) {
  //   return null
  // } else {
    return (
      <WaypointWrapper home>
        <WaypointNav />
      </WaypointWrapper>
    )
  // }
}

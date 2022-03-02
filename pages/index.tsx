import WaypointWrapper from '@/components/WaypointWrapper'
import WaypointNav from '@/components/WaypointNav'
import { useState } from 'react'
import useFirebaseAuth from 'hooks/useFirebaseAuth'
import { useRouter } from 'next/router'

export default function Start() {
  const [listType, setListType] = useState(true)
  const authStatus = useFirebaseAuth()
  if(authStatus) {
    const router = useRouter()
    router.push('/home')
    return null
  } else {
    return (
      <WaypointWrapper home>
        <WaypointNav />
      </WaypointWrapper>
    )
  }
}

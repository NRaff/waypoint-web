import WaypointWrapper from '@/components/WaypointWrapper'
import WaypointNav from '@/components/WaypointNav'
import ActivityList from '@/components/ActivityList'
import { useState } from 'react'
import ActivitiesSidebar from '@/components/ActivitiesSidebar'

export default function Start() {
  const [listType, setListType] = useState(true)
  return (
    <WaypointWrapper home>
      <WaypointNav />
      <ActivitiesSidebar />
    </WaypointWrapper>
  )
}

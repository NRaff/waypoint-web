import WaypointWrapper from '@/components/WaypointWrapper'
import WaypointNav from '@/components/WaypointNav'
import { useState } from 'react'
import ActivitiesSidebar from '@/components/ActivitiesSidebar'
import { WaypointApp } from '@/components/WaypointApp'

export default function Start() {
  const [listType, setListType] = useState(true)
  return (
    <WaypointWrapper home>
      <WaypointNav />
    </WaypointWrapper>
  )
}

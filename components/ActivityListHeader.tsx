import { useState } from "react"
import { ActivityHeaderProps } from "utility/types"
import styles from '@/styles/modules/activityListHeader.module.css'
import SidebarNavItem from "./SidebarNavItem"

const ACTIVITIES_SELECTED = 'activitiesSelected'

export default function ActivityListHeader({curType, setType}:ActivityHeaderProps) {
  return (
    <header className={styles.activitiesHeader}>
      <SidebarNavItem 
        title='Races'
        action={() => setType('Races')}
        style={curType === 'Races' ? ACTIVITIES_SELECTED : ''}
      />
      <SidebarNavItem
        title='Courses'
        action={() => setType('Courses')}
        style={curType==='Races' ? '' : ACTIVITIES_SELECTED}
      />
    </header>
  )
}
import { useState } from "react"
import { ActivityHeaderProps } from "utility/types"
import styles from '@/styles/modules/inAppNav.module.css'
import SidebarNavItem from "./SidebarNavItem"
import ProfileNavItem from "./ProfileNavItem"
import { Course } from "models/Course"
import { useSession } from "utility/selectors"

const ACTIVITIES_SELECTED = 'activitiesSelected'

export default function InAppNav({curType, setType}:ActivityHeaderProps) {
  const { uid } = useSession()
  const course = new Course(uid)

  function createCourse() {
    course.addToList()
  }

  return (
    <nav className={styles.inAppNav}>
      <section className={styles.activitySelection}>
        <SidebarNavItem
          title='🏁'
          action={() => setType('Races')}
          style={curType === 'Races' ? ACTIVITIES_SELECTED : ''}
          tooltip='View Races'
        />
        <SidebarNavItem
          title='🧭'
          action={() => setType('Courses')}
          style={curType === 'Races' ? '' : ACTIVITIES_SELECTED}
          tooltip='View Courses'
        />
        <hr 
          className={styles.sectionDivider}
        />
        <SidebarNavItem
          title='+'
          action={createCourse}
          style='addActivityButton'
          tooltip='New Activity'
        />
      </section>
      <section className={styles.accountSettings}>
        <ProfileNavItem type={'Image'} />
      </section>
    </nav>
  )
}
import { useState } from "react"
import { ActivityHeaderProps } from "utility/types"
import styles from '@/styles/modules/inAppNav.module.css'
import SidebarNavItem from "./SidebarNavItem"
import ProfileNavItem from "./ProfileNavItem"
import { Course } from "modules/Course"
import { useSession } from "utility/selectors"
import { CoursePermission } from "utility/types"
import { useDispatch } from "react-redux"
import { setSelectedCourse } from "redux/actions/actions"

const ACTIVITIES_SELECTED = 'activitiesSelected'

export default function InAppNav({curType, setType}:ActivityHeaderProps) {
  const { uid } = useSession()
  const dispatch = useDispatch()
  const courseDefault = {
    name: '',
    length: 0,
    duration: 0,
    type: CoursePermission.Private,
    created_by: uid,
    id: '',
    waypointsList: [],
    waypoints: {}
  }
  const course = new Course(uid, courseDefault)

  function createCourse() {
    // create the new course as blank
    course.addToList()
    // select the newly created course
    dispatch(setSelectedCourse({courseId: course.id}))
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
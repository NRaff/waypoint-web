// import { useState } from "react"
import { ActivityHeaderProps } from "shared/utility/types"
import styles from '@/styles/modules/inAppNav.module.css'
import SidebarNavItem from "./SidebarNavItem"
import { UserButton } from "@clerk/nextjs"

const ACTIVITIES_SELECTED = 'activitiesSelected'

export default function InAppNav({curType, setType}:ActivityHeaderProps) {
  // const { uid } = useSession()
  // const dispatch = useDispatch()
  // const courseDefault = {
  //   name: '',
  //   length: 0,
  //   duration: 0,
  //   type: CoursePermission.Private,
  //   created_by: uid,
  //   id: '',
  //   waypointsList: [],
  //   waypoints: {}
  // }
  // const course = new Course(uid, courseDefault)

  // function createCourse() {
  //   // create the new course as blank
  //   course.addToList()
  //   // select the newly created course
  //   dispatch(setSelectedCourse({courseId: course.id}))
  // }

  // return (
  //   <nav className={styles.inAppNav}>
  //     <section className={styles.activitySelection}>
  //       <SidebarNavItem
  //         title='🏁'
  //         action={() => console.log('choose races')}
  //         style={curType === 'Races' ? ACTIVITIES_SELECTED : ''}
  //         tooltip='View Races'
  //       />
  //       <SidebarNavItem
  //         title='🧭'
  //         action={() => {console.log('choose courses')}}
  //         style={curType === 'Races' ? '' : ACTIVITIES_SELECTED}
  //         tooltip='View Courses'
  //       />
  //       <hr 
  //         className={styles.sectionDivider}
  //       />
  //       <SidebarNavItem
  //         title='+'
  //         action={() => {console.log('create course tapped')}}
  //         style='addActivityButton'
  //         tooltip='New Activity'
  //       />
  //     </section>
  //   </nav>
  // )
  return null
  
}
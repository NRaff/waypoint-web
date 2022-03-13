import ActivitiesSidebar from "./ActivitiesSidebar";
import styles from '@/styles/modules/waypointApp.module.css'
import { useSession } from "utility/selectors";
import { Course } from "models/Course";
import { useEffect, useState } from "react";
import useFirebaseAuth from "hooks/useFirebaseAuth";
import { useDispatch } from "react-redux";
import InAppNav from "./InAppNav";
import ActivityList from "./ActivityList";
import { ActivityType } from "utility/types";

// TODO: catch listeners to turn them off on dismount
export function WaypointApp() {
  const authStatus = useFirebaseAuth()
  const { uid } = useSession()
  const course = new Course(uid)
  const dispatch = useDispatch()

  const [listType, setListType] = useState('Races')

  useEffect(() => {
    Course.listCourses(dispatch)
  }, [])  



  function createCourse() {
    course.addToList()
  }
  return (
    <div className={styles.waypointApp}>
      {/* Add Nav Sidebar with nav buttons for waypoint, races, courses, profile (on very bottom) */}
      {/* Remove waypoint nav */}
      {/* float the waypoint logo to the top right */}
      <InAppNav curType={listType} setType={setListType}/>
      <ActivityList type={listType as any}/>
      <button
        onClick={createCourse}
      >
        Add user
      </button>
    </div>
  )
}
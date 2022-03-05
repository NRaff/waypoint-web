import ActivitiesSidebar from "./ActivitiesSidebar";
import styles from '@/styles/modules/waypointApp.module.css'
import { useSession } from "utility/selectors";
import { Course } from "models/Course";
import { useEffect } from "react";
import useFirebaseAuth from "hooks/useFirebaseAuth";

// TODO: catch listeners to turn them off on dismount
export function WaypointApp() {
  const authStatus = useFirebaseAuth()
  const { uid } = useSession()
  const course = new Course(uid)
  useEffect(() => {
    Course.listCourses()
  }, [])  

  function createCourse() {
    course.addToList()
  }
  return (
    <div className={styles.waypointApp}>
      <ActivitiesSidebar />
      <h1>test content</h1>
      <button
        onClick={createCourse}
      >
        Add user
      </button>
      {/* main content */}
    </div>
  )
}
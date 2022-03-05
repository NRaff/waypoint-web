import ActivitiesSidebar from "./ActivitiesSidebar";
import styles from '@/styles/modules/waypointApp.module.css'
// import useFirebaseAuth from "hooks/useFirebaseAuth";
// import {getDatabase, ref, set} from 'firebase/database'
// import { getAuth } from "firebase/auth";
// import { FirebaseObject } from "models/FirebaseObject";
import { useSession } from "utility/selectors";
import { Courses } from "models/Courses";


export function WaypointApp() {
  const { uid } = useSession()
  // const authStatus = useFirebaseAuth()
  const course = new Courses(uid)
  Courses.listCourses()
  // const courses = Courses.getObjectsInList()
  // function writeData() {
  //   const database = getDatabase()
  //   set(ref(database, 'users/' + uid), {
  //     username: uid?.displayName,
  //     email: uid?.email,
  //     profile_picture: uid?.photoURL
  //   })
  // }

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
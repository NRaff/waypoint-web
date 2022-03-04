import ActivitiesSidebar from "./ActivitiesSidebar";
import styles from '@/styles/modules/waypointApp.module.css'
import useFirebaseAuth from "hooks/useFirebaseAuth";
import {getDatabase, ref, set} from 'firebase/database'
import { getAuth } from "firebase/auth";


export function WaypointApp() {
  const authStatus = useFirebaseAuth()

  function writeData() {
    const {currentUser} = getAuth()
    const database = getDatabase()
    set(ref(database, 'users/' + currentUser?.uid), {
      username: currentUser?.displayName,
      email: currentUser?.email,
      profile_picture: currentUser?.photoURL
    })
  }
  return (
    <div className={styles.waypointApp}>
      <ActivitiesSidebar />
      <h1>test content</h1>
      <button
        onClick={writeData}
      >
        Add user
      </button>
      {/* main content */}
    </div>
  )
}
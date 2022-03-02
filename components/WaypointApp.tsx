import ActivitiesSidebar from "./ActivitiesSidebar";
import styles from '@/styles/modules/waypointApp.module.css'
import useFirebaseAuth from "hooks/useFirebaseAuth";

export function WaypointApp() {
  const authStatus = useFirebaseAuth()
  return (
    <div className={styles.waypointApp}>
      <ActivitiesSidebar />
      <h1>test content</h1>
      {/* main content */}
    </div>
  )
}
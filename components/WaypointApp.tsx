import ActivitiesSidebar from "./ActivitiesSidebar";
import styles from '@/styles/modules/waypointApp.module.css'

export function WaypointApp() {

  return (
    <div className={styles.waypointApp}>
      <ActivitiesSidebar />
      {/* main content */}
    </div>
  )
}
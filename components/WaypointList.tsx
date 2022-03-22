import styles from '../styles/modules/waypointList.module.css'
import { Waypoint as WaypointType } from 'utility/types'
import WaypointCard from './WaypointCard'

export default function WaypointList({course}: any) {
  const {waypoints} = course

  return (
    <ul className={styles.waypointsList}>
      {
        Object.values(waypoints).map((waypoint) =>
          <WaypointCard waypoint={waypoint as WaypointType} />
        )
      }
    </ul>
  )
}
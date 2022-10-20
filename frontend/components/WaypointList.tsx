import styles from '../styles/modules/waypointList.module.css'
import { Waypoint as WaypointType } from 'shared/utility/types'
import WaypointCard from './WaypointCard'

export default function WaypointList({course}: any) {
  const {waypoints} = course

  return (
    <ul className={styles.waypointsList}>
      {
        Object.values(waypoints).map((waypoint) =>{
          const waypointMapped: WaypointType = waypoint as WaypointType
          return (
            <WaypointCard waypoint={waypointMapped} key={waypointMapped.id}/>
          )
        })
      }
    </ul>
  )
}
import styles from '../styles/modules/waypointCard.module.css'

export default function WaypointCard({waypoint}: any) {

  return (
    <li className={styles.waypointItem}>
      <h3>{waypoint.name}</h3>
      <p>Lat: {waypoint.point.lat}</p>
      <p>Lng: {waypoint.point.lng}</p>
    </li>
  )
}
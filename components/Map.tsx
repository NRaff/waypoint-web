import { useEffect } from "react"
import { MapLoader } from "utility/maps"
import styles from '../styles/modules/map.module.css'

export default function Map() {
  useEffect(() => {
    MapLoader.load().then(() => {
      const map = new google.maps.Map(document.getElementById('course-map') as HTMLElement, {
        center: {
          lat: -34.397,
          lng: 150.644
        },
        zoom: 8
      })
    })
  }, [])


  return (
    <div
      id="course-map"
      className={styles.map}
    >
      TEST MAP
    </div>
  )
}
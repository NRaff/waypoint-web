import { useEffect } from "react"
import { initMapWithHandler, MapLoader } from "utility/maps"
import { Coordinates } from "utility/types"
import styles from '../styles/modules/map.module.css'

export default function Map() {
  let map: google.maps.Map
  useEffect(() => {
    initMapWithHandler(map, 'course-map', 'click',placeMarker)
  }, [])

  const placeMarker = (e: any) => {
    const point: Coordinates = {}
    point.lat = e.latLng.lat()
    point.lng = e.latLng.lng()
    console.log(point)
  }


  return (
    <div
      id="course-map"
      className={styles.map}
    >
      TEST MAP
    </div>
  )
}
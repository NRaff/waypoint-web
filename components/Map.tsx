import { useEffect } from "react"
import { initMapWithHandler, initMapWithHandlerAsync, MapLoader, setMap } from "utility/maps"
import { Coordinates } from "utility/types"
import styles from '../styles/modules/map.module.css'

export default function Map() {
  let map: google.maps.Map
  useEffect(() => {
    initMapWithHandlerAsync('course-map', 'click', placeMarker)
    .then(res => map = res)
  }, [])

  const placeMarker = (e: any) => {
    const point: Coordinates = {}
    point.lat = e.latLng.lat()
    point.lng = e.latLng.lng()
    const marker = new google.maps.Marker({
      position: point as google.maps.LatLngLiteral,
      map: map
    })
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
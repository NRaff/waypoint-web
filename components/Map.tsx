import { useEffect, useReducer } from "react"
import { initMapWithHandlerAsync } from "utility/maps"
import { useSession } from "utility/selectors"
import { Coordinates, MapProps, Waypoint, WaypointType } from "utility/types"
import styles from '../styles/modules/map.module.css'

export default function Map({courseDispatch}: MapProps) {
  let map: google.maps.Map
  const {uid} = useSession()

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
    const waypoint: Waypoint = {
      name: 'test',
      course_id: 'test1',
      type: WaypointType.Start,
      point: point
    }
    courseDispatch({type: 'ADD_WAYPOINT', payload: waypoint})
    // add the marker to state
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
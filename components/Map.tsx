import { useEffect, useReducer, useState } from "react"
import { initMapWithHandlerAsync } from "utility/maps"
import { useSession } from "utility/selectors"
import { Coordinates, MapProps, Waypoint, PointType } from "utility/types"
import styles from '../styles/modules/map.module.css'

export default function Map({courseDispatch, course}: MapProps) {
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
      waypoint_id: `${Object.keys(course.waypoints).length}`,
      course_id: 'test1',
      type: PointType.Start,
      point: point
    }
    courseDispatch({type: 'ADD_WAYPOINT', payload: waypoint})
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
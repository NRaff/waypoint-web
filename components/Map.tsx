import mapboxgl, { EventData as MapEventData } from "mapbox-gl"
import { useEffect, useReducer, useState } from "react"
import { initMapBoxWithHandler, initMapWithHandlerAsync } from "utility/maps"
import { useSession } from "utility/selectors"
import { Coordinates, MapProps, Waypoint, PointType } from "utility/types"
import styles from '../styles/modules/map.module.css'

export default function Map({courseDispatch, course}: MapProps) {
  let map: mapboxgl.Map
  const {uid} = useSession()
  
  // TODO: Switch to Mapbox for terrain shading 
    useEffect(() => {
      map = initMapBoxWithHandler('course-map', placeMarker)
    }, [])

  const placeMarker = (e: MapEventData) => {
    const point: Coordinates = e.lngLat
    // const feature = map.queryRenderedFeatures(e.point)[0]
    const marker = new mapboxgl.Marker({
      draggable: true,
    })
    marker.setLngLat(point as mapboxgl.LngLatLike)
    marker.addTo(map)

    // TODO: update the course id to be the actual course id from firebase
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
    ></div>
  )
}
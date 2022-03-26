import mapboxgl, { EventData as MapEventData, PointLike } from "mapbox-gl"
import { useEffect, useReducer, useState } from "react"
import { initMapBoxWithHandler } from "utility/maps"
import { useSession } from "utility/selectors"
import { Coordinates, MapProps, Waypoint, PointType } from "utility/types"
import styles from '../styles/modules/map.module.css'
import MapPopup from "./MapPopup"

export default function Map({courseDispatch, course}: MapProps) {
  let map: mapboxgl.Map
  const {uid} = useSession()
  
  useEffect(() => {
    map = initMapBoxWithHandler('course-map', placeMarker)
  }, [])

  const placeMarker = (e: MapEventData) => {
    const point: Coordinates = e.lngLat
    const feature = map.queryRenderedFeatures(e.point)[0]
    const marker = new mapboxgl.Marker({
      draggable: true,
    })
    marker.setLngLat(point as mapboxgl.LngLatLike)
    marker.addTo(map)
    marker.on('drag', (e) => {console.log('marker is dragging')})
    addPopup(feature, point as mapboxgl.LngLatLike)
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

  const updateWaypointPosition = (e: MapEventData) => {
    // update the corresponding waypoint position, here
      // may need to actually create a layer for this in mapbox
  }

  const addPopup = (feature: mapboxgl.MapboxGeoJSONFeature, point: mapboxgl.LngLatLike) => {
    const popup = new mapboxgl.Popup({
      offset: [0, -15]
    })
    .setLngLat(point)
    .setHTML(MapPopup())
    .addTo(map)
    console.log(feature)
  }

  return (
    <div
      id="course-map"
      className={styles.map}
    ></div>
  )
}
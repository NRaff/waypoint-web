import Map from "./Map"
import styles from '../styles/modules/newCourse.module.css'
import { useReducer, useState } from "react"
import { Course as CourseType, CoursePermission, ReduxAction, Waypoint as WaypointType } from "utility/types"
import { useSession } from "utility/selectors"
import { Course } from "models/Course"
import { Waypoint } from "models/Waypoint"
import WaypointCard from "./WaypointCard"
import WaypointList from "./WaypointList"

export default function NewCourse() {
  const { uid } = useSession()

  const defaultCourse: CourseType = {
    name: '',
    length: 0,
    duration: 0,
    type: CoursePermission.Private,
    created_by: uid,
    id: '',
    waypointsList: [],
    waypoints: {}
  }

  const singleCourseReducer = (state: CourseType, { type, payload }: ReduxAction) => {
    Object.freeze(state)
    const nextState = Object.assign({}, state)

    switch (type) {
      case 'UPDATE_NAME':
        nextState.name = payload
        return nextState
      case 'UPDATE_LENGTH':
        nextState.length = payload
        return nextState
      case 'UPDATE_DURATION':
        nextState.duration = payload
        return nextState
      case 'UPDATE_TYPE':
        nextState.type = payload
        return nextState
      case 'ADD_WAYPOINT':
        nextState.waypoints[payload.waypoint_id] = payload
        nextState.waypointsList = Object.keys(nextState.waypoints)
        return nextState
      case 'REMOVE_WAYPOINT':
        delete nextState.waypoints[payload.waypoint_id]
        nextState.waypointsList = Object.keys(nextState.waypoints)
        return nextState
      default:
        return state
    }
  }

  const [course, courseDispatch] = useReducer(singleCourseReducer, defaultCourse)
  
  const saveCourse = () => {
    const courseDetails = {
      name: course.name,
      length: course.length,
      duration: course.duration,
      type: course.type,
      created_by: course.created_by,
    } as CourseType
    const waypointsToSave = Object.assign({},course.waypoints)
    Object.values(waypointsToSave).forEach((waypoint: WaypointType) => {
      const wp = new Waypoint(uid, waypoint)
      const wpId = wp.addToList()
      // courseDetails.waypointsList.push(wpId)

    })
    const courseToSave = new Course(uid, courseDetails)
    courseToSave.addToList()
  }

  console.log(course.waypoints)

  return (
    <div className={styles.newCourse}>
      <Map courseDispatch={courseDispatch} course={course}/>
      <WaypointList course={course} />
      <section className={styles.courseDetails}>
        <label>Course Name
        <input type="text" />
        </label>
        <section className={styles.visibility}>
          <label>Visibility</label>
          <label htmlFor="Private">
            <input type="radio" id="Private" name='visibility' />
            Private
          </label>
          <label htmlFor="Public">
            <input type="radio" id="Public" name='visibility' />
            Public
          </label>
          <h1>{course.waypoints['test1'] ? course.waypoints['test1'].name : 'No Waypoint'}</h1>
        </section>
      </section>
      <button
        onClick={saveCourse}
      >Save Course</button>
    </div>
  )
}
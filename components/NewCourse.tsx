import Map from "./Map"
import styles from '../styles/modules/newCourse.module.css'
import { useReducer } from "react"
import { Course, CoursePermission, ReduxAction } from "utility/types"
import { useSession } from "utility/selectors"

export default function NewCourse() {
  const { uid } = useSession()

  const defaultCourse: Course = {
    name: '',
    length: 0,
    duration: 0,
    type: CoursePermission.Private,
    created_by: uid,
    id: '',
    waypointsList: [],
    waypoints: {}
  }

  const singleCourseReducer = (state: Course, { type, payload }: ReduxAction) => {
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
        nextState.waypoints[payload.course_id] = payload
        nextState.waypointsList = Object.keys(nextState.waypoints)
        console.log('add waypoint')
        return nextState
      case 'REMOVE_WAYPOINT':
        delete nextState.waypoints[payload.course_id]
        nextState.waypointsList = Object.keys(nextState.waypoints)
        return nextState
      default:
        return state
    }
  }

  const [course, courseDispatch] = useReducer(singleCourseReducer, defaultCourse)
  console.log(course)

  return (
    <div className={styles.newCourse}>
      <Map courseDispatch={courseDispatch}/>
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
    </div>
  )
}
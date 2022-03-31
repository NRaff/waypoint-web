import Map from "./Map"
import styles from '../styles/modules/newCourse.module.css'
import { useEffect, useReducer } from "react"
import { Course as CourseType, CoursePermission, ReduxAction, Waypoint as WaypointType } from "utility/types"
import { useCourse, useSession } from "utility/selectors"
import { Course } from "models/Course"
import { Waypoint } from "models/Waypoint"
import WaypointList from "./WaypointList"
import { CourseReducer } from "redux/reducers/course_reducer"
import { defaultCourse } from "utility/defaults"

export default function NewCourse() {
  const { uid } = useSession()
  const selectedCourse = useCourse()
  // let course: Course = new Course(uid, selectedCourse || defaultCourse(uid))
  let course: Course | null = selectedCourse ? new Course(uid, selectedCourse) : null

  useEffect(() => {
    if (selectedCourse) {
      course = new Course(uid, selectedCourse)
    }
  }, [selectedCourse])
  //TODO: refactor:
    // change new course to actually create a placeholder in firebase (e.g. saved vs. published)
    // add query for published and unpublished? (add selector)
    // add easy toggle between drafts and published
    // change waypoints to save to firebase on each click (and delete accordingly as well)
    // update new course details to be inside the map (use the map as background)

  const [newCourse, courseDispatch] = useReducer(CourseReducer, selectedCourse || defaultCourse(uid))
  
  const saveCourse = () => {
    if(!course) {
      throw Error('Course has not been loaded')
    }
    // this is all redundant code since waypoints are added in realtime
    // const waypointsToSave = Object.assign({},course.waypoints)
    // debugger
    // Object.values(waypointsToSave).forEach((waypoint: WaypointType) => {
    //   const wp = new Waypoint(uid, waypoint, [course!])
    //   const wpId = wp.addToList()
    //   // courseDetails.waypointsList.push(wpId)

    // })
    course.addToList()
  }
  return (
    <div className={styles.newCourse}>
      {course ? <Map courseDispatch={courseDispatch} course={course}/> : null}
      <WaypointList course={newCourse} />
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
          <h1>{newCourse.waypoints['test1'] ? newCourse.waypoints['test1'].name : 'No Waypoint'}</h1>
        </section>
      </section>
      <button
        onClick={saveCourse}
      >Save Course</button>
    </div>
  )
}
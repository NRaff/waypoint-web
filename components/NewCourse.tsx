import Map from "./Map"
import styles from '../styles/modules/newCourse.module.css'
import { useEffect, useReducer, useState } from "react"
import { Course as CourseType, CoursePermission, ReduxAction, Waypoint as WaypointType } from "utility/types"
import { useCourse, useSession } from "utility/selectors"
import { Course } from "modules/Course"
import { Waypoint } from "modules/Waypoint"
import WaypointList from "./WaypointList"
import { CourseReducer } from "redux/reducers/course_reducer"
import { defaultCourse } from "utility/defaults"
import { CourseActionTypes as Actions } from "redux/reducers/course_reducer"

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
    debugger
    course.addToList()
  }

  const updateCourse = (type: Actions, update: string, setter: Function) => {
    setter(update)
    const payload = {
      course,
      update
    }
    courseDispatch({type, payload})
  }

  const setVisibility = (visibility: CoursePermission) => {
    console.log(visibility)
  }

  // use state for form items
  const [name, setName] = useState(course?.name)
  const [visibility, updateVisibility] = useState(course?.visibility || CoursePermission.Private)

  const getVisibility = (option: CoursePermission = CoursePermission.Private): boolean => {
    debugger
    switch(option) {
      case visibility:
        return true
      default:
        return false
    }
  }

  // TODO: Need to fix visibility setting options
  return (
    <div className={styles.newCourse}>
      {course ? <Map courseDispatch={courseDispatch} course={course}/> : null}
      <WaypointList course={newCourse} />
      <section className={styles.courseDetails}>
        <label>Course Name
        <input 
          type="text"
          value={name}
          onChange={(e) => updateCourse(Actions.UpdateName, e.target.value, setName)}
        />
        </label>
        <section className={styles.visibility}>
          <label
            onClick={(e) => console.log(e.target.id)}
          >Visibility
            <label htmlFor="Private">
              <input 
                type="radio" 
                id="Private" 
                name='visibility'
                checked={getVisibility(CoursePermission.Private)}
              />
              Private
            </label>
            <label htmlFor="Public">
              <input 
                type="radio" 
                id="Public" 
                name='visibility'
                checked={getVisibility(CoursePermission.Public)}
              />
              Public
            </label>
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
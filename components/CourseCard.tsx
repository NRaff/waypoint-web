import { Course } from "utility/types"
import styles from '@/styles/modules/courseCard.module.css'
import { useDispatch } from "react-redux"
import { setSelectedCourse } from "redux/actions/actions"

export default function CourseCard(props: any) {
  const {course} = props
  const {
    name,
    length,
    duration,
    type,
    id
  } = course as Course
  const dispatch = useDispatch()

  const selectCourse = () => {
    dispatch(setSelectedCourse({courseId: id}))
  }

  return (
    <div 
      className={styles.card}
      onClick={selectCourse}//add id of selected course to ui selectors}
    >
      <h1>{name}</h1>
      <aside>
        <p>{length}</p>
        <p>{duration}</p>
      </aside>
    </div>
  )
}
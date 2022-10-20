import { Course } from "shared/utility/types"
import styles from '@/styles/modules/courseCard.module.css'
import { useDispatch } from "react-redux"
import { setSelectedCourse } from "frontend/redux/actions/actions"
import { useCourse } from "shared/utility/selectors"

export default function CourseCard(props: any) {
  const selectedCourse = useCourse()
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

  const isSelectedCourse = () => {
    return id === selectedCourse?.id ? styles.selectedCard : ''
  }

  return (
    <div 
      className={`${styles.card} ${isSelectedCourse()}`}
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
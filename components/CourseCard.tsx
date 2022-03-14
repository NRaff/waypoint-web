import { Course } from "utility/types"
import styles from '@/styles/modules/courseCard.module.css'

export default function CourseCard(props: any) {
  const {course} = props
  const {
    name,
    length,
    duration,
    type,
    id
  } = course as Course

  return (
    <div 
      className={styles.card}
      onClick={() => console.log('Course clicked')}//add id of selected course to ui selectors}
    >
      <h1>{name}</h1>
      <aside>
        <p>{length}</p>
        <p>{duration}</p>
      </aside>
    </div>
  )
}
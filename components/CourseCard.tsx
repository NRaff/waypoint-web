import { Course } from "utility/types"
import styles from '@/styles/modules/courseCard.module.css'

export default function CourseCard(props: any) {
  const {course} = props
  const {
    name,
    length,
    duration,
    type
  } = course

  return (
    <div 
      className={styles.card}
    >
      <h1>{name}</h1>
      <aside>
        <p>{length}</p>
        <p>{duration}</p>
      </aside>
    </div>
  )
}
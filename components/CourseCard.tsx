import { Course } from "utility/types"

export default function CourseCard(props: any) {
  const {course} = props
  const {
    name,
    length,
    duration,
    type
  } = course

  return (
    <div>
      <h1>{name}</h1>
      <aside>
        <p>{length}</p>
        <p>{duration}</p>
      </aside>
    </div>
  )
}
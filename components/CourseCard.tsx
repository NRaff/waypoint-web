import { Course } from "utility/types"

export default function CourseCard(course: Course) {
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
import { useCourse } from "utility/selectors"
import { CourseDetailProps, CourseDetailType } from "utility/types"

export default function CourseDetail() {
  // pull down the selected course from redux
  const course = useCourse(courseId)

  function existingCourse() {
    return (
      <div>
        <div>Map</div>
        <section>
          <h1>{course.name}</h1>
          <ul>
            <li>Length: {course.length}</li>
            <li>Duration: {course.duration}</li>
            <li>Visibility: {course.type ? 'Public': 'Private'}</li>
          </ul>
        </section>
      </div>
    )
  }

  return (
    <h1>Test</h1>
  )
}
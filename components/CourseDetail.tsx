import { useCourse } from "utility/selectors"

export default function CourseDetail() {
  // pull down the selected course from redux
  const course = useCourse()

  function existingCourse() {
    return (
      <div>
        <div>Map</div>
        <section>
          <h1>{course!.name}</h1>
          <ul>
            <li>Length: {course!.length}</li>
            <li>Duration: {course!.duration}</li>
            <li>Visibility: {course!.type ? 'Public': 'Private'}</li>
          </ul>
        </section>
      </div>
    )
  }

  if (course) {
    return existingCourse()
  }
  return null
}
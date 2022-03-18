import { useCourse } from "utility/selectors"

export default function ExistingCourse() {
  const course = useCourse()
  if(course) {
    return (
      <div>
        <div>Map</div>
        <section>
          <h1>{course!.name}</h1>
          <ul>
            <li>Length: {course!.length}</li>
            <li>Duration: {course!.duration}</li>
            <li>Visibility: {course!.type ? 'Public' : 'Private'}</li>
          </ul>
        </section>
      </div>
    )
  }
  return null
}
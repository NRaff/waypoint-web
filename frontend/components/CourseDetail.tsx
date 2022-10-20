import { useCourse } from "shared/utility/selectors"
import ExistingCourse from "./ExistingCourse"
import NewCourse from "./NewCourse"

export default function CourseDetail({type}: any) {
  if(type !== 'NEW') {
    return <ExistingCourse />
  }
  return <NewCourse />
}
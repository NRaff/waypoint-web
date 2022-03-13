import { ActivityListProps } from "utility/types";
import BtnWithImg from "./BtnWithImg";
import styles from "@/styles/modules/activityList.module.css"
import { useCourses, useSession } from "utility/selectors";
import CourseCard from "./CourseCard";
import { Course } from "models/Course";

export default function ActivityList({type}: ActivityListProps) {
  // select data from store based on type
  const courses = useCourses() as Array<Course>
  const {uid} = useSession()
  const course = new Course(uid)

  function createCourse() {
    course.addToList()
  }
  return (
    <div className={styles.activityList}>
      <ul className={styles.listItems}>
        {courses.map((course: Course, idx: number) => <CourseCard course={course} key={idx}/>)}
      </ul>
    </div>
  )
}
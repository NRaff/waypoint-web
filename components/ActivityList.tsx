import { ActivityListProps, Course } from "utility/types";
import BtnWithImg from "./BtnWithImg";
import styles from "@/styles/modules/activityList.module.css"
import { useCourses } from "utility/selectors";
import CourseCard from "./CourseCard";

export default function ActivityList({type}: ActivityListProps) {
  // select data from store based on type
  const courses = useCourses() as Array<Course>
  return (
    <div className={styles.activityList}>
      <ul>
        {courses.map((course: Course) => <CourseCard course={course} />)}
      </ul>
      {/* table row component */}
    </div>
  )
}
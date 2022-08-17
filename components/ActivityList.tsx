import { ActivityListProps } from "utility/types";
import styles from "@/styles/modules/activityList.module.css"
import { useCourses } from "utility/selectors";
import CourseCard from "./CourseCard";
import { Course } from "utility/types";

export default function ActivityList({type}: ActivityListProps) {
  // select data from store based on type
  const courses = useCourses()

  return (
    <div className={styles.activityList}>
      <ul className={styles.listItems}>
        {courses.map((course: Course, idx: number) => <CourseCard course={course} key={idx}/>)}
      </ul>
    </div>
  )
}
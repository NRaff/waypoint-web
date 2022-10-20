import { ActivityListProps } from "shared/utility/types";
import styles from "@/styles/modules/activityList.module.css"
import { useCourses } from "shared/utility/selectors";
import CourseCard from "./CourseCard";
import { Course } from "shared/utility/types";

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
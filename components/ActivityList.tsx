import { ActivityListProps, Course } from "utility/types";
import BtnWithImg from "./BtnWithImg";
import styles from "@/styles/modules/activityList.module.css"
import { useCourses } from "utility/selectors";
import CourseCard from "./CourseCard";

export default function ActivityList({type}: ActivityListProps) {
  // select data from store based on type
  const courses = useCourses()
  return (
    <div className={styles.activityList}>
      <BtnWithImg
        action={() => console.log('create pressed')}
        title={`Create ${type.substring(0,type.length - 1)}`}
        style={''}
      />
      {/* {courses.map} */}
      <h1>Displaying: {type}</h1>
      <ul>
        {courses.map((course: Course) => <CourseCard course={course} />)}
      </ul>
      {/* table row component */}
    </div>
  )
}
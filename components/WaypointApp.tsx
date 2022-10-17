import styles from '@/styles/modules/waypointApp.module.css'
import { useSession } from "utility/selectors";
import { Course } from "modules/Course";
import { useEffect, useState } from "react";
import useFirebaseAuth from "hooks/useFirebaseAuth";
import { useDispatch } from "react-redux";
import InAppNav from "./InAppNav";
import ActivityList from "./ActivityList";
import CourseDetail from "./CourseDetail";
import { CourseDetailType } from "utility/types";

// TODO: catch listeners to turn them off on dismount
export function WaypointApp() {

  const [listType, setListType] = useState('Races')

  return (
    <div className={styles.waypointApp}>
      <InAppNav curType={listType} setType={setListType} />
      {/* <ActivityList type={listType as any} />
      <CourseDetail type='NEW'/> */}
    </div>
  )
}